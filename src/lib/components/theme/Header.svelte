<script lang="ts">
import HomeIcon from '../header/HomeIcon.svelte';
import FollowMeWarpcast from '../header/FollowMeWarpcast.svelte';
</script>

<nav id="header" class="w-full shadow-lg border-b-[0.2rem] border-amber-600" style="box-shadow: inset 0px -13px 10px 5px var(--color-surface-contrast-50);">
    <div class="w-full flex items-center justify-between mt-0 h-[4rem]">
        <a href="/" aria-label="home"><img src="/images/global/frames-nav-logo.webp" alt="logo" class="h-[4rem]" style="mix-blend-mode: lighten;"/></a>




       <div class="order-2 flex flex-wrap items-center justify-end mt-9" id="nav-content">
         <FollowMeWarpcast/>
         <HomeIcon/>
       </div>
    </div>
 </nav>

 <style scoped>
    #header {
        background: rgb(41,40,40);
        background: linear-gradient(90deg, rgba(41,40,40,1) 0%, rgba(38,38,38,1) 34%, rgba(36,36,36,1) 64%, rgba(19,19,19,1) 100%)

    }
</style>