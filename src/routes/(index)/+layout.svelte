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
</script>

<Shell>
	<Header />

	{#if !$isViewingFromFrame}
		<OnlyViewUsingFrame />
	{:else}
		{@render children()}
	{/if}
</Shell>
