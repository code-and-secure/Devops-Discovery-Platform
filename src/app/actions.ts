"use server";

import { db } from "@/db";
import { resources, newsletterSubscribers, users, sessions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hashPassword, verifyPassword, generateToken, createSession, getSession, deleteSession } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/email";

export async function upvoteResource(id: number) {
  await db.update(resources)
    .set({ upvotes: sql`${resources.upvotes} + 1` })
    .where(eq(resources.id, id));

  revalidatePath("/");
}

export type AuthState = { success: boolean; message: string } | null;

export async function signupAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName  = (formData.get("lastName")  as string)?.trim();
  const email     = (formData.get("email")     as string)?.trim().toLowerCase();
  const password  = (formData.get("password")  as string);
  const confirm   = (formData.get("confirm")   as string);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, message: "Please enter a valid email address." };
  if (!password || password.length < 8)
    return { success: false, message: "Password must be at least 8 characters." };
  if (password !== confirm)
    return { success: false, message: "Passwords do not match." };

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0)
    return { success: false, message: "An account with this email already exists." };

  const passwordHash = await hashPassword(password);
  const verificationToken = generateToken();
  const verificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  await db.insert(users).values({
    firstName: firstName || null,
    lastName:  lastName  || null,
    email,
    passwordHash,
    verificationToken,
    verificationExpiresAt,
  });

  try {
    await sendVerificationEmail(email, firstName || "there", verificationToken);
  } catch (e) {
    console.error("[signup] Email send failed:", e);
  }

  return {
    success: true,
    message: `Account created! We've sent a verification link to ${email}. Please check your inbox.`,
  };
}

export async function signinAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email    = (formData.get("email")    as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string);

  if (!email || !password)
    return { success: false, message: "Please fill in all fields." };

  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!user) return { success: false, message: "Invalid email or password." };

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return { success: false, message: "Invalid email or password." };

  if (!user.isVerified)
    return { success: false, message: "Please verify your email before signing in. Check your inbox for the verification link." };

  await createSession(user.id);
  redirect("/");
}

export async function verifyEmailAction(token: string): Promise<AuthState> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.verificationToken, token))
    .limit(1);

  if (!user) return { success: false, message: "Invalid or expired verification link." };
  if (user.isVerified) return { success: true, message: "Your email is already verified. You can sign in." };
  if (user.verificationExpiresAt && user.verificationExpiresAt < new Date())
    return { success: false, message: "This verification link has expired. Please sign up again." };

  await db
    .update(users)
    .set({ isVerified: true, verificationToken: null, verificationExpiresAt: null })
    .where(eq(users.id, user.id));

  return { success: true, message: "Email verified! You can now sign in." };
}

export async function signoutAction() {
  await deleteSession();
  redirect("/");
}

export async function deleteAccountAction(): Promise<AuthState> {
  const user = await getSession();
  if (!user) return { success: false, message: "Not authenticated." };

  // Delete all sessions then the user
  await db.delete(sessions).where(eq(sessions.userId, user.id));
  await db.delete(users).where(eq(users.id, user.id));
  await deleteSession();
  redirect("/");
}

export async function updateProfileAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const user = await getSession();
  if (!user) return { success: false, message: "Not authenticated." };

  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName  = (formData.get("lastName")  as string)?.trim();

  if (!firstName) return { success: false, message: "First name is required." };

  await db
    .update(users)
    .set({ firstName, lastName: lastName || null })
    .where(eq(users.id, user.id));

  revalidatePath("/account");
  return { success: true, message: "Profile updated successfully." };
}

export async function subscribeNewsletter(
  _prevState: { success: boolean; message: string } | null,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const name  = (formData.get("name")  as string | null)?.trim() || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    await db
      .insert(newsletterSubscribers)
      .values({ email, name })
      .onConflictDoNothing();

    return {
      success: true,
      message: "You're subscribed! 🎉 Welcome to the StackLens community.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
