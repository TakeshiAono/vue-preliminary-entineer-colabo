#　サーバーの立ち上げ方
- 一番最初のdockerコンテナ立ち上げ時に `docker compose up`コマンドでvueサーバーを立ち上げる
- 以降はdocker desktopからコンテナを直接立ち上げれば自動でサーバーも立ち上がるようになる。

# envファイルの準備
- srcディレクトリと同じ階層に`.env.development`,`.env.staging`,`.env.production`を作成する。データの中身は既存メンバーに問い合わせしてください。