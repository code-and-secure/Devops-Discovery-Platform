import { db } from "./index";
import { categories, resources } from "./schema";
import { seedCategories, seedResources, monitoringResources } from "./seed-data";
import { eq } from "drizzle-orm";

let seedPromise: Promise<void> | null = null;

async function seedDatabase() {
  try {
    const existingResources = await db
      .select({ id: resources.id })
      .from(resources)
      .limit(1);

    if (existingResources.length === 0) {
      // Fresh database — insert everything
      for (const category of seedCategories) {
        await db.insert(categories).values(category).onConflictDoNothing();
      }
      for (const resource of seedResources) {
        await db.insert(resources).values(resource).onConflictDoNothing();
      }
      for (const resource of monitoringResources) {
        await db.insert(resources).values(resource).onConflictDoNothing();
      }
      return;
    }

    // DB already has data — only add what is missing

    // Add Monitoring category if it doesn't exist yet
    const monitoringCat = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, "monitoring"))
      .limit(1);

    if (monitoringCat.length === 0) {
      await db
        .insert(categories)
        .values({ name: "Monitoring", slug: "monitoring", icon: "BarChart2" });
    }

    // Add monitoring resources that don't already exist (check by URL)
    for (const resource of monitoringResources) {
      const existing = await db
        .select({ id: resources.id })
        .from(resources)
        .where(eq(resources.url, resource.url))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(resources).values(resource);
      }
    }
  } catch (e) {
    console.error("[ensure-seeded] Non-fatal seeding error:", e);
  }
}

export function ensureSeeded() {
  seedPromise ??= seedDatabase().finally(() => {
    seedPromise = null;
  });
  return seedPromise;
}
