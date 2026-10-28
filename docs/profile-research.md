# Revisão de LinkedIn e informações pessoais

Verificação em **27 de outubro de 2026** para o pedido de atualização do portfólio.

## LinkedIn

O perfil indicado por Matheus foi acessado de forma pública e anônima: <https://www.linkedin.com/in/matheus-sulino-2227a9257/>. A página não forneceu conteúdo legível; a resposta do leitor web foi **“999 Unknown Status Code”**. A busca pública não identificou conteúdo indexado para esse endereço. Nenhum login, autenticação ou tentativa de contornar controles de acesso foi usado.

Portanto, esta revisão não confirma a partir do LinkedIn o título exato, o resumo, os cargos e datas, as certificações, os cursos, as atividades ou outros projetos do perfil. O endereço, fornecido diretamente por Matheus, está disponível como link. Nenhum perfil de pessoa com nome parecido foi tratado como sendo o dele.

## Fontes independentes que continuam confirmadas

- **Identidade e biografia:** nome público a apresentar, formação em andamento, campus, cidade, interesse em engenharia de software e descrição profissional vieram das instruções atuais de Matheus.
- **Experiência:** EGEFAZ, início em junho de 2025 e atividades de suporte, manutenção, diagnóstico e infraestrutura foram fornecidos por Matheus. A página não adiciona cargo, duração ou resultado.
- **Formação:** Ciência da Computação na UFT, campus Palmas, em andamento, conforme as instruções de Matheus.
- **Conhecimentos declarados no GitHub:** o [README do perfil público `vrascode`](https://github.com/vrascode) lista Python, Java, JavaScript, PHP e C, além de desenvolvimento web e APIs. O README também declara interesse em Full Stack, sistemas, bancos de dados, engenharia de software e aprendizado contínuo. Esses são interesses declarados, não uma escala independente de proficiência.
- **Tecnologias dos projetos:** as tecnologias exibidas nas páginas de projetos vieram da inspeção de código, descrita em [project research](project-research.md). O portfólio não atribui essas tecnologias a um projeto que não as utilize.

## Não confirmado para publicação

| Informação | Situação desta revisão |
| --- | --- |
| Foto `public/images/matheus-sulino.png` | Arquivo não encontrado. O site verificará a existência e mostrará a foto quando Matheus adicionar seu arquivo original nesse caminho. Até lá, não exibe rosto gerado nem uma imagem quebrada. |
| Currículo PDF | Nenhum PDF profissional encontrado em `public/documents/matheus-sulino-cv.pdf`. O botão de download só aparece depois que o arquivo for fornecido. |
| E-mail profissional | Nenhum endereço foi confirmado para divulgação. E-mail de autoria Git não foi tratado como canal profissional público. O campo `PORTFOLIO_EMAIL` e o valor configurável vazio permitem ativá-lo após confirmação. |
| WhatsApp | Nenhum número foi fornecido nem autorizado para divulgação. `PORTFOLIO_WHATSAPP` permanece vazio; não existe número nem link `wa.me` no site atual. |
| Ingresso, semestre atual, disciplinas cursadas e previsão de conclusão | Não confirmados. A página acadêmica mostra apenas o curso em andamento e os períodos comprovados de Amigo Fiel (2025/2) e Controle de Estoque (2026.1). Nenhum percentual é calculado. |
| Cursos e certificações | Não confirmados por uma fonte legível. Nenhuma certificação foi adicionada. |
| Texto completo de apresentação ou experiências no LinkedIn | Não pôde ser verificado no perfil informado; o conteúdo do site usa os dados fornecidos e fatos dos repositórios examinados. |

## Handoff para atualização

Adicionar a fotografia original de Matheus a `public/images/matheus-sulino.png` e gerar uma nova build: os componentes de início, Sobre e Open Graph verificam esse arquivo e usam `next/image` ou ImageResponse.

Adicionar o currículo somente em `public/documents/matheus-sulino-cv.pdf` quando houver PDF profissional para divulgar. Configurar `PORTFOLIO_EMAIL` somente com o endereço que Matheus autorizar publicar. Configurar `PORTFOLIO_WHATSAPP` com código do país e número completo, somente depois da autorização explícita de divulgação. Em Vercel, defina esses dois valores como variáveis do ambiente de produção; eles aparecem publicamente nos cards de contato porque esse é o propósito do ajuste.

Para enriquecer o currículo sem inferir detalhes, forneça as informações ausentes do LinkedIn, sem precisar compartilhar credenciais: resumo aprovado para publicação, ingresso e situação acadêmica, experiências com datas, cursos/certificações com datas e verificações, e projetos ou atividades relevantes.
