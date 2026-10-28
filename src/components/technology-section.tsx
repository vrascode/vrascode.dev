import { getTranslations } from 'next-intl/server';
import { Braces, Boxes, Database, PanelsTopLeft, Server, Settings, TestTube, Wrench } from 'lucide-react';
import { SectionHeading } from './section-heading';

export async function TechnologySection() {
  const t = await getTranslations('Home');
  const groups = [
    { title: t('languages'), icon: Braces, tools: ['Python', 'JavaScript', 'TypeScript', 'PHP', 'Java', 'C', 'SQL'] },
    { title: t('frontendSkills'), icon: PanelsTopLeft, tools: ['React', 'Next.js', 'React Native', 'Expo', 'HTML', 'CSS', 'Tailwind CSS'] },
    { title: t('backendSkills'), icon: Server, tools: ['Django', 'FastAPI', 'NestJS', 'Node.js'] },
    { title: t('databases'), icon: Database, tools: ['PostgreSQL', 'MySQL', 'SQLite'] },
    { title: t('tools'), icon: Wrench, tools: ['Git', 'GitHub', 'npm', 'Prisma', 'Zustand', 'AsyncStorage'] },
    { title: t('testing'), icon: TestTube, tools: ['pytest', 'PHPUnit', 'Node.js test runner', 'Playwright'] },
    { title: t('infrastructure'), icon: Settings, tools: ['Node.js runtime', 'GitHub Actions CI'] },
    { title: t('architecture'), icon: Boxes, tools: ['MVC', 'REST APIs', 'Monorepos', 'Relational data'] }
  ];
  return <section className="section" id="technologies"><SectionHeading label={t('stackLabel')} title={t('stackTitle')} description={t('stackDescription')} /><div className="stack-grid">{groups.map(group => <div className="stack-group" key={group.title}><group.icon size={25} strokeWidth={1.5} /><h3>{group.title}</h3><div className="stack-list">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div>)}</div></section>;
}
