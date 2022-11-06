This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## プロダクト概要

本プロダクトは、トークンに対するTag付けを分散的な投票によって行うDAOである。Tag付けとは、例えばエコノミクスを駆使し環境問題に取り組むKlimaDAOのトークンはFinance,Environment,Governance Tokenという感じである。
　次に、なぜこれをやるのか。現状のWeb3業界はWalletの匿名性の高さによってサービスの幅が制限されている。この問題を解決するために、ウォレットの中身のトークン群からその持ち主の特性を導き出し、サービスに活かすトレンドがある。今後SBTの規格が確定するとこのトレンドは加速し、トークンと人間の認識との橋渡し的な存在であるTag付けは大きく貢献できる。例は動画で説明します。
　ではどうやってトークンにTag付けを行うのか。Tag付けは、ただ人間が主観で認識しているものであり、絶対的正解がない。ゆえに投票という集合知的な決め方と相性が良い。そこでメンバーにインセンティブを付与して投票を促し、決定したトークンとTagの組み合わせをブロックチェーン上に保管するDAOを構築した。またTagの集合についての更新もDAOでの投票で決定する。


## 使用したtech stacks

Next.js / infura / web3.js / metamask / ethereum

package.jsonにalchemyやmongoDBも載っていますが、今回は使っていません（途中で使うのをやめました）

## 使用したBlockchain

ethereum goerli testnet

## deployしたContract
DAOのsmart contract：https://goerli.etherscan.io/address/0x306459d1b8aab7a6129106e734775224c92c861f

DAO内のTokenのsmart contract：https://goerli.etherscan.io/address/0x5bf2346ae019d9539fbcc1fcd9039fa4cd1987e3

## application codeやその他のfile

特になし

## 審査やテストのためにプロジェクトにアクセスする方法など

アプリURL：https://tag-dao-project.vercel.app/

管理者画面：https://tag-dao-project.vercel.app/admin

（時間の都合でログイン機能等なしの誰でもアクセスできる管理画面になっています）

以下、具体的なプロジェクトのテスト方法。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [https://tag-dao-project.vercel.app/api/hello](https://tag-dao-project.vercel.app/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
