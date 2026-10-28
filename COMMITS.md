# Commits reais

Histórico criado por entregas verificáveis, no repositório existente `vrascode/vrascode.dev`. Nenhum `git init`, troca de remote, force push, alteração de timestamps ou reescrita de histórico foi utilizado.

| Commit | Entrega |
| --- | --- |
| `550c705` | `docs: registrar identidade profissional` — preserva o conteúdo fornecido inicialmente. |
| `a2309ff` | `chore: configurar Next.js e ferramentas de desenvolvimento` — dependências fixadas, scripts e configuração. |
| `c8b922f` | `feat: implementar identidade visual e navegacao bilingue` — temas, fontes, componentes, layout, idiomas e identidade. |
| `061e05f` | `feat: apresentar projetos verificados e contribuicoes` — catálogo, filtros, páginas, imagens e evidências. |
| `2c9cb8c` | `feat: integrar GitHub com cache e fallback` — API de servidor, validação e tratamento de falhas. |
| `7d9fd14` | `feat: criar inicio e paginas profissionais de Matheus Sulino` — início, sobre, experiência, formação e contato. |
| `9a31fea` | `feat: implementar SEO e imagens sociais localizadas` — metadados sociais, robots e sitemap. |
| `96a11e9` | `test: validar navegacao traducoes acessibilidade e fontes` — testes automatizados e workflow GitHub Actions. |
| `f16fd96` | `chore: preparar publicacao Vercel e dominio Hostinger` — configuração e roteiro de publicação sem mudar DNS. |
| `1347301` | `docs: documentar arquitetura fontes e validacao` — documentação completa; implementação aprovada no GitHub Actions/Linux. |

O commit posterior `docs: registrar validacao remota e entrega` registra a confirmação do push e da [validação Linux](https://github.com/vrascode/vrascode.dev/actions/runs/40609600866). Os commits de entrega registram somente mudanças reais de estado ou correções.

Para consultar os identificadores completos e o estado de sincronização:

```powershell
git log --oneline --decorate
git status -sb
git remote -v
git ls-remote origin refs/heads/main
```

O hash completo de `git rev-parse HEAD` deve coincidir com o retornado para `refs/heads/main` após o envio final. O resultado de publicação em Vercel é independente do resultado do push.


## Atualizacao do perfil (2026-10-28)

| Commit | Entrega |
| --- | --- |
| 59a1b3a | feat: publish confirmed contacts and semester - authorized e-mail, WhatsApp and 8th / 8o semester in both locales. |
| f966812 | feat: integrate Matheus professional photo ? original JPEG in Home, About and Open Graph. |
| d3d208e | test: validate contacts, semester and photo ? unit tests, localized links and academic status, supplied image and Open Graph output. |

The email and WhatsApp details are public by explicit request. The supplied portrait was committed unchanged. Local checks passed before push; remote synchronization is verified after the normal push.
