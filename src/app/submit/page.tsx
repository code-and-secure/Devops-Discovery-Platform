import { db } from "@/db";
import { resources, categories } from "@/db/schema";
import { redirect } from "next/navigation";

export default async function SubmitPage() {
  const allCategories = await db.select().from(categories);

  async function handleSubmit(formData: FormData) {
    "use server";
    
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const category = formData.get("category") as string;
    const platform = formData.get("platform") as string;
    const tags = formData.get("tags") as string;

    await db.insert(resources).values({
      title,
      url,
      description,
      type,
      category,
      platform,
      tags,
    });

    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl font-bold mb-6">Submit a Resource</h1>
          <p className="text-slate-500 mb-8">
            Help the community by sharing high-quality DevOps, Cloud, or AI resources.
          </p>

          <form action={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input 
                name="title" 
                required 
                placeholder="The Ultimate Kubernetes Guide"
                className="w-full px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL</label>
              <input 
                name="url" 
                type="url" 
                required 
                placeholder="https://..."
                className="w-full px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select name="type" className="w-full px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="blog">Blog/Article</option>
                  <option value="video">Video/Course</option>
                  <option value="documentation">Documentation</option>
                  <option value="repository">Repository</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select name="category" className="w-full px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  {allCategories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Platform (Optional)</label>
              <input 
                name="platform" 
                placeholder="Medium, YouTube, GitHub, etc."
                className="w-full px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea 
                name="description" 
                rows={4}
                placeholder="What makes this resource great?"
                className="w-full px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (Comma separated)</label>
              <input 
                name="tags" 
                placeholder="k8s, docker, beginners"
                className="w-full px-4 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
              Submit for Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
