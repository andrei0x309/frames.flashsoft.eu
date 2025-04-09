# frames.flashsoft.eu

## About

This is a SvelteKit Warpcast V2 frames project, it can be used to create your own Warpcast V2 frames using SvelteKit in SPA or prerender mode, potentially being able to serve millions of request with 0$ costs on providers like Cloudflare or Netlify.

It mainly uses SPA & prerender mode to serve frames, but if you need server calls you can add those very easily.
The main advantage of using this template over mainly React and Next templates out there is that is guranteed to consume fewer resources for you as a dev,
it has far fewer dependencies and is way more lightweight, the only drawback is that you need to know SvelteKit/Svelte to easily use it.

## Features

- modern stack: SvelteKit 2.xx, Svelte 5.XX, TypeScript, TailwindCSS 4.xx, Vite 6.xx, Skeleton, Bun
- loading farcaster frames SDK in global memory accessible by any frame
- config folder to setup your frames configuration(you can generate account association data with clear wallet or use other tools/scripts)
- function to generate header meta for frame page
- allowing the website to be viewed only in frame context
- global available wagmi wallet config to call wallet functions
- `isWalletReady` subscription to know when the wallet is ready

## Requirements

It has no special requirements, but is recomanded to know how to use SvelteKit, TypeScript, TailwindCSS, Bun, Skeleton, Vite and Bun.

## Demo Merkl Frame

https://github.com/user-attachments/assets/83c306b9-ecca-48d1-b050-780acd310d33

## Demo Sign message Frame

https://github.com/user-attachments/assets/b087d0e4-e054-46fc-a433-e69a83ce1f51

## Not allowing outside-of-frame context

https://github.com/user-attachments/assets/85da3b2f-571f-42eb-80d2-2a43253a0fd0

## Deployed Version

Deployed at: [https://frames.flashsoft.eu](https://frames.flashsoft.eu)

Links that work in cast as a v2 frame:

- [https://frames.flashsoft.eu/](https://frames.flashsoft.eu/) (index)
- [https://frames.flashsoft.eu/merkl-rewards](https://frames.flashsoft.eu/merkl-rewards) (merkl rewards frame)
- [https://frames.flashsoft.eu/sign-demo](https://frames.flashsoft.eu/sign-demo) (Do message sign demo)
- [https://frames.flashsoft.eu/composer-demo](https://frames.flashsoft.eu/composer-demo) (Trigger composer demo)
