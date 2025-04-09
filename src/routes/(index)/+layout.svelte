<script lang="ts">
	import '$lib/css/app.css';

	import Shell from '$lib/components/theme/Shell.svelte';
	import Header from '$lib/components/theme/Header.svelte';
	import type { FrameSdk } from '$lib/types/frame-sdk';
	import { onMount } from 'svelte';
	import { getConfig } from '$lib/frames/global/farcaster-wallet';
	import {
		frameSDK,
		frameWalletConfig,
		isViewingFromFrame,
		isWalletReady
	} from '$lib/stores/global/main';
	import OnlyViewUsingFrame from './OnlyViewUsingFrame.svelte';
	import { watchConnections, getAccount } from '@wagmi/core';

	const pageIsReady = async (sdk: FrameSdk) => {
		const context = await sdk.context;
		sdk.actions.ready();
		return context;
	};

	export const prerender = true

	// const getAddress = async (sdk:FrameSdk) => {
	// 	await sdk.context;
	// 	console.log(await getAccount(walletConfig as WalletConfig))
	// }

	// setInterval(() => {
	// 	getAddress(sdk as FrameSdk)
	// }, 1000)

	onMount(() => {
		import('@farcaster/frame-sdk').then(async (module) => {
			const context = await pageIsReady(module.default);
			frameSDK.set(module.default);
			frameWalletConfig.set(await getConfig(module.default));
			if ((context?.user?.fid || 0) > 0) {
				isViewingFromFrame.set(true);
			}
			if (getAccount($frameWalletConfig)?.address) {
				isWalletReady.set(true);
			} else {
				const unwatch = watchConnections($frameWalletConfig, {
					onChange () {
						if (getAccount($frameWalletConfig)?.address) {
							isWalletReady.set(true);
							unwatch();
						}
					}
				});
			}
		});
	});

	let { children } = $props();

	import { page as SveltePage } from '$app/state';
    import { config } from "$lib/config";


    import { generateURLFCFrameEmbed } from '$lib/frames/global/client/fc-frame-v2';


    const ogImage = `${config.resolvedBaseUrl}/images/ogs/ffe-og-index.webp`
    const pageUrl = SveltePage.url.href.replace('http:', 'https:')
    const pageTitle = 'SveleteKit starter Mini App'
    const pageDescription = 'Mini app starter for SvelteKit using Farcaster, 2 demo apps are included'
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription}>
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${pageUrl}`} />
    <meta property="og:image" content={ogImage} />
    
    <meta name="fc:frame" content={generateURLFCFrameEmbed({
		url:pageUrl,
		featureImage:ogImage,
	})} />
    
    </svelte:head>

<Shell>
	<Header />

	{#if !$isViewingFromFrame}
		<OnlyViewUsingFrame />
	{:else}
		{@render children()}
	{/if}
    <!-- Small footer link to source on github -->
	<p class="text-center text-xs text-gray-500">
		<a href="https://github.com/andrei0x309/frames.flashsoft.eu" target="_blank" class="underline">
		Source on Github
		</a>
	</p>
</Shell>
