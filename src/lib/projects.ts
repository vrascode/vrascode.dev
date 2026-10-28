import type { Locale } from '@/i18n/routing';

export type ProjectText = {
  category: string; status: string; summary: string; overview: string;
  features: string[]; architecture: string; contribution: string;
  verification: string; limitations: string; imageCaption: string;
};
export type Project = {
  slug: string; number: string; name: string; category: 'mobile' | 'fullstack' | 'web';
  verified: boolean; stack: string[]; repository?: string; image?: string;
  sources: { label: string; url: string }[];
  content: Record<Locale, ProjectText>;
};

export const projects: Project[] = [
  {
    slug: 'fintrack-pro', number: '01', name: 'FinTrack Pro', category: 'mobile', verified: true,
    stack: ['React Native', 'Expo', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL'],
    repository: 'https://github.com/vrascode/fintrack-pro', image: '/projects/fintrack-pro.png',
    sources: [
      { label: 'apps/mobile', url: 'https://github.com/vrascode/fintrack-pro/tree/f5e71fd5f2aacc377ff551ab884fddc391df1595/apps/mobile' },
      { label: 'apps/api', url: 'https://github.com/vrascode/fintrack-pro/tree/f5e71fd5f2aacc377ff551ab884fddc391df1595/apps/api' },
      { label: 'tests', url: 'https://github.com/vrascode/fintrack-pro/tree/f5e71fd5f2aacc377ff551ab884fddc391df1595/tests' }
    ],
    content: {
      en: {
        category: 'PERSONAL FINANCE · MOBILE', status: 'Foundation in development',
        summary: 'A personal finance app taking shape, from mobile navigation to a tested foundation for money calculations and session security.',
        overview: 'FinTrack Pro is a personal finance application in development. The current implementation establishes the interface, persistent device preferences and shared domain primitives. Financial workflows are the next stage.',
        features: ['Navigation between overview, activity, accounts, cards and settings, with explicit empty states.', 'Persistent theme and amount-visibility preferences using Zustand and AsyncStorage.', 'Exact money calculations, installment splitting and calendar validation.', 'Internal scrypt password hashing, expiring tokens, refresh rotation and reuse detection.', 'A NestJS API with a working GET /v1/health endpoint.'],
        architecture: 'An npm monorepo separates apps/mobile, apps/api, packages/shared and packages/config. Expo Router organizes the React Native interface. NestJS exposes the API. A Prisma schema and migration prepare PostgreSQL for users and sessions; the current API does not yet connect identity to persistent storage.',
        contribution: 'Personal project maintained in Matheus Sulino’s vrascode repository, bringing the mobile interface, shared domain code and backend foundation together.',
        verification: '27 automated tests passed on October 27, 2026, covering money, dates, real HTTP health, preferences and security primitives. PostgreSQL integration and native device execution were not validated in this review.',
        limitations: 'Financial account creation, transactions, real balances and HTTP login are not implemented. The prepared database schema does not mean a working financial backend. No public deployment is confirmed.',
        imageCaption: 'Actual web preview of the Expo interface, with empty states. Financial features are still in development.'
      },
      pt: {
        category: 'FINANÇAS PESSOAIS · MOBILE', status: 'Fundação em desenvolvimento',
        summary: 'Um aplicativo financeiro em construção, da navegação mobile a uma base testada para cálculos monetários e segurança de sessões.',
        overview: 'FinTrack Pro é um aplicativo de finanças pessoais em desenvolvimento. A implementação atual estabelece a interface, as preferências persistidas no dispositivo e as primitivas compartilhadas de domínio. Os fluxos financeiros são a próxima etapa.',
        features: ['Navegação entre visão geral, atividade, contas, cartões e ajustes, com estados vazios explícitos.', 'Preferências de tema e visibilidade de valores persistidas com Zustand e AsyncStorage.', 'Cálculos monetários exatos, divisão de parcelas e validação de calendário.', 'Primitivas internas de hashing scrypt, tokens com expiração, rotação e detecção de reutilização.', 'API NestJS com endpoint GET /v1/health funcional.'],
        architecture: 'Um monorepo npm separa apps/mobile, apps/api, packages/shared e packages/config. Expo Router organiza a interface React Native. NestJS expõe a API. Um schema e uma migração Prisma preparam o PostgreSQL para usuários e sessões; a API ainda não conecta identidade à persistência.',
        contribution: 'Projeto pessoal mantido no repositório vrascode de Matheus Sulino, reunindo a interface mobile, o domínio compartilhado e a base do backend.',
        verification: '27 testes automatizados aprovados em 27 de outubro de 2026, cobrindo dinheiro, datas, HTTP health real, preferências e primitivas de segurança. A integração PostgreSQL e a execução em aparelhos nativos não foram validadas nesta análise.',
        limitations: 'Criação de contas financeiras, lançamentos, saldos reais e login HTTP ainda não estão implementados. O schema preparado não representa um backend financeiro funcional. Nenhuma publicação pública foi confirmada.',
        imageCaption: 'Prévia web real da interface Expo, com estados vazios. As funcionalidades financeiras ainda estão em desenvolvimento.'
      }
    }
  },
  {
    slug: 'clearledger', number: '02', name: 'ClearLedger', category: 'fullstack', verified: true,
    stack: ['Python', 'FastAPI', 'SQLite', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    repository: 'https://github.com/vrascode/clearledger', image: '/projects/clearledger.png',
    sources: [
      { label: 'reconcile.py', url: 'https://github.com/vrascode/clearledger/blob/d5205e199e823edaf0607038549b489edbd9139c/clearledger/reconcile.py' },
      { label: 'store.py', url: 'https://github.com/vrascode/clearledger/blob/d5205e199e823edaf0607038549b489edbd9139c/clearledger/store.py' },
      { label: 'frontend', url: 'https://github.com/vrascode/clearledger/tree/d5205e199e823edaf0607038549b489edbd9139c/frontend' },
      { label: 'tests', url: 'https://github.com/vrascode/clearledger/tree/d5205e199e823edaf0607038549b489edbd9139c/tests' }
    ],
    content: {
      en: {
        category: 'FINANCIAL RECONCILIATION · FULL STACK', status: 'Working prototype',
        summary: 'From order to bank deposit. Financial reconciliation with traceable imports, discrepancy detection and immutable reports.',
        overview: 'ClearLedger reconciles orders against charges and refunds, then checks net payouts against bank deposits. It turns validated CSV records into auditable reports and surfaces discrepancies for investigation.',
        features: ['Atomic CSV imports with content hashes, idempotency and conflict detection.', 'Matching of charges, refunds, fees, split payments and bank deposits.', 'Detection of missing payments, amount differences, unknown orders and currency mismatches.', 'Immutable SQLite import snapshots and reconciliation reports.', 'Authenticated FastAPI endpoints, a CLI and JSON/CSV exports.', 'A bilingual Next.js dashboard with filters, tables, run details and light/dark themes.'],
        architecture: 'Pure reconciliation rules are separate from CSV ingestion, SQLite persistence, the HTTP API and the CLI. Database transactions and triggers protect immutable reports. The Next.js frontend accesses FastAPI through a server-side layer; business endpoints require an API key.',
        contribution: 'Personal project in Matheus Sulino’s vrascode repository, connecting reconciliation rules, persistence, API contracts and a dashboard for investigating exceptions.',
        verification: '64 backend tests and 51 frontend tests passed on October 27, 2026. These include real Python/SQLite report generation, validation, immutability, conflicts, refunds and API behavior. A Starlette/httpx deprecation warning remains. Browser tests were not repeated in this source review.',
        limitations: 'A single-host prototype. It does not move funds or connect to live banking infrastructure. The screenshots and examples use synthetic data; no commercial deployment is claimed.',
        imageCaption: 'Actual ClearLedger dashboard using synthetic sample data. No real financial activity.'
      },
      pt: {
        category: 'RECONCILIAÇÃO FINANCEIRA · FULL STACK', status: 'Protótipo funcional',
        summary: 'Do pedido ao depósito bancário. Reconciliação financeira com importações rastreáveis, identificação de divergências e relatórios imutáveis.',
        overview: 'ClearLedger reconcilia pedidos com cobranças e estornos e compara repasses líquidos com depósitos bancários. Transforma registros CSV validados em relatórios auditáveis e destaca divergências para investigação.',
        features: ['Importações CSV atômicas com hash de conteúdo, idempotência e detecção de conflitos.', 'Conciliação de cobranças, estornos, taxas, pagamentos divididos e depósitos bancários.', 'Detecção de pagamentos ausentes, valores divergentes, pedidos desconhecidos e moedas incompatíveis.', 'Snapshots de importações e relatórios de reconciliação imutáveis em SQLite.', 'Endpoints FastAPI autenticados, CLI e exportações JSON/CSV.', 'Dashboard bilíngue em Next.js com filtros, tabelas, detalhes de execuções e temas claro/escuro.'],
        architecture: 'Regras puras de reconciliação ficam separadas da ingestão CSV, persistência SQLite, API HTTP e CLI. Transações e triggers protegem os relatórios imutáveis. O frontend Next.js acessa o FastAPI por uma camada no servidor; endpoints de negócio exigem uma chave de API.',
        contribution: 'Projeto pessoal no repositório vrascode de Matheus Sulino, conectando regras de reconciliação, persistência, contratos de API e um dashboard para investigar divergências.',
        verification: '64 testes de backend e 51 de frontend aprovados em 27 de outubro de 2026. Incluem geração real de relatórios em Python/SQLite, validação, imutabilidade, conflitos, estornos e comportamento da API. Permanece um aviso de depreciação Starlette/httpx. Os testes de navegador não foram repetidos nesta análise das fontes.',
        limitations: 'Protótipo para um único host. Não movimenta fundos nem se conecta a bancos em tempo real. Capturas e exemplos usam dados sintéticos; não há alegação de implantação comercial.',
        imageCaption: 'Dashboard real do ClearLedger com dados sintéticos de exemplo. Nenhuma atividade financeira real.'
      }
    }
  },
  {
    slug: 'vras', number: '03', name: 'VRAS', category: 'web', verified: false, stack: [], sources: [],
    content: {
      en: {
        category: 'PREVIOUS WEBSITE', status: 'Source identification pending',
        summary: 'An earlier chapter of my work. The original website and its projects are still awaiting source confirmation.',
        overview: 'This space is reserved for the earlier VRAS website requested for this portfolio. Its original repository and demonstrations could not be reliably identified during the source review.',
        features: [], architecture: 'The original source is needed before describing the technologies or architecture.',
        contribution: 'Matheus Sulino’s specific work will be documented once the original project is identified.',
        verification: 'Public repositories and accessible local project folders were reviewed. No source was confirmed as the previous VRAS website.',
        limitations: 'This is separate from the new vrascode.dev portfolio. No features, technologies, screenshots or demonstrations are claimed until the original source is verified.',
        imageCaption: 'VRAS · previous website'
      },
      pt: {
        category: 'SITE ANTERIOR', status: 'Identificação da fonte pendente',
        summary: 'Um capítulo anterior do meu trabalho. O site original e seus projetos ainda aguardam confirmação das fontes.',
        overview: 'Este espaço está reservado para o site VRAS anterior solicitado para este portfólio. Seu repositório original e suas demonstrações não puderam ser identificados com segurança durante a análise das fontes.',
        features: [], architecture: 'A fonte original é necessária antes de descrever as tecnologias ou a arquitetura.',
        contribution: 'Os trabalhos específicos de Matheus Sulino serão documentados após a identificação do projeto original.',
        verification: 'Foram analisados repositórios públicos e pastas locais acessíveis. Nenhuma fonte foi confirmada como o site VRAS anterior.',
        limitations: 'Este projeto é distinto do novo portfólio vrascode.dev. Funcionalidades, tecnologias, capturas e demonstrações só serão apresentadas após a verificação da fonte original.',
        imageCaption: 'VRAS · site anterior'
      }
    }
  },
  {
    slug: 'amigo-fiel', number: '04', name: 'Amigo Fiel', category: 'fullstack', verified: true,
    stack: ['Python', 'Django', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript'],
    repository: 'https://github.com/vrascode/Amigo-Fiel',
    sources: [
      { label: 'Projeto-de-Sistemas-2025-2 / Amigo-Fiel', url: 'https://github.com/Projeto-de-Sistemas-2025-2/Amigo-Fiel' },
      { label: 'e0228e5 · Matheus Sulino', url: 'https://github.com/Projeto-de-Sistemas-2025-2/Amigo-Fiel/commit/e0228e591d78a44593f0aeab17745d835b1d87bf' },
      { label: 'models.py', url: 'https://github.com/vrascode/Amigo-Fiel/blob/98696f0e3fa4bacf4d6e781ce0390427e82fd0be/sistema/AmigoFiel/models.py' }
    ],
    content: {
      en: {
        category: 'PET ADOPTION · COLLABORATIVE PROJECT', status: 'Academic project',
        summary: 'A collaborative pet adoption and marketplace platform. A contribution to product descriptions and percentage discounts.',
        overview: 'An academic team project developed for UFT’s Systems Project course. The application brings together animal-related features, NGO and business profiles, a pet marketplace and communication between users, applying web development and systems organization concepts.',
        features: ['User, business and NGO profiles, with pet and product management.', 'Pet catalog with filters, adoption status and favorites.', 'Stores, product listings and a shopping cart.', 'Conversations and message polling.', 'An explicitly simulated checkout flow.'],
        architecture: 'Python and Django organize the AmigoFiel and chat apps. Views, URLs and server-rendered templates use Django ORM models and migrations with PostgreSQL persistence. The implementation is Django, despite an inconsistent PHP/MySQL description on the fork.',
        contribution: 'Matheus Sulino is a collaborator. Public commit e0228e5 adds short descriptions and percentage discounts to ProdutoEmpresa. The team also includes Eduardo Lopes, Eduardo Henrique, Henrique Wendler, Guilherme da Silva and Marcus Vinicius. This commit establishes a verified contribution, rather than authorship of the entire application.',
        verification: 'Models, views, routes, migrations and the contribution commit were reviewed. The two tests.py files contain only the default scaffold; no functional automated test suite was found or claimed.',
        limitations: 'Checkout is simulated; real payment processing is not established. No public demo is confirmed. Broader contributions will only be detailed when supported by evidence.',
        imageCaption: 'Original portfolio illustration for the collaborative project.'
      },
      pt: {
        category: 'ADOÇÃO PET · PROJETO COLABORATIVO', status: 'Projeto acadêmico',
        summary: 'Plataforma colaborativa de adoção e marketplace pet. Uma contribuição para descrições de produtos e descontos percentuais.',
        overview: 'Projeto acadêmico desenvolvido na disciplina de Projeto de Sistemas da UFT. A aplicação reúne funcionalidades relacionadas a animais, perfis de ONGs e empresas, marketplace pet e comunicação entre usuários, explorando conceitos de desenvolvimento web e organização de sistemas.',
        features: ['Perfis de usuários, empresas e ONGs, com gerenciamento de pets e produtos.', 'Catálogo de animais com filtros, status de adoção e favoritos.', 'Lojas, listagem de produtos e carrinho.', 'Conversas e atualização de mensagens por polling.', 'Fluxo de checkout explicitamente simulado.'],
        architecture: 'Python e Django organizam os apps AmigoFiel e chat. Views, URLs e templates renderizados no servidor utilizam modelos e migrações do Django ORM, com persistência PostgreSQL. A implementação é Django, apesar da descrição inconsistente de PHP/MySQL no fork.',
        contribution: 'Matheus Sulino é colaborador. O commit público e0228e5 adiciona descrição curta e desconto percentual ao ProdutoEmpresa. A equipe também inclui Eduardo Lopes, Eduardo Henrique, Henrique Wendler, Guilherme da Silva e Marcus Vinicius. Esse commit comprova uma contribuição específica, sem atribuir a Matheus a autoria integral da aplicação.',
        verification: 'Foram analisados modelos, views, rotas, migrações e o commit de contribuição. Os dois arquivos tests.py contêm apenas o scaffold padrão; nenhuma suíte automatizada funcional foi encontrada ou alegada.',
        limitations: 'O checkout é simulado; processamento real de pagamentos não foi comprovado. Não há demonstração pública confirmada. Participações adicionais só serão detalhadas com evidências.',
        imageCaption: 'Ilustração original do portfólio para o projeto colaborativo.'
      }
    }
  },
  {
    slug: 'controle-de-estoque', number: '05', name: 'Controle de Estoque', category: 'fullstack', verified: true,
    stack: ['PHP', 'MySQL', 'PDO', 'JavaScript', 'PHPUnit', 'MVC'],
    repository: 'https://github.com/vrascode/Eng.Software-Controle-de-Estoque',
    sources: [
      { label: 'BECKMAN700 / Eng.Software-Controle-de-Estoque', url: 'https://github.com/BECKMAN700/Eng.Software-Controle-de-Estoque' },
      { label: 'CONTRIBUICOES_MATHEUS_SULINO.md', url: 'https://github.com/vrascode/Eng.Software-Controle-de-Estoque/blob/ec1806143aef31b89ba09e0f97c020fcc2e39fb3/docs/CONTRIBUICOES_MATHEUS_SULINO.md' },
      { label: 'ProdutoModel.php', url: 'https://github.com/vrascode/Eng.Software-Controle-de-Estoque/blob/ec1806143aef31b89ba09e0f97c020fcc2e39fb3/app/Models/ProdutoModel.php' },
      { label: 'GitHub Pages', url: 'https://beckman700.github.io/Eng.Software-Controle-de-Estoque/' }
    ],
    content: {
      en: {
        category: 'INVENTORY MANAGEMENT · COLLABORATIVE PROJECT', status: 'Academic project',
        summary: 'Products, stock movements and inventory reporting. A team project built with PHP, MySQL and MVC architecture.',
        overview: 'A system developed for UFT’s Software Engineering course to organize and track inventory. It covers product management, incoming and outgoing stock movements, inventory and reports, using PHP and software architecture concepts.',
        features: ['Product creation and editing, categories, prices, units and minimum/maximum stock.', 'Stock entries and exits recorded with transactional quantity updates.', 'Inventory counts, discrepancies, approvals and adjustment audits.', 'Stock turnover, movement and valuation reports with relevant filters.', 'Session-based access, role permissions and CSRF protection in protected flows.'],
        architecture: 'Native PHP follows an MVC structure. Controllers coordinate views and models; PDO connects to MySQL. Relational tables cover users, products, movements, inventories and audit records. Transactions keep stock updates and movement history consistent.',
        contribution: 'Matheus contributed to user registration, stock limits, product filters, report refinements and interface improvements, with changes confirmed in Git history. The team includes João Pedro Rodrigues Bequiman, Giordano Bruno and Murillo Fernandes de Oliveira. Iagor Lourenço dos Santos is credited for earlier sprints.',
        verification: 'Implementation, schema and Matheus’s contribution commits were inspected. PHPUnit cases exist for validation, permissions, sessions, CSRF and inventory calculations. That suite was not executed in this review; helper tests do not establish database or end-to-end HTTP validation.',
        limitations: 'An academic team project. The linked GitHub Pages website is a project presentation, not an interactive deployment of the PHP/MySQL application.',
        imageCaption: 'Original portfolio illustration for the inventory project.'
      },
      pt: {
        category: 'GESTÃO DE ESTOQUE · PROJETO COLABORATIVO', status: 'Projeto acadêmico',
        summary: 'Produtos, movimentações e relatórios de estoque. Um projeto em equipe com PHP, MySQL e arquitetura MVC.',
        overview: 'Sistema desenvolvido na disciplina de Engenharia de Software da UFT, voltado à organização e ao acompanhamento de estoques. O projeto contempla gerenciamento de produtos, movimentações de entrada e saída, inventário e relatórios, utilizando PHP e conceitos de arquitetura de software.',
        features: ['Cadastro e edição de produtos, categorias, preços, unidades e estoque mínimo/máximo.', 'Entradas e saídas registradas com atualização transacional de quantidades.', 'Contagens de inventário, divergências, aprovações e auditoria de ajustes.', 'Relatórios de giro, movimentação e valorização do estoque com filtros correspondentes.', 'Acesso por sessão, permissões de perfis e proteção CSRF em fluxos protegidos.'],
        architecture: 'PHP nativo segue a estrutura MVC. Controllers coordenam views e models; PDO conecta ao MySQL. Tabelas relacionais cobrem usuários, produtos, movimentações, inventários e auditorias. Transações mantêm a consistência entre atualização de estoque e histórico.',
        contribution: 'Matheus contribuiu com cadastro de usuários, limites de estoque, filtros de produtos, refinamento de relatórios e melhorias de interface, com alterações confirmadas no histórico Git. A equipe inclui João Pedro Rodrigues Bequiman, Giordano Bruno e Murillo Fernandes de Oliveira. Iagor Lourenço dos Santos é creditado por sprints anteriores.',
        verification: 'Foram inspecionados a implementação, o schema e os commits de contribuição de Matheus. Existem casos PHPUnit para validação, permissões, sessões, CSRF e cálculos de inventário. A suíte não foi executada nesta análise; testes de helpers não comprovam validação de banco ou E2E HTTP.',
        limitations: 'Projeto acadêmico em equipe. O site GitHub Pages vinculado é uma apresentação do projeto, não uma implantação interativa da aplicação PHP/MySQL.',
        imageCaption: 'Ilustração original do portfólio para o projeto de estoque.'
      }
    }
  }
];

export function getProject(slug: string) { return projects.find(project => project.slug === slug); }

export function filterProjects(items: Project[], query: string, category: string, locale: Locale) {
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const term = normalize(query.trim());
  return items.filter(project => (category === 'all' || project.category === category) && normalize([project.name, project.content[locale].summary, ...project.stack].join(' ')).includes(term));
}
