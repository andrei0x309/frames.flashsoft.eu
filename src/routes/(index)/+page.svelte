

<script lang="ts">
    import {routes} from '$lib/config/routes'
    import { goto } from '$app/navigation';

    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
    }
  </script>
  

  <section class="w-[98%] space-y-4 p-2 border-neutral-700 border-2 rounded-lg mx-auto mt-4">
    <h2 class="h3">Available Farcaster Mini Apps</h2>
    <div class="flex justify-between items-center gap-4">
      <p>Merkl.xyz LP Rewards</p>
      <button onclick={(e) => {
        e.preventDefault();
        copyToClipboard(`${window.location.origin}${routes['Merkel-Rewards-Frame']}`)
         }}
        type="button" class="btn preset-outlined-success-500">Copy URL</button>
      <button onclick={(e) => {
        e.preventDefault();
        goto(routes['Merkel-Rewards-Frame'])
      }} type="button" class="btn preset-outlined-success-500">Open</button>
    </div>
    <div class="flex justify-between items-center gap-4">
      <p>Sign Message Demo</p>
      <button onclick={(e) => {
        e.preventDefault();
        copyToClipboard(`${window.location.origin}${routes['Sign-message-demo-Frame']}`)
         }}
        type="button" class="btn preset-outlined-success-500">Copy URL</button>
      <button onclick={(e) => {
        e.preventDefault();
        goto(routes['Sign-message-demo-Frame'])
      }} type="button" class="btn preset-outlined-success-500">Open</button>
    </div>
    <div class="flex justify-between items-center gap-4">
      <p>Mini Apps Actions demo</p>
      <button onclick={(e) => {
        e.preventDefault();
        copyToClipboard(`${window.location.origin}${routes['Mini-apps-demo-actions']}`)
         }}
        type="button" class="btn preset-outlined-success-500">Copy URL</button>
      <button onclick={(e) => {
        e.preventDefault();
        goto(routes['Mini-apps-demo-actions'])
      }} type="button" class="btn preset-outlined-success-500">Open</button>
    </div>
    <div class="flex justify-between items-center gap-4">
      <p>Mobile gestures navigation demo</p>
      <button onclick={(e) => {
        e.preventDefault();
        copyToClipboard(`${window.location.origin}${routes['Mobile-gestures-navigation']}`)
         }}
        type="button" class="btn preset-outlined-success-500">Copy URL</button>
      <button onclick={(e) => {
        e.preventDefault();
        goto(routes['Mobile-gestures-navigation'])
      }} type="button" class="btn preset-outlined-success-500">Open</button>
    </div>
    <hr class="hr" />
    <div class="flex justify-between items-center gap-4">
      <p><small>Other mini apps may be available in the future</small></p>
     </div>
    <hr class="hr" />
 
  </section>