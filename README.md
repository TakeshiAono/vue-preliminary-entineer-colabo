# サーバーの立ち上げ方

- 一番最初のdockerコンテナ立ち上げ時に `docker compose up`コマンドでvueサーバーを立ち上げる
- 以降はdocker desktopからコンテナを直接立ち上げれば自動でサーバーも立ち上がるようになる。

# envファイルの準備

- srcディレクトリと同じ階層に`.env.development`を作成し、その中に`VITE_API_SERVER_URI="http://localhost:8080"`というコードを貼り付けてください。

  .env.development

  ```text
  VITE_API_SERVER_URI="http://localhost:8080"
  ```

### 動かない場合

- ファイル名 `.env.development` の先頭に `.` (ドット)がついていることを確認する

# その他開発環境について

## Windows環境でHMR(ホットリロード)を動かしたい場合

Windows + Docker + ViteだとViteのホットリロードが動かないっぽい｡
vite.config.jsの `server` に `watch` を追加したら動いた｡

vite.config.js

```
export default defineConfig({
  ...
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 1000
    }
  },
  ...
})
```

参考:
https://zenn.dev/hctaw_srp/articles/1f7f67de03d710

# PUSH時とか

push前に以下のコマンドを実行してformat/lintする｡

format

```
npm run format
```

lint

```
npm run lint
```
