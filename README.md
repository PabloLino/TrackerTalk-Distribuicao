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

## Guia visual

O guia combina um carrossel com nove capturas do painel real e um vídeo sem áudio, regravado sobre as mesmas telas. As conversas, os projetos e os anexos são fictícios. As capturas identificam a versão do aplicativo, em `assets/guia/capturas.json`, e podem ser ampliadas pelo visitante.

Ao mudar a interface, gere novas capturas no projeto privado, confira cada função e atualize vídeo e capa com o mesmo material. Não recrie telas nem use conversas pessoais no material publicado. O carrossel deve manter navegação por teclado e toque, controle de reprodução e respeito a movimento reduzido.

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
