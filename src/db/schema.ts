import { pgTable, serial, text, timestamp, integer, varchar, boolean } from "drizzle-orm/pg-core";

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  url: text("url").notNull().unique(),
  type: varchar("type", { length: 50 }).notNull(), // 'blog', 'video', 'documentation', 'repository', 'course'
  category: varchar("category", { length: 100 }).notNull(), // 'DevOps', 'Cloud', 'AI', etc.
  platform: varchar("platform", { length: 100 }), // 'YouTube', 'Medium', 'GitHub', 'AWS Docs'
  tags: text("tags"), // Comma separated or JSON
  upvotes: integer("upvotes").default(0),
  isFree: boolean("is_free").default(true),
  rating: integer("rating").default(0),
  isFeatured: boolean("is_featured").default(false),
  author: varchar("author", { length: 255 }),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  resourceId: integer("resource_id").references(() => resources.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull(), // Using a simple ID for now
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  icon: varchar("icon", { length: 50 }),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  verificationToken: varchar("verification_token", { length: 255 }),
  verificationExpiresAt: timestamp("verification_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});
