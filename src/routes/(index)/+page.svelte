

<script lang="ts">
    import {routes} from '$lib/config/routes'
    import { goto } from '$app/navigation';
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
    
     
    <meta name="fc:frame" content={generateURLFCFrameEmbed(ogImage, pageUrl)} />
    
    </svelte:head>

  <section class="w-[98%] space-y-4 p-2 border-neutral-700 border-2 rounded-lg mx-auto mt-4">
    <h2 class="h3">Available Farcaster Mini Apps</h2>
    <div class="flex justify-between items-center gap-4">
      <p>Merkl.xyz LP Rewards</p>
      <button onclick={(e) => {
        e.preventDefault();
        goto(routes['Merkel-Rewards-Frame'])
      }} type="button" class="btn preset-outlined-success-500">Open</button>
    </div>
    <div class="flex justify-between items-center gap-4">
      <p>Sign Message Demo</p>
      <button onclick={(e) => {
        e.preventDefault();
        goto(routes['Sign-message-demo-Frame'])
      }} type="button" class="btn preset-outlined-success-500">Open</button>
    </div>
    <hr class="hr" />
    <div class="flex justify-between items-center gap-4">
      <p><small>Other mini apps may be available in the future</small></p>
     </div>
    <hr class="hr" />
 
  </section>