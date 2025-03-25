

<script lang="ts">
    import {routes} from '$lib/config/routes'
    import { goto } from '$app/navigation';

    const goToMerkelRewards = () => {
      goto(routes['Merkel-Rewards-Frame'])
    }
 
  </script>
  
  <section class="w-[98%] space-y-4 p-2 border-neutral-700 border-2 rounded-lg mx-auto mt-4">
    <h2 class="h3">Available V2 Frames</h2>
    <div class="flex justify-between items-center gap-4">
      <p>Merkl.xyz LP Rewards</p>
      <button onclick={goToMerkelRewards} type="button" class="btn preset-outlined-success-500">Open</button>
    </div>
    <hr class="hr" />
    <div class="flex justify-between items-center gap-4">
      <p><small>Other frames may be available in the future</small></p>
     </div>
    <hr class="hr" />
 
  </section>