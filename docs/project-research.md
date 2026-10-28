# Pesquisa dos projetos / Project research

Verificação: 27 de outubro de 2026. Foram lidos arquivos de implementação, testes, histórico Git e metadados públicos. Descrições comerciais e READMEs não foram tratados como prova suficiente de funcionalidades. Nenhum código dos projetos de origem foi alterado.

## Resultado e ordem

| Ordem | Projeto | Resultado |
| --- | --- | --- |
| 01 | FinTrack Pro | Local e repositório público encontrados; fundação de aplicativo financeiro, ainda sem operações financeiras implementadas. |
| 02 | ClearLedger | Local e repositório público encontrados; reconciliação, API, CLI, persistência e dashboard verificados. |
| 03 | VRAS anterior | Não foi possível identificar o site anterior com segurança. A loja USE-VRAS foi encontrada, mas não deve ser confundida com esse site ou com o novo portfólio. |
| 04 | Amigo Fiel | Projeto acadêmico colaborativo encontrado; Python/Django/PostgreSQL, contrariando a descrição PHP/MySQL no fork. |
| 05 | Controle de Estoque | Projeto acadêmico colaborativo encontrado; PHP/MySQL/MVC e participação de Matheus documentados e conferidos no histórico. |

## 01 — FinTrack Pro

- Repositório: <https://github.com/vrascode/fintrack-pro>.
- Commit público observado: `f5e71fd5f2aacc377ff551ab884fddc391df1595`.
- Fonte local: `C:\Projetos\fintrack-pro`; HEAD coincide com o commit público observado.
- Tecnologias de execução: Expo, React Native, React, TypeScript, Expo Router, Zustand, AsyncStorage, NestJS/Express e Zod.
- Estrutura: monorepo npm com `apps/mobile`, `apps/api`, `packages/shared` e `packages/config`.
- Interface real: visão geral, atividade, contas, cartões e ajustes, com estados vazios explícitos; navegação funcional, temas e preferência de ocultação de valores persistida no dispositivo.
- Domínio compartilhado: cálculos monetários exatos com inteiros/BigInt, divisão de parcelas que conserva centavos, validação de calendário e fuso horário.
- Segurança implementada como primitivas internas: hashing scrypt, tokens opacos, hashes de tokens, expiração, rotação de refresh tokens e detecção de reutilização. Isso **não significa login funcional**.
- API implementada: `GET /v1/health`, declarando saúde do processo.
- Banco: schema e migração Prisma para PostgreSQL, com usuários, sessões e tokens. A API atual não está conectada a um repositório de identidade persistente. Integração PostgreSQL não foi executada nesta pesquisa.
- Limitações: sem criação de contas financeiras, lançamentos, saldos reais, login HTTP ou validação de execução em aparelhos nativos. Sem demonstração pública confirmada.

Fontes de implementação:

- [API NestJS](https://github.com/vrascode/fintrack-pro/blob/f5e71fd5f2aacc377ff551ab884fddc391df1595/apps/api/src/app.ts).
- [Tela de visão geral e estados vazios](https://github.com/vrascode/fintrack-pro/blob/f5e71fd5f2aacc377ff551ab884fddc391df1595/apps/mobile/app/%28tabs%29/index.tsx).
- [Preferências persistidas e recuperação de erros](https://github.com/vrascode/fintrack-pro/blob/f5e71fd5f2aacc377ff551ab884fddc391df1595/apps/mobile/src/preferences/core.ts).
- [Schema PostgreSQL preparado](https://github.com/vrascode/fintrack-pro/blob/f5e71fd5f2aacc377ff551ab884fddc391df1595/apps/api/prisma/schema.prisma).
- [Testes reais](https://github.com/vrascode/fintrack-pro/tree/f5e71fd5f2aacc377ff551ab884fddc391df1595/tests).

Texto sugerido PT: Aplicativo de finanças pessoais em desenvolvimento, com navegação mobile, preferências persistidas e uma base testada para cálculos monetários e segurança de sessões. A arquitetura reúne Expo, React Native e uma API NestJS; os fluxos financeiros e a integração PostgreSQL estão em preparação.

Suggested EN: A personal finance application in development, with mobile navigation, persistent preferences and a tested foundation for money calculations and session security. The architecture combines Expo, React Native and a NestJS API; financial workflows and PostgreSQL integration are still being prepared.

### Testes executados nesta pesquisa

Comando no diretório local: `node --import tsx --test tests/*.test.ts tests/*.test.mjs`.

Resultado: **27 aprovados, 0 falhas**, saída 0. Cobertura observada: dinheiro, calendário, HTTP health real, preferências com persistência em disco e falhas, scrypt, tokens, expiração e rotação de sessões. A suíte de integração PostgreSQL e os testes de navegador não foram executados nesta pesquisa. Não converter esse resultado em alegação de app financeiro completo ou validação nativa.

## 02 — ClearLedger

- Repositório: <https://github.com/vrascode/clearledger>.
- Commit público observado: `d5205e199e823edaf0607038549b489edbd9139c`.
- Fontes locais: `C:\ProjetosNovo\projects\01-clearledger` e cópia pública em `C:\Users\mathe\GitProjects\clearledger-public`.
- Backend: Python, FastAPI, Pydantic e SQLite; frontend: Next.js, React, TypeScript, Tailwind CSS, next-intl, TanStack Query/Table e Recharts.
- Arquitetura: regras de reconciliação puras, ingestão CSV validada, repositório SQLite, API HTTP autenticada e CLI; dashboard consulta a API por camada do servidor.
- Reconciliação de pedidos contra cobranças/estornos e dos repasses líquidos contra depósitos bancários. Detecta pagamento ausente, valor bruto divergente, pedido desconhecido, estorno divergente, moeda incompatível, depósito ausente e divergência líquida, entre outros casos presentes nas regras.
- Suporta cobranças e depósitos divididos, estornos e reversões de taxas, totais separados por moeda e valores em unidades monetárias inteiras.
- Importação CSV atômica com limite de tamanho/linhas, identificação de lotes, hash de conteúdo, idempotência e detecção de conflitos.
- SQLite com transações de escrita, chaves estrangeiras e triggers que impedem alteração/exclusão dos snapshots de importações e relatórios.
- API de importações, execuções, consulta e exportação JSON/CSV; endpoints de negócio autenticados por API key. CLI usa acesso local confiável ao banco.
- Interface: overview, reconciliação, importações, execuções, relatórios e configurações; inglês/português, claro/escuro, filtros, tabelas, detalhes e exportações.
- Limitações: protótipo para um único host; não movimenta fundos, não demonstra implantação comercial e não é uma integração bancária ao vivo. Os exemplos e screenshots usam dados sintéticos.

Fontes:

- [Regras de reconciliação](https://github.com/vrascode/clearledger/blob/d5205e199e823edaf0607038549b489edbd9139c/clearledger/reconcile.py).
- [Persistência e imutabilidade](https://github.com/vrascode/clearledger/blob/d5205e199e823edaf0607038549b489edbd9139c/clearledger/store.py).
- [Ingestão de CSV](https://github.com/vrascode/clearledger/blob/d5205e199e823edaf0607038549b489edbd9139c/clearledger/ingest.py).
- [API](https://github.com/vrascode/clearledger/blob/d5205e199e823edaf0607038549b489edbd9139c/clearledger/api.py).
- [Dashboard](https://github.com/vrascode/clearledger/tree/d5205e199e823edaf0607038549b489edbd9139c/frontend/src).
- [Testes de backend](https://github.com/vrascode/clearledger/tree/d5205e199e823edaf0607038549b489edbd9139c/tests).
- [Testes de frontend](https://github.com/vrascode/clearledger/tree/d5205e199e823edaf0607038549b489edbd9139c/frontend/tests).

Texto sugerido PT: Reconciliação financeira entre pedidos, pagamentos e depósitos bancários. Importações CSV validadas, identificação de divergências e relatórios imutáveis em SQLite, com API FastAPI, CLI e dashboard bilíngue em Next.js.

Suggested EN: Financial reconciliation across orders, payments and bank deposits. Validated CSV imports, discrepancy detection and immutable SQLite reports, with a FastAPI API, CLI and bilingual Next.js dashboard.

### Testes executados nesta pesquisa

- Backend: `.\.venv\Scripts\python.exe -m pytest -q -p no:cacheprovider --basetemp "$env:TEMP\vrascode-clearledger-research-tests" --tb=short`, com `PYTHONDONTWRITEBYTECODE=1`: **64 aprovados**, saída 0, um aviso de depreciação Starlette/httpx.
- Frontend, no diretório `frontend`: `npm.cmd test`: **51 aprovados em 4 arquivos**, saída 0.
- Os testes frontend incluem geração de relatório pelo backend Python real em banco temporário; os valores financeiros não são apenas fixtures inventadas.
- Testes de navegador, lint e build de ClearLedger não foram repetidos nesta pesquisa.

## 03 — VRAS anterior

Não localizado com segurança nos repositórios públicos do usuário, pastas de projetos acessíveis e pesquisa web. Não deve ser identificado como o novo `vrascode.dev`.

Foi encontrado o projeto distinto `C:\usevraz\USE-VRAZ`, com origem <https://github.com/murilortu/USE-VRAZ>, descrito como sistema de venda de relógios. Templates usam a marca `USE-VRAS`; o código possui apps Django de catálogo, carrinho, contas, pedidos e pagamentos. O histórico local tem um commit inicial de `murilortu` e dois commits de Matheus Sulino relativos a `.gitignore`. Isso não comprova autoria integral nem que este é o site VRAS anterior solicitado. Arquivos de ambiente e banco local não foram lidos nem reutilizados.

Pendência editorial: confirmar URL/repositório do site anterior e delimitar os trabalhos e a participação de Matheus. Até lá, apresentar status de documentação pendente, sem inventar stack, demonstração, screenshots ou autoria.

## 04 — Amigo Fiel

- Fonte original: <https://github.com/Projeto-de-Sistemas-2025-2/Amigo-Fiel>.
- Fork do usuário: <https://github.com/vrascode/Amigo-Fiel>.
- Commit observado no fork: `98696f0e3fa4bacf4d6e781ce0390427e82fd0be`.
- Contexto: projeto acadêmico colaborativo de Projeto de Sistemas, UFT, 2025/2.
- Stack verificada: **Python, Django 5.2.6, PostgreSQL, Django ORM/Admin/Templates, HTML, CSS e JavaScript**. Não usar PHP/MySQL, apesar da descrição equivocada do fork.
- Arquitetura: apps Django `AmigoFiel` e `chat`, modelos e migrações relacionais, views/URLs, templates renderizados no servidor.
- Funcionalidades encontradas: perfis de usuário comum, empresa e ONG; catálogo de pets com filtros; cadastro/edição de pets e produtos; marcação de adoção; lojas e produtos; carrinho, favoritos, painéis e conversas com mensagens e polling.
- O fluxo de checkout chama-se explicitamente `checkout_simulado`; não há comprovação de processamento real de pagamentos. Não afirmar fluxo completo de triagem/agendamento apenas por constar no README.
- Banco PostgreSQL confirmado em `sistema/sistema/settings.py`; credenciais e dados da instância não foram acessados.

### Participação e colaboradores

Contribuição pública diretamente vinculada a `vrascode`: [commit e0228e591d78a44593f0aeab17745d835b1d87bf](https://github.com/Projeto-de-Sistemas-2025-2/Amigo-Fiel/commit/e0228e591d78a44593f0aeab17745d835b1d87bf), que adiciona `descricao_curta` e `desconto_percentual` ao modelo `ProdutoEmpresa`. Essa é a contribuição verificável no commit público, não um limite presumido de toda a participação acadêmica.

README e API de contribuidores também identificam Eduardo Lopes (`EduLps1`), Eduardo Henrique (`HelloKiw1`), Henrique Wendler (`Henrique-wendler`), Guilherme da Silva (`Guilherme1737`) e Marcus Vinicius (`Galessss`). Apresentar Matheus como colaborador, sem apropriar autoria integral.

Fontes:

- [Dependências reais](https://github.com/vrascode/Amigo-Fiel/blob/98696f0e3fa4bacf4d6e781ce0390427e82fd0be/requirements.txt).
- [Modelos](https://github.com/vrascode/Amigo-Fiel/blob/98696f0e3fa4bacf4d6e781ce0390427e82fd0be/sistema/AmigoFiel/models.py).
- [Views e checkout simulado](https://github.com/vrascode/Amigo-Fiel/blob/98696f0e3fa4bacf4d6e781ce0390427e82fd0be/sistema/AmigoFiel/views.py).
- [Chat](https://github.com/vrascode/Amigo-Fiel/blob/98696f0e3fa4bacf4d6e781ce0390427e82fd0be/sistema/chat/views.py).
- [Créditos da equipe](https://github.com/Projeto-de-Sistemas-2025-2/Amigo-Fiel#readme).

Teste: os arquivos `sistema/AmigoFiel/tests.py` e `sistema/chat/tests.py` contêm apenas o scaffold padrão, sem casos de teste. Não foi executada nem alegada suíte automatizada funcional. Sem demo pública confirmada.

Texto sugerido PT: Plataforma acadêmica colaborativa de adoção de animais e marketplace pet, desenvolvida com Django e PostgreSQL. Matheus contribuiu para o modelo de produtos, adicionando descrição curta e desconto percentual. O projeto inclui catálogos, perfis, favoritos, carrinho e chat; o checkout é simulado.

Suggested EN: A collaborative academic pet adoption and marketplace platform built with Django and PostgreSQL. Matheus contributed to the product model, adding short descriptions and percentage discounts. The project includes catalogs, profiles, favorites, a cart and messaging; checkout is simulated.

## 05 — Controle de Estoque

- Fonte original: <https://github.com/BECKMAN700/Eng.Software-Controle-de-Estoque>.
- Fork: <https://github.com/vrascode/Eng.Software-Controle-de-Estoque>.
- Commit público observado no fork: `ec1806143aef31b89ba09e0f97c020fcc2e39fb3`.
- Fonte local: `C:\xampp\htdocs\Eng.Software-Controle-de-Estoque`, HEAD `5e6b020bb7c9c6bd98afd7800c5f248bfd4725aa` (não presumir idêntico ao fork).
- Contexto: Engenharia de Software, UFT, 2026.1; projeto acadêmico em equipe.
- Stack: PHP nativo, MySQL com PDO, HTML, CSS, JavaScript; arquitetura MVC; PHPUnit para os testes existentes.
- Produtos: cadastro, edição, listagem com filtros, categorias, preços, unidades, status e limites mínimos/máximos.
- Movimentações: entradas e saídas com motivos, validação de quantidade, registro histórico e transações que atualizam produto e movimento juntos; saída possui atualização condicionada ao estoque disponível.
- Inventário: abertura, contagem, divergências, aprovação e auditoria de ajustes.
- Relatórios: giro de estoque, movimentações por período e valorização; filtros por período, produto e categoria nos métodos correspondentes. Código de exportação PDF usa FPDF.
- Persistência: tabelas `usuarios`, `produtos`, `movimentacoes`, `inventarios`, `inventario_itens` e `auditorias_estoque`; chaves estrangeiras e PDO.
- Interface MVC renderizada pelo PHP; sessão, perfis admin/estoquista e CSRF em fluxos protegidos.
- Landing page verificada com HTTP 200: <https://beckman700.github.io/Eng.Software-Controle-de-Estoque/>. É uma apresentação do projeto, **não uma demonstração interativa do sistema PHP/MySQL**.

### Participação de Matheus

O documento `docs/CONTRIBUICOES_MATHEUS_SULINO.md` registra contribuições em cadastro/login, edição de produtos, limites de estoque, filtros, refinamento dos relatórios, sidebar, documentação e integração de branches. Alguns commits são merges: distinguir integração de autoria original.

Commits inspecionados no histórico local:

- [6ff9709](https://github.com/BECKMAN700/Eng.Software-Controle-de-Estoque/commit/6ff9709): cadastro de usuário em controller, model, view e rota.
- [be40d55](https://github.com/BECKMAN700/Eng.Software-Controle-de-Estoque/commit/be40d55): estoque mínimo/máximo, incluindo schema e telas.
- [40df9aa](https://github.com/BECKMAN700/Eng.Software-Controle-de-Estoque/commit/40df9aa): filtros de produtos e refinamento de relatórios, controllers, models, views e estilos.
- [65cf42f](https://github.com/BECKMAN700/Eng.Software-Controle-de-Estoque/commit/65cf42f): sidebar recolhível com persistência, conforme relatório de contribuições.

Equipe atual conforme README: João Pedro Rodrigues Bequiman (`BECKMAN700`), Giordano Bruno (`GiordanOBru`), Murillo Fernandes de Oliveira (`murillofnandes`) e Matheus Sulino (`vrascode`). Iagor Lourenço dos Santos (`iagorlrnc`) é creditado por sprints anteriores.

Fontes:

- [Produtos e movimentações](https://github.com/vrascode/Eng.Software-Controle-de-Estoque/blob/ec1806143aef31b89ba09e0f97c020fcc2e39fb3/app/Models/ProdutoModel.php).
- [Relatórios](https://github.com/vrascode/Eng.Software-Controle-de-Estoque/blob/ec1806143aef31b89ba09e0f97c020fcc2e39fb3/app/Models/Relatorio.php).
- [Inventário](https://github.com/vrascode/Eng.Software-Controle-de-Estoque/blob/ec1806143aef31b89ba09e0f97c020fcc2e39fb3/app/Models/InventarioModel.php).
- [Schema](https://github.com/vrascode/Eng.Software-Controle-de-Estoque/blob/ec1806143aef31b89ba09e0f97c020fcc2e39fb3/database/schema.sql).
- [Contribuições de Matheus](https://github.com/vrascode/Eng.Software-Controle-de-Estoque/blob/ec1806143aef31b89ba09e0f97c020fcc2e39fb3/docs/CONTRIBUICOES_MATHEUS_SULINO.md).
- [Testes](https://github.com/vrascode/Eng.Software-Controle-de-Estoque/tree/ec1806143aef31b89ba09e0f97c020fcc2e39fb3/tests).

Testes: foram inspecionados casos PHPUnit de validação, permissões, sessão, CSRF, estrutura de respostas e cálculo de inventário. `tests/Feature/ApiProdutosTest.php` testa helpers/contratos sem banco e não deve ser descrito como E2E HTTP ou validação de persistência. A suíte não foi executada nesta pesquisa.

Texto sugerido PT: Sistema acadêmico de gestão de produtos, entradas e saídas, inventários e relatórios, com PHP, MySQL e arquitetura MVC. Matheus participou de cadastro/login, limites de estoque, filtros avançados, refinamento de relatórios e melhorias de interface, em colaboração com a equipe.

Suggested EN: An academic system for products, stock movements, inventories and reporting, built with PHP, MySQL and MVC architecture. Matheus contributed to registration/login, stock limits, advanced filters, report refinements and interface improvements alongside the team.

## Assets reais disponíveis

| Projeto | Arquivo local | Observação |
| --- | --- | --- |
| FinTrack Pro | `C:\Projetos\fintrack-pro\.cache\overview-desktop.png` | Inspecionado visualmente: interface real em estado vazio; não simula saldos ou operações implementadas. |
| FinTrack Pro | `C:\Projetos\fintrack-pro\.cache\overview-mobile.png` | Captura local existente, ainda não inspecionada nesta pesquisa. |
| ClearLedger | `C:\ProjetosNovo\docs\linkedin\assets\01-overview.png` | Inspecionado: dashboard real com banner Sample Data, valores sintéticos e resultados da reconciliação. |
| ClearLedger | `C:\ProjetosNovo\docs\linkedin\assets\02-reconciliation.png` | Captura local existente. |
| ClearLedger | `C:\ProjetosNovo\docs\linkedin\assets\03-exception-details.png` | Captura local existente. |
| ClearLedger | `C:\ProjetosNovo\docs\linkedin\assets\04-data-imports.png` | Captura local existente. |
| ClearLedger | `C:\ProjetosNovo\docs\linkedin\assets\05-reports.png` | Captura local existente. |
| ClearLedger | `C:\ProjetosNovo\docs\linkedin\assets\06-overview-pt-BR.png` | Captura local existente. |

As capturas dos dois projetos pessoais podem ilustrar os respectivos trabalhos do usuário com legenda fiel. Não reutilizar indiscriminadamente fotografias de animais, produtos, avatares ou equipe de Amigo Fiel: autoria/licenças individuais não foram estabelecidas. Não foi encontrada uma licença explícita nos metadados dos repositórios consultados; o badge MIT do README de Amigo Fiel, isoladamente, não confirma autorização sobre todas as imagens. Nenhuma imagem ou código do site de referência visual foi baixado nesta pesquisa.

## Pendências editoriais e de demonstração

- Identificar com segurança o site VRAS anterior e a participação de Matheus em seus trabalhos.
- Confirmar eventual participação acadêmica de Matheus em Amigo Fiel além do commit público identificado, antes de detalhá-la.
- Não anunciar demonstrações públicas de FinTrack Pro, ClearLedger ou Amigo Fiel: nenhuma foi confirmada.
- Separar infraestrutura preparada de funcionalidade concluída em FinTrack Pro.
- Manter o checkout de Amigo Fiel descrito como simulado e os screenshots de ClearLedger como dados sintéticos.
- Não incluir os projetos expressamente excluídos pelo usuário no catálogo ou nas integrações de projetos.
