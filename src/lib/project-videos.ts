import type { Locale } from '@/i18n/routing';

export type ProjectVideo = {
  src: string;
  type: 'video/webm' | 'video/mp4';
  poster: string;
  duration: number;
  recordedAt: string;
  environment: Record<Locale, string>;
};

// Only real browser recordings belong here. Missing entries never render a fake player.
export const projectVideos: Record<string, ProjectVideo> = {
  'clearledger': {
    src: '/videos/projects/clearledger.mp4', type: 'video/mp4', poster: '/videos/projects/clearledger-poster.jpg', duration: 29, recordedAt: '2026-11-06',
    environment: { pt: 'Aplicação real Next.js + FastAPI/SQLite com CSVs fictícios de exemplo. Interface em inglês.', en: 'Real Next.js + FastAPI/SQLite application with synthetic example CSVs. English interface.' }
  },
  'fintrack-pro': {
    src: '/videos/projects/fintrack-pro.mp4', type: 'video/mp4', poster: '/videos/projects/fintrack-pro-poster.jpg', duration: 29, recordedAt: '2026-11-06',
    environment: { pt: 'Aplicação Expo Web real no modo demo integrado. Dados fictícios locais; não demonstra o backend autenticado. Interface em português.', en: 'Real Expo Web application in its built-in demo mode. Local fictional data; authenticated backend flows are not shown. Portuguese interface.' }
  },
  'amigo-fiel': {
    src: '/videos/projects/amigo-fiel.mp4', type: 'video/mp4', poster: '/videos/projects/amigo-fiel-poster.jpg', duration: 26, recordedAt: '2026-11-06',
    environment: { pt: 'Aplicação Django real com configuração SQLite local de gravação e contas, animais e produtos fictícios. Interface em português.', en: 'Real Django application using a local SQLite recording configuration and fictional accounts, pets and products. Portuguese interface.' }
  },
  'controle-de-estoque': {
    src: '/videos/projects/controle-de-estoque.mp4', type: 'video/mp4', poster: '/videos/projects/controle-de-estoque-poster.jpg', duration: 29, recordedAt: '2026-11-06',
    environment: { pt: 'Aplicação PHP real com MariaDB isolado e produtos fictícios. A entrada de estoque foi persistida localmente. Interface em português.', en: 'Real PHP application with isolated MariaDB and fictional products. The stock entry was persisted locally. Portuguese interface.' }
  },
  'vrascode': {
    src: '/videos/projects/vrascode.mp4', type: 'video/mp4', poster: '/videos/projects/vrascode-poster.jpg', duration: 26, recordedAt: '2026-11-06',
    environment: { pt: 'Navegação real do portfólio público: projetos, filtros, busca e biografia. Interface em inglês.', en: 'Real public portfolio navigation: projects, filters, search and biography. English interface.' }
  }
};

export const recordingLimitations: Record<string, Record<Locale, string>> = {
  'vras-watches': {
    pt: 'O repositório não está acessível publicamente e não foi encontrada uma aplicação verificável para gravação.',
    en: 'The repository is not publicly accessible and no verifiable running application was found to record.'
  }
};
