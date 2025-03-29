<script lang="ts">
    import { page as SveltePage } from '$app/state';
    import { signMessage, getAccount, watchAccount  } from '@wagmi/core'
    import { generateURLFCFrameEmbed } from '$lib/frames/global/client/fc-frame-v2';
    import { config } from "$lib/config";
    import { frameWalletConfig, isWalletReady  } from "$lib/stores/global/main"
    import type { WalletConfig } from "$lib/types/frame-sdk"
    import SimpleLoader from "../SimpleLoader.svelte";
    import ErrorAlert from '../ErrorAlert.svelte';
    import { onDestroy } from 'svelte'
 
    let address = $state<`0x${string}` | undefined>('' as `0x${string}`) 
    let error = $state<string>('')
    let textToSign = $state<string>('')
    let errorShow = $state<boolean>(false)
    let loadingSig = $state<boolean>(false)
    let signature = $state<string>('')
    let unWatchAccount: () => void

    
     

    const ogImage = `${config.resolvedBaseUrl}/images/ogs/ffe-og-sign.webp`
    const pageUrl = SveltePage.url.href.replace('http:', 'https:')
    const pageTitle = 'Sign Demo Frame'
    const pageDescription = 'Frame for signing messages'

    const doSign = async () => {
        error = ''
        errorShow = false
        signature = ''
        loadingSig = true

        const sig = await signMessage($frameWalletConfig, {
            message: textToSign
        })
        signature = sig
 
        loadingSig = false
    }

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

</script>

<svelte:head>
<title>{pageTitle}</title>
<meta name="description" content={pageDescription}>
<meta property="og:title" content={pageTitle} />
<meta property="og:description" content={pageDescription} />
<meta property="og:type" content="website" />
<meta property="og:url" content={`${pageUrl}`} />
<meta property="og:image" content={ogImage} />

 
<meta name="fc:frame" content={generateURLFCFrameEmbed(ogImage, pageUrl)} />

</svelte:head>

{#if !isWalletReady}
    <SimpleLoader />
{:else}

<section class="w-[98%] space-y-4 p-2 border-neutral-700 border-2 rounded-lg mx-auto mt-4">
    <h3 class="h5">Demo Sign Message</h3>
    <p class="h6 text-[0.9rem] inline">User address:</p>
    <p class="h6 text-[0.86rem] inline"><strong>{`${address?.slice(0,6)}...${address?.slice(-4)}`}</strong></p>
    <div class="flex justify-between items-center gap-4 flex-col">

        <ErrorAlert {error} show={errorShow} />
        
        {#if loadingSig}
            <SimpleLoader />
        {:else}
        
        <div class="form-container">
            <form class="form">
              <div class="form-group">
                <label for="textarea">Input Text To Sign</label>
                <textarea 
                class="bg-neutral-800 w-[94%] mx-auto my-2 block"
                required={true} cols="50" rows="10" id="textarea" name="textarea" bind:value={textToSign}></textarea>
              </div>
              <button onclick={(e) => {
                e.preventDefault()
                doSign()
              }} type="submit" class="btn preset-outlined-success-500 p-2 mx-auto text-[0.8rem] ml-[0.7rem]">Sign</button>
            </form>
        </div>
        {/if}
        {#if signature}
        <div class="form-container">
            <form class="form">
                <div class="form-group">
                    <label for="textarea">Signature</label>
                    <textarea
                     disabled={true}
                     class="bg-neutral-800 w-[94%] mx-auto my-2 block"
                    required={true} cols="50" rows="10" id="textarea" name="textarea" bind:value={signature}></textarea>
                </div>
                </form>
        </div>
        <button class="btn preset-outlined-success-500 p-2 mx-auto text-[0.8rem]" onclick={() => navigator.clipboard.writeText(signature)}>Copy Signature</button>
        {/if}

    

    </div>
</section>
 



{/if}