import { projects } from '../src/lib/projects';
import identity from '../content/identity.json';

const links = [...new Set([identity.links.github, identity.links.repository, ...projects.flatMap(project => [project.repository, ...project.sources.map(source => source.url)].filter((url): url is string => Boolean(url)))])];
async function checkLinks() {
let failures = 0;
for (const url of links) {
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(20_000), headers: { 'User-Agent': 'VRAS-CODE-Portfolio-Link-Check' } });
    console.log(`${response.status} ${url}`);
    await response.body?.cancel();
    if (!response.ok) failures++;
  } catch (error) {
    failures++;
    console.error(`FAILED ${url}: ${error instanceof Error ? error.message : 'network error'}`);
  }
}
console.log(`${links.length - failures}/${links.length} external source links verified. Planned production domain excluded until deployment.`);
process.exitCode = failures ? 1 : 0;
}

checkLinks().catch(error => { console.error(error instanceof Error ? error.message : 'Link check failed'); process.exitCode = 1; });
