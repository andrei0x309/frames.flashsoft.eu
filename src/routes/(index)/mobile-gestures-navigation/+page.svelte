<script lang="ts">
    import { page as SveltePage } from '$app/state';
    import { generateURLFCFrameEmbed } from '$lib/frames/global/client/fc-frame-v2';
    import { config } from "$lib/config";
    import { swipe, type SwipeCustomEvent } from 'svelte-gestures';
    import {  goto  } from '$app/navigation';


    let direction;
    let target;
    let pointerType;
 

  
    const ogImage = `${config.resolvedBaseUrl}/images/ogs/ffe-og-index.webp`
    const pageUrl = SveltePage.url.href.replace('http:', 'https:')
    const pageTitle = 'Mobile Swipe Demo'
    const pageDescription = 'Farcaster Mini App to trigger the composer action'
 
    function handler(event: SwipeCustomEvent) {
        direction = event.detail.direction;
        target = event.detail.target;
        pointerType = event.detail.pointerType;

        if (direction === 'left') {
            goto('/')
        }
        if (direction === 'right') {
            goto('/mini-apps-demo')
        }
         
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


<section class="w-[98%] space-y-4 p-2 border-neutral-700 border-2 rounded-lg mx-auto mt-4">
    <h3 class="h5">Mobile Swipe Navigation demo</h3>
    <div class="flex justify-between items-center gap-4 flex-col bg-amber-900 min-h-56" use:swipe={()=>({ timeframe: 300, minSwipeDistance: 60 })}
        onswipe={handler}
        >
        Swipe left to go back
        Swipe right to go to /mini-apps-demo
    </div>
</section>
