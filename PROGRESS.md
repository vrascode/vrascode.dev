# Progresso · Matheus Sulino / VRAS CODE

Atualização: **28 de outubro de 2026**.

## Implementado

- Preservados o projeto existente, `content/identity.json`, `docs/identidade-profissional.md`, histórico Git e remote original.
- Aplicativo Next.js App Router, React, TypeScript, Tailwind CSS e next-intl com 22 páginas localizadas em `/en` e `/pt`.
- Identidade VRAS CODE, nome Matheus Sulino, temas claro/escuro, navegação, filtros, animações existentes e layout responsivo preservados.
- Apresentação de projetos atualizada nas duas línguas. Catálogo com ClearLedger, FinTrack Pro, VRAS Watches, VRAS CODE, Controle de Estoque e Amigo Fiel.
- VRAS Watches usa apenas a descrição fornecida; seu repositório retornou 404 para acesso anônimo. Sem link público, screenshot ou alegações adicionais.
- Páginas de experiência atualizadas com estágio de Tecnologia da Informação na Secretaria da Fazenda do Estado do Tocantins (SEFAZ-TO), desde junho de 2025, em Palmas e presencial, com as atividades informadas.
- A versão oficial do logotipo da SEFAZ-TO não pôde ser verificada nos recursos oficiais acessíveis e permanece pendente; nenhum brasão genérico foi apresentado como marca da secretaria.
- Formação na UFT atualizada para 8º período, com início informado em janeiro de 2023 e dezembro de 2027 apresentado como previsão. Sem percentual fictício de conclusão.
- Descrição acadêmica e marcos 2025/2 (Amigo Fiel) e 2026/1 (Controle de Estoque) atualizados, com links internos preservados.
- Logotipo oficial da UFT obtido no portal institucional e exibido junto à formação com proporção preservada e texto alternativo acessível.
- Documentação de fontes e informações atualizada em `CONTENT_SOURCES.md`, `README.md`, `README.pt-BR.md` e `ARCHITECTURE.md`.

## Validação desta atualização

| Verificação | Resultado |
| --- | --- |
| `npm.cmd run typecheck` | Aprovado. |
| `npm.cmd run lint` | Aprovado. |
| `npm.cmd test` | 11 testes aprovados. |
| `npm.cmd run build` | Aprovado; 22 páginas localizadas geradas. |
| `npm.cmd run test:e2e` | 24 cenários aprovados em Chromium, incluindo `/pt` e `/en`, projetos, experiência, formação, logotipo, temas, acessibilidade, responsividade e movimento reduzido. |
| Acessibilidade automatizada | 32 análises axe-core (oito páginas × dois idiomas × dois temas), sem violações das regras WCAG 2 A/AA e 2.1 AA examinadas. |
| `npm.cmd run check:links` | 22/22 links externos de fontes verificados com HTTP 200. O repositório VRAS Watches não é publicado como link, pois sua URL retorna 404 para acesso anônimo. |
| Logotipo UFT | PNG institucional servido com `image/png`; carregamento e texto alternativo validados no navegador. |
| `git diff --check` | Aprovado na revisão final. |

Os testes automatizados não substituem uma auditoria completa de acessibilidade, dispositivos físicos ou navegadores adicionais.

## Fontes e pendências

- As informações da experiência, formação, períodos acadêmicos e descrição da VRAS Watches foram fornecidas por Matheus para esta atualização. O perfil LinkedIn não permite leitura anônima automatizada.
- O arquivo UFT em `public/images/institutions/uft-logo.png` vem de recurso servido pela página institucional de identidade visual da UFT.
- A marca oficial SEFAZ-TO segue pendente de arquivo oficial verificável; a página de secretarias do portal oficial não disponibilizou o asset em uma URL acessível durante a verificação.
- Repositório e demonstração públicos da VRAS Watches seguem pendentes de acesso verificável.

## Ambiente e publicação

Para acompanhar localmente, execute `npm.cmd run dev` quando a porta 3000 estiver livre. Não inicie uma segunda instância se já houver um servidor ativo.

O remote continua `https://github.com/vrascode/vrascode.dev.git`. Os commits desta atualização aguardam push após a validação final. Nenhuma publicação na Vercel ou alteração DNS foi realizada nesta tarefa.
