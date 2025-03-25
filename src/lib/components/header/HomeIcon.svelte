<script lang="ts">
    const goToHome = () => {
        window.location.href = '/'
    }
</script>

<svg onclick={goToHome} onkeydown={() => {}} role="presentation" class="svg-home" style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16"
	><polygon fill="#FFFFFF"
		points="11,1 11,2.571 8,0 1,6 1,16 6,16 6,10 10,10 10,16 15,16 15,6 13,4.286 13,1 "
	/></svg
>

<style scoped>
    .svg-home {
        width: 0.9rem;
        height: 0.9rem;
        cursor: pointer;
        margin-right: 0.6rem;
    }
</style>