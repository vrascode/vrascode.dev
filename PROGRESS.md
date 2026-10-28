# Progresso · Matheus Sulino / VRAS CODE

Atualização: **27 de outubro de 2026**.

## Implementado

- Preservação de `content/identity.json`, `docs/identidade-profissional.md`, repositório e remote originais.
- Next.js App Router, React, TypeScript, Tailwind, Motion, Lucide, next-intl e next-themes.
- Identidade VRAS CODE, nome Matheus Sulino, fontes locais, favicon e ícone Apple próprios.
- `/en` padrão e `/pt`, com vinte páginas de conteúdo: início, projetos, cinco detalhes, sobre, experiência e contato em cada idioma.
- Temas, idioma, navegação desktop/mobile, foco por teclado, movimento reduzido e retorno ao topo.
- Busca e filtros, capturas reais de FinTrack/ClearLedger, créditos e limites dos projetos colaborativos.
- Formação em Ciência da Computação na UFT e estágio em TI na EGEFAZ desde junho de 2025.
- Integração GitHub com cache, timeout, validação de resposta e fallback; contato pelo perfil informado.
- SEO, canonical, hreflang, JSON-LD, Open Graph, sitemap, robots e proteção contra indexação de previews.
- Configuração Vercel, workflow de validação GitHub Actions e documentação de DNS sem alteração da zona.

## Validação executada localmente

| Verificação | Resultado |
| --- | --- |
| `npm.cmd run typecheck` | Aprovado. |
| `npm.cmd run lint` | Aprovado, sem erros ou avisos na execução final. |
| `npm.cmd test` | 8 testes aprovados. |
| `npm.cmd run build` | Aprovado; vinte páginas de conteúdo pré-renderizadas. |
| Playwright | 14 testes aprovados na execução completa inicial; falha do ícone Apple corrigida e o teste restante aprovado na repetição direcionada. |
| Navegação | Vinte páginas, links internos, idioma, temas, menu mobile e erros 404 verificados. |
| Acessibilidade | 28 análises axe-core: sete páginas × dois idiomas × dois temas, sem violações das regras WCAG 2 A/AA e 2.1 AA examinadas. Teclado, foco do menu, skip link e movimento reduzido também testados. |
| Responsividade | 360, 390, 768 e 1440 pixels, em ambos os idiomas, sem overflow horizontal nas rotas examinadas. |
| Links externos | 20/20 links das fontes retornaram HTTP 200. |
| Dependências de produção | `npm.cmd audit --omit=dev`: zero vulnerabilidades reportadas. |
| Inspeção visual | Capturas reais do portfólio em desktop/celular revisadas; nenhuma exceção JavaScript detectada no preview. |

O problema do ícone Apple vinha do proxy de idiomas, que redirecionava `/apple-icon` para uma rota localizada inexistente. O ícone agora é excluído desse redirecionamento. A suíte também verifica as duas imagens Open Graph.

Testes automatizados não equivalem a auditoria integral de acessibilidade, validação em dispositivos físicos ou teste em todos os navegadores. A execução local utilizou Microsoft Edge/Chromium no Windows; o workflow Linux está preparado, mas seu resultado remoto depende da execução no GitHub.

## Projetos pesquisados

FinTrack Pro, ClearLedger, Amigo Fiel e Controle de Estoque foram localizados e analisados. Foram executados separadamente 27 testes do FinTrack, 64 de backend e 51 de frontend do ClearLedger. A pesquisa detalha o que foi apenas inspecionado nos demais projetos, sem afirmar testes não executados.

VRAS mantém página própria na terceira posição, com fonte pendente. Não foi confundido com este portfólio nem com a loja USE-VRAS encontrada localmente.

## Ambiente local

Um servidor existente do projeto foi observado na porta 3000 e preservado. `http://localhost:3000/en` retornou HTTP 200. Para acompanhar em outro terminal, execute `npm.cmd run dev` quando a porta estiver livre; não inicie uma segunda instância se o projeto já estiver servindo ali. Os testes usam a porta 3100 e encerram apenas seu próprio servidor.

## Git e hospedagem

Commits são criados por entregas reais, sem reescrever timestamps. O envio e a confirmação do GitHub serão registrados ao concluir a sincronização. O remote continua `https://github.com/vrascode/vrascode.dev.git`.

Nenhuma publicação na Vercel ou no domínio foi confirmada. Nenhum DNS foi alterado. [DEPLOYMENT.md](DEPLOYMENT.md) contém instruções de conexão com valores a obter na própria hospedagem.

## Pendências

1. Identificar URL/repositório do VRAS anterior para substituir o estado pendente por conteúdo verificado.
2. Importar o repositório na conta Vercel, confirmar uma implantação e configurar o domínio com os registros fornecidos pelo projeto.
3. Opcional: informar um canal de contato adicional, caso o proprietário deseje exibir e-mail ou LinkedIn. O contato atual pelo GitHub funciona sem essa informação.
