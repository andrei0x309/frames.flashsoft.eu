<script lang="ts">
    import { page as SveltePage } from '$app/state';
    import { getAccount, watchAccount  } from '@wagmi/core'
    import { generateURLFCFrameEmbed } from '$lib/frames/global/client/fc-frame-v2';
    import { config } from "$lib/config";
    import { frameWalletConfig, isWalletReady, frameSDK  } from "$lib/stores/global/main"
    import type { WalletConfig } from "$lib/types/frame-sdk"
    import SimpleLoader from "../SimpleLoader.svelte";
    import { onDestroy } from 'svelte'
 
    let address = $state<`0x${string}` | undefined>('' as `0x${string}`) 
    const composeText = 'Triggerd composer action test'

    let unWatchAccount: () => void

    
     

    const ogImage = `${config.resolvedBaseUrl}/images/ogs/ffe-og-index.webp`
    const pageUrl = SveltePage.url.href.replace('http:', 'https:')
    const pageTitle = 'Mini Apps Demo Actions'
    const pageDescription = 'Farcaster Mini App to trigger the composer action'
 

    isWalletReady.subscribe(async ($isWalletReady) => {
        if ($isWalletReady) {
             const account = await getAccount($frameWalletConfig as WalletConfig)
             address = account.address

             unWatchAccount = watchAccount($frameWalletConfig, {
                onChange(account) { 
                    address = account.address
            },
            })

        }
    })

    onDestroy(() => {
        if(unWatchAccount) unWatchAccount()
    })

    const triggerComposer = async () => {
        console.log($frameSDK)
        $frameSDK.actions.composeCast({
            text: composeText,
        })
    }

    const triggerSIWF = async () => {
        const data = await $frameSDK.actions.signIn({
            nonce: '1234567890',
        })
        console.log(data)
    }

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
    buttonTitle: 'Composer Demo',
})} />

</svelte:head>

{#if !isWalletReady}
    <SimpleLoader />
{:else}

<section class="w-[98%] space-y-4 p-2 border-neutral-700 border-2 rounded-lg mx-auto mt-4">
    <h3 class="h5">Mini Apps Demo Actions</h3>
    <p class="h6 text-[0.9rem] inline">User address:</p>
    <p class="h6 text-[0.86rem] inline"><strong>{`${address?.slice(0,6)}...${address?.slice(-4)}`}</strong></p>
    <div class="flex justify-between items-center gap-4 flex-col">
        <button class="btn preset-outlined-success-500 p-2 mx-auto text-[0.8rem]" onclick={triggerSIWF}>Trigger SIWF</button>
        <button class="btn preset-outlined-success-500 p-2 mx-auto text-[0.8rem]" onclick={triggerComposer}>Trigger Composer</button>
 
    </div>
</section>
 



{/if}