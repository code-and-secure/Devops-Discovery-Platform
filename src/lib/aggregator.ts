export async function searchExternalSources(query: string) {
  const results: {
    title: string;
    description: string;
    url: string;
    type: string;
    platform: string;
    category: string;
    upvotes: number;
  }[] = [];

  const [githubResults, devtoResults] = await Promise.allSettled([
    fetchGitHub(query),
    fetchDevTo(query),
  ]);

  if (githubResults.status === "fulfilled") results.push(...githubResults.value);
  if (devtoResults.status === "fulfilled") results.push(...devtoResults.value);

  // Fallback: if both APIs fail, return meaningful search links
  if (results.length === 0) {
    const q = encodeURIComponent(query);
    return [
      {
        title: `Search "${query}" on GitHub`,
        description: `Find repositories, tools and projects related to ${query}.`,
        url: `https://github.com/search?q=${q}&type=repositories&sort=stars`,
        type: "repository",
        platform: "GitHub",
        category: "Discovery",
        upvotes: 0,
      },
      {
        title: `"${query}" articles on Dev.to`,
        description: `Community articles and tutorials about ${query} on Dev.to.`,
        url: `https://dev.to/search?q=${q}`,
        type: "blog",
        platform: "Dev.to",
        category: "Discovery",
        upvotes: 0,
      },
    ];
  }

  return results;
}

async function fetchGitHub(query: string) {
  const res = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+topic:devops+topic:cloud&sort=stars&order=desc&per_page=5`,
    {
      headers: { Accept: "application/vnd.github.v3+json" },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];

  const data = await res.json();
  return (data.items ?? []).slice(0, 3).map((repo: any) => ({
    title: repo.full_name,
    description: repo.description ?? `A GitHub repository with ${repo.stargazers_count.toLocaleString()} stars.`,
    url: repo.html_url,
    type: "repository",
    platform: "GitHub",
    category: "Discovery",
    upvotes: repo.stargazers_count,
  }));
}

async function fetchDevTo(query: string) {
  const res = await fetch(
    `https://dev.to/api/articles?tag=${encodeURIComponent(query.toLowerCase().replace(/\s+/g, ""))}&per_page=6&top=7`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];

  const articles = await res.json();
  return (Array.isArray(articles) ? articles : []).slice(0, 3).map((a: any) => ({
    title: a.title,
    description: a.description ?? `An article on Dev.to about ${query}.`,
    url: a.url,
    type: "blog",
    platform: "Dev.to",
    category: "Discovery",
    upvotes: a.positive_reactions_count ?? 0,
  }));
}
