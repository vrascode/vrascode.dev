export type GitHubProfile = { login: string; publicRepos: number; followers: number };

export function parseGitHubProfile(data: unknown): GitHubProfile | null {
  if (!data || typeof data !== 'object') return null;
  const profile = data as Record<string, unknown>;
  if (profile.login !== 'vrascode' || typeof profile.public_repos !== 'number' || typeof profile.followers !== 'number') return null;
  if (![profile.public_repos, profile.followers].every(value => Number.isSafeInteger(value) && value >= 0)) return null;
  return { login: profile.login, publicRepos: profile.public_repos, followers: profile.followers };
}

export async function readGitHubProfile(fetchProfile: () => Promise<Pick<Response, 'ok' | 'json'>>) {
  try {
    const response = await fetchProfile();
    return response.ok ? parseGitHubProfile(await response.json()) : null;
  } catch {
    return null;
  }
}
