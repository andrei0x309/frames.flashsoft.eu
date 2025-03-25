<script lang="ts">
    import { frameSDK } from '$lib/stores/global/main'
    const openProfile = () => {
        $frameSDK.actions.viewProfile({
            fid: 1791
        })
    }
</script>

<button onclick={openProfile} class="warpcast-button">
    <span class="icon"
      ><svg
        viewBox="0 0 1260 1260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_2)">
          <path
            d="M947.747 1259.61H311.861C139.901 1259.61 0 1119.72 0 947.752V311.871C0 139.907 139.901 0.00541362 311.861 0.00541362H947.747C1119.71 0.00541362 1259.61 139.907 1259.61 311.871V947.752C1259.61 1119.72 1119.71 1259.61 947.747 1259.61Z"
            fill="#472A91"
          ></path>
          <path
            d="M826.513 398.633L764.404 631.889L702.093 398.633H558.697L495.789 633.607L433.087 398.633H269.764L421.528 914.36H562.431L629.807 674.876L697.181 914.36H838.388L989.819 398.633H826.513Z"
            fill="white"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_1_2">
            <rect width="1259.61" height="1259.61" fill="white"></rect>
          </clipPath>
        </defs></svg
    ></span>
    <span class="text1">Follow me</span>
  </button>
  
  
<style scoped>
  .warpcast-button {
  position: relative;
  width: 85px;
  height: 20px;
  border-radius: 30px;
  background-color: rgb(41, 30, 46);
  color: aliceblue;
  border: 1px #291041 solid;
  overflow: hidden;
  cursor: pointer;
  margin-right: 0.5rem;
}

.text1 {
    font-size: 10px;
    font-weight: 600;
    position: relative;
    top: -0.3rem;
    left: 0.5rem;
}
 
.icon {
  position: absolute;
  top: -1px;
  left: 1px;
  transition: transform 0.5s;
  border-radius: 50%;
  width: 1.3rem;
}
 

.warpcast-button:active {
  transform: scale(1.03);
}

</style>