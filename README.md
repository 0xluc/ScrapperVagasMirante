# ScrapperVagasMirante

Este projeto é um scrapper de vagas desenvolvido em TypeScript com notificações para um canal ou grupo no Telegram. 

## Requisitos

- Node.js
- npm ou yarn

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/0xluc/ScrapperVagasMirante
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd ScrapperVagasMirante
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

## Configuração

Antes de executar o scrapper, você precisa configurar algumas variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```
BOT_TOKEN=seu_token_do_bot
CHAT_ID=id_do_chat
```

- `BOT_TOKEN`: O token do seu bot no Telegram.
- `CHAT_ID`: O ID do chat ou grupo onde as notificações serão enviadas.

## Uso

Para iniciar o scrapper, execute o seguinte comando:

```bash
npm start
```

ou

```bash
yarn start
```

