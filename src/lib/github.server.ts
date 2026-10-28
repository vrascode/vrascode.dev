import 'server-only';
import { readGitHubProfile } from './github';

export async function getGitHubProfile() {
  return readGitHubProfile(() => fetch('https://api.github.com/users/vrascode', {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000)
  }));
}
