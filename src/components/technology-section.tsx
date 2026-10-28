import { getTranslations } from 'next-intl/server';
import { Braces, Database, GitBranch } from 'lucide-react';
import { SectionHeading } from './section-heading';

export async function TechnologySection() {
  const t = await getTranslations('Home');
  const groups = [
    { title: t('frontend'), icon: Braces, tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Expo'] },
    { title: t('backend'), icon: Database, tools: ['Python', 'Django', 'FastAPI', 'NestJS', 'PHP', 'PostgreSQL', 'MySQL', 'SQLite'] },
    { title: t('workflow'), icon: GitBranch, tools: ['Git', 'GitHub', 'Prisma', 'pytest', 'PHPUnit', 'Playwright'] }
  ];
  return <section className="section" id="technologies"><SectionHeading label={t('stackLabel')} title={t('stackTitle')} description={t('stackDescription')} /><div className="stack-grid">{groups.map(group => <div className="stack-group" key={group.title}><group.icon size={25} strokeWidth={1.5} /><h3>{group.title}</h3><div className="stack-list">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div>)}</div></section>;
}
