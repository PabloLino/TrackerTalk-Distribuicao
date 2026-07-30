# TrackerTalk — distribuição

Repositório público do site, manifestos de atualização e Releases do TrackerTalk.

## O que fica neste repositório

- site estático publicado pelo GitHub Pages;
- metadados públicos das versões;
- notas de lançamento;
- instaladores anexados às GitHub Releases;
- hashes SHA-256 para conferência de integridade.

O código-fonte do aplicativo TrackerTalk não faz parte deste repositório.

## Endereços

- Site: <https://pablolino.github.io/TrackerTalk-Distribuicao/>
- Versões: <https://github.com/PabloLino/TrackerTalk-Distribuicao/releases>
- Manifesto atual: <https://pablolino.github.io/TrackerTalk-Distribuicao/updates/latest.json>

## Publicação de uma versão

Cada versão publicada deve ter:

1. instalador com nome versionado, como `TrackerTalk-Setup-0.7.0.exe`;
2. arquivo `.sha256` correspondente;
3. notas da versão;
4. entrada em `updates/releases.json`;
5. atualização de `updates/latest.json`, quando for a versão estável mais recente.

Instaladores nunca devem ser adicionados ao histórico Git. Eles pertencem aos ativos de uma GitHub Release.

## Regras de imutabilidade

Depois que uma Release for publicada:

- não substituir o instalador mantendo o mesmo número de versão;
- não alterar silenciosamente o SHA-256;
- publicar uma nova versão para qualquer correção;
- manter versões anteriores disponíveis;
- informar quando uma versão não é mais suportada ou possui incompatibilidade de dados.

## Licenciamento

A licença aplicável ao aplicativo é declarada individualmente em cada Release. A disponibilização pública deste site e dos instaladores não torna o aplicativo open source.

A versão `0.6.4` foi a última publicada sob licença MIT. A versão `0.7.0` é a primeira proprietária gratuita e inclui sua licença de uso no instalador. A mudança não altera retroativamente os direitos concedidos à versão MIT.

Pessoas e organizações podem usar a versão proprietária sem cobrança, inclusive para trabalho profissional. O código-fonte do aplicativo não faz parte deste repositório público.

O conteúdo autoral deste repositório de distribuição permanece protegido pelos direitos aplicáveis, salvo indicação expressa em contrário.
