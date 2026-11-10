// Pulls public, non-fork repos into src/repos.json. Runs before every build.
// If GitHub can't be reached, the last committed repos.json is kept so the build still works.
import {writeFileSync} from 'node:fs';

const USER = 'EFaridRahimli';
const SKIP = new Set([`${USER}.github.io`]); // the old portfolio itself
const out = new URL('../src/repos.json', import.meta.url);

const headers = {Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-sync'};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

try {
  const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`, {headers});
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const repos = (await res.json())
    .filter(r => !r.fork && !r.private && !SKIP.has(r.name))
    .map(r => ({
      name: r.name,
      description: r.description ?? '',
      language: r.language ?? '',
      url: r.html_url,
      homepage: r.homepage ?? '',
      pushedAt: r.pushed_at,
    }));
  writeFileSync(out, JSON.stringify({syncedAt: new Date().toISOString(), repos}, null, 2) + '\n');
  console.log(`sync-github: ${repos.length} public repos written to src/repos.json`);
} catch (e) {
  console.warn(`sync-github: skipped (${e.message}); keeping existing src/repos.json`);
}
