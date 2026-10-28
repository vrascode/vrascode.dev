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


## Atualiza??o do perfil de Matheus Sulino

| Commit | Entrega |
| --- | --- |
| `6e443ea` | `feat: atualizar apresentacao e jornada profissional` ? biografia, in?cio, experi?ncia, educa??o, oito categorias de tecnologia, metadados e tradu??es. |
| `57705fc` | `feat: adicionar contatos e midias pessoais opcionais` ? cards LinkedIn/GitHub, e-mail e WhatsApp configur?veis, fotografia, curr?culo opcional e Open Graph com fotografia opcional. |
| `087553b` | `test: validar perfil e jornada academica` ? testes de tradu??o, dados pessoais, contatos, fotografia, linha do tempo, responsividade e acessibilidade. |

A confirma??o do envio desta atualiza??o consta no hist?rico remoto ap?s o push. A fotografia, o PDF, o e-mail e o WhatsApp n?o foram inclu?dos, pois n?o foram fornecidos/autorizados.
