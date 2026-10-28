# Matheus Sulino · VRAS CODE

[English](README.md)

Portfólio bilíngue de **Matheus Sulino**, desenvolvedor Full Stack e estudante de Ciência da Computação na Universidade Federal do Tocantins. **VRAS CODE** é a marca visual; **https://vrascode.dev** é o domínio de produção planejado.

A aplicação está implementada e validada localmente. A publicação em produção ainda não foi confirmada. Consulte [PROGRESS.md](PROGRESS.md) e [DEPLOYMENT.md](DEPLOYMENT.md).

## Acompanhar o desenvolvimento

Requisito: Node.js 22 ou superior; ambiente validado com Node.js 24.20.0.

```powershell
cd C:\Users\mathe\vrascode.dev
npm.cmd ci
npm.cmd run dev
```

Mantenha esse terminal aberto e acesse **http://localhost:3000**. O idioma padrão é inglês (`/en`). A versão em português está em **http://localhost:3000/pt**. Se a porta 3000 já estiver servindo este projeto, use o servidor existente. Para encerrar o servidor que você iniciou, pressione Ctrl+C. Não é necessário alterar a política de execução do PowerShell: use `npm.cmd`.

Em Linux/macOS, use `npm`. Para visualizar a versão de produção, execute `npm.cmd run build` e depois `npm.cmd run start`.

## Implementação

- Vinte e duas páginas localizadas: início, coleção de projetos, seis detalhes, sobre, experiência e contato, em português e inglês.
- Identidade original preservada, logotipo VRAS CODE, favicon SVG e ícone Apple próprios.
- Temas claro/escuro, preferência persistida, troca de idioma preservando a página, menu mobile, navegação por teclado e movimento reduzido.
- Busca e filtros de projetos, capturas reais e descrição clara do escopo e da participação de Matheus.
- Design Midnight Violet com temas escuro/claro, fontes Geist e JetBrains Mono, imagens otimizadas e animações discretas com GSAP.
- Revelações com ScrollTrigger, uma instância Lenis sincronizada ao ticker GSAP, âncoras e indicador de rolagem. Dispositivos com movimento reduzido ou baixa capacidade usam rolagem nativa.
- API pública do GitHub no servidor, cache de uma hora e estado de indisponibilidade.
- Metadados, Open Graph localizado, canonical, alternativas de idioma, sitemap, robots e JSON-LD.
- Estágio em TI na SEFAZ-TO desde junho de 2025, formação na UFT e tecnologias contextualizadas.
- Formação: 8º período, com período informado no LinkedIn de janeiro de 2023 a dezembro de 2027; dezembro de 2027 aparece como previsão. Não há percentual de conclusão.
- Logotipo oficial da UFT na seção acadêmica. A marca da SEFAZ-TO continua pendente de verificação e não é substituída por um brasão genérico do Estado.
- Cards de LinkedIn, GitHub, email e WhatsApp com contatos autorizados por Matheus. A fotografia fornecida aparece no Inicio, em Sobre Mim e nas imagens sociais; o curriculo continua opcional.
- Imagens Open Graph localizadas usam a fotografia fornecida; a identidade VRAS CODE permanece como composicao visual.

## Projetos e fontes

1. **ClearLedger:** reconciliação FastAPI/SQLite, CSV, relatórios imutáveis e dashboard Next.js.
2. **FinTrack Pro:** base Expo/React Native/NestJS; os fluxos financeiros ainda estão em desenvolvimento.
3. **VRAS Watches:** loja Django descrita com base nas informações fornecidas; o repositório não está acessível publicamente, então o link e capturas não são exibidos.
4. **VRAS CODE:** este portfólio, desenvolvido com Next.js e TypeScript.
5. **Controle de Estoque:** projeto colaborativo PHP/MySQL/MVC, com produtos, movimentações, inventários e relatórios.
6. **Amigo Fiel:** projeto colaborativo Django/PostgreSQL, com participação específica de Matheus creditada.

Veja [CONTENT_SOURCES.md](CONTENT_SOURCES.md) e [a pesquisa detalhada](docs/project-research.md). As limitações e os testes de cada projeto são separados dos testes deste portfólio.

## Tecnologias e organização

Next.js App Router, React, TypeScript, Tailwind CSS, GSAP, ScrollTrigger, Lenis, Lucide, next-intl e next-themes. Controles nativos atendem às interações; shadcn/ui não foi necessário.

O conteúdo original está em `content/identity.json`; traduções em `messages/`; páginas em `src/app/[locale]/`; componentes em `src/components/`; projetos e integrações em `src/lib/`; testes em `tests/`; evidências em `docs/`. A [arquitetura](ARCHITECTURE.md) detalha as responsabilidades.

## Validação

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run test:e2e
npm.cmd run check:links
npm.cmd audit --omit=dev
```

Os testes de navegador abrem um servidor de produção próprio na porta **3100**, sem encerrar o servidor de desenvolvimento na 3000. No Windows, usam Microsoft Edge instalado, quando disponível. Caso contrário, execute `npx.cmd playwright install chromium`. Capturas responsivas são gravadas em `.artifacts/screenshots/`, fora do Git. `PLAYWRIGHT_CHANNEL` permite selecionar outro canal instalado.

O email e WhatsApp autorizados ja estao configurados no conteudo publico. A foto esta integrada de public/images/matheus-sulino.png.jpeg; o curriculo pode ser salvo em public/documents/matheus-sulino-cv.pdf. Consulte .env.example, docs/profile-research.md e SECURITY.md.

Para atualizar o conteúdo, edite a identidade, os dois arquivos de tradução e os dados verificados em `src/lib/projects.ts`, mantendo fontes e idiomas consistentes.

Documentação: [arquitetura](ARCHITECTURE.md), [progresso](PROGRESS.md), [commits](COMMITS.md), [publicação](DEPLOYMENT.md), [fontes](CONTENT_SOURCES.md), [segurança](SECURITY.md).
