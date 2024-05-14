#　サーバーの立ち上げ方
- 一番最初のdockerコンテナ立ち上げ時に `docker compose up`コマンドでvueサーバーを立ち上げる
- 以降はdocker desktopからコンテナを直接立ち上げれば自動でサーバーも立ち上がるようになる。

# envファイルの準備
- srcディレクトリと同じ階層に`.env.development`を作成し、その中に`VITE_API_SERVER_URI="http://localhost:8080"`というコードを貼り付けてください。
