# Publicação · Vercel e Hostinger

## Estado atual

A aplicação está preparada para Vercel, e o código foi enviado ao GitHub com validação Linux aprovada. Não existe vínculo local `.vercel/project.json`, não foi encontrada CLI Vercel disponível, token no ambiente ou autenticação nas localizações usuais verificadas. Nenhuma implantação foi confirmada. O domínio planejado é **https://vrascode.dev**. Os registros DNS não foram alterados.

O site local pode ser acompanhado em **http://localhost:3000**, executando `npm.cmd run dev` na pasta do projeto. A versão em português fica em `/pt`; a raiz direciona para `/en`.

## Importar o repositório existente

1. Na conta Vercel responsável pelo domínio, escolha **Add New → Project**.
2. Conecte o GitHub e conceda acesso ao repositório existente **`vrascode/vrascode.dev`**. Não crie outro repositório e não altere o remote local.
3. Importe o projeto com preset **Next.js**, diretório raiz `./`, instalação `npm ci` e build `npm run build`. O arquivo `vercel.json` declara o framework e os comandos. Use uma versão Node.js compatível com `package.json`; o ambiente local foi validado com 24.20.0.
4. Nenhuma variável é obrigatória. Se necessário, adicione `GITHUB_TOKEN` como segredo de servidor na Vercel. Não utilize prefixo `NEXT_PUBLIC_`.
5. Gere a implantação e confirme o estado **Ready**, o commit implantado e a URL fornecida pela Vercel. A integração Git poderá gerar futuras implantações a partir dos pushes para `main`.
6. Teste `/en`, `/pt`, projetos, temas, idioma, ícones, `/robots.txt` e `/sitemap.xml` na URL retornada antes de conectar o domínio.

O fluxo corresponde à [integração oficial Vercel/GitHub](https://vercel.com/docs/git/vercel-for-github). As telas podem mudar; confirme a configuração exibida pela sua conta.

## Conectar vrascode.dev

1. No projeto Vercel, abra **Settings → Domains** e adicione `vrascode.dev`. Adicione `www.vrascode.dev` somente se desejar esse alias; mantenha o domínio principal coerente com os canonicals sem `www`.
2. Anote **exatamente** os registros, nomes, destinos e eventuais verificações TXT exibidos pela Vercel para esse projeto. Não substitua esses valores por IPs encontrados em tutoriais.
3. Na Hostinger, abra **Domínios → Portfólio de domínios → Gerenciar → DNS/Nameservers**. Exporte ou registre a zona atual antes de qualquer edição.
4. Verifique registros A, AAAA, CNAME, MX, TXT, CAA e subdomínios. Preserve e-mail, SPF/DKIM/DMARC, verificações de propriedade e outros serviços. A ausência de MX em uma consulta pública não comprova que não existam serviços ou configurações na conta.
5. Com os impactos conhecidos, altere apenas os registros necessários para o site, usando os valores efetivamente fornecidos pela Vercel. Manter a gestão DNS na Hostinger evita trocar toda a delegação de nameservers sem necessidade.
6. Aguarde a propagação e confirme **Valid Configuration** e o certificado HTTPS na Vercel. Abra `https://vrascode.dev/en` e `/pt` e confira o conteúdo e o commit implantado. Só então registre o site como publicado.

Referências: [domínios na Vercel](https://vercel.com/docs/domains/working-with-domains/add-a-domain) e [editor DNS da Hostinger](https://www.hostinger.com/support/how-to-use-hostingers-dns-zone-editor/).

## Consulta pública realizada, sem alterações

Em 27 de outubro de 2026:

| Consulta | Resultado observado |
| --- | --- |
| A de `vrascode.dev` | `2.57.91.91` |
| NS | `aurora.dns-parking.com`, `nebula.dns-parking.com` |
| MX | A consulta retornou `ENODATA` |

Esses são registros existentes observados, **não destinos recomendados para a Vercel**. Nenhum valor novo de DNS está prescrito neste documento. Refaça a verificação antes de editar a zona, pois os registros podem mudar.

## Verificação e retorno

Se a implantação não funcionar, use os logs da Vercel e uma implantação anterior validada. Para DNS, restaure apenas os registros que você efetivamente modificou a partir do registro da zona anterior. Não redefina toda a zona. O GitHub Actions executa verificações de código; seu resultado não comprova que um domínio foi publicado.
