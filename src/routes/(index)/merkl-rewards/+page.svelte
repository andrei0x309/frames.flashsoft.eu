<script lang="ts">
    import { page as SveltePage } from '$app/state';
    import { getAccount } from '@wagmi/core'
    import { generateURLFCFrameEmbed } from '$lib/frames/global/client/fc-frame-v2';
    import { config } from "$lib/config";
    import { frameSDK, frameWalletConfig, isWalletReady  } from "$lib/stores/global/main"
    import type { WalletConfig } from "$lib/types/frame-sdk"
    import SimpleLoader from "../SimpleLoader.svelte";
    import { getMerklAppData, getRewardsForUser, formatTokenAmount, claim } from "$lib/frames/merkel/client"
    import ErrorAlert from '../ErrorAlert.svelte';


    type tableEntry = {
        chainId: number
        data: {
            tokenName: string
            tokenIcon?: string
            amount: string
            chainName?: string
            chainIcon?: string
            decimals: number
            usdValue?: number
            chainId: number
            tokenAddress: string
            proof: string[]
        }[]
    }

    let address = $state<`0x${string}` | undefined>('' as `0x${string}`) 
    let error = $state<string>('')
    let errorShow = $state<boolean>(false)
    let loadingRewards = $state<boolean>(false)
    
    let tableData = $state<tableEntry[]>([] as tableEntry[])
    let totalUSDValue = $state<number>(0)

    let claimParams = {
    } as {
        [chainId: number]: {
             addresses: `0x${string}`[]
             tokens: `0x${string}`[]
             claims: string[]
             proofs: string[][]
        }
    }

    function addItem(item: tableEntry) {
        tableData = [...tableData, item];  
    }
 
    function reAssignTableData(data: tableEntry[]) {
        const clonedData = [...data]
        tableData = clonedData
    }

    function removeChainId(chainId: number) {
        tableData = tableData.filter(item => item.chainId !== chainId)
    }

    const checkRewards = async () => {
        loadingRewards = true

        const appData = await getMerklAppData()

        let totalValue = 0

        const rewards = await getRewardsForUser({
            address: address as `0x${string}`,
        })

        console.log(rewards)
        
        const keys = Object.keys(rewards)

        const symbols = [] as string[]

        for (const key of keys) {
            const chainId = parseInt(key)
            const tokenData = rewards[key]['tokenData']
            const tokenDataKeys = Object.keys(tokenData)
            for (const tokenKey of tokenDataKeys) {
                const unclaimed = BigInt(tokenData[tokenKey]['unclaimed'])
                if(unclaimed === BigInt(0)) continue
                const tokenName = tokenData[tokenKey]['symbol']
                const tokenProof = tokenData[tokenKey]['proof']
                const tokenDecimals = tokenData[tokenKey]['decimals']
                const tokenUnclaimed = formatTokenAmount(tokenData[tokenKey]['unclaimed'], tokenDecimals)
                const findTokenPrice = appData?.prices.find(price => price.token === tokenName)
                const tokenAcumulated = tokenData[tokenKey]['accumulated']
                let tokenUSDValue = 0
                if (findTokenPrice) {
                    tokenUSDValue = Number(findTokenPrice.rate) * parseFloat(tokenUnclaimed)
                    totalValue += tokenUSDValue
                }
                let tokenIcon = ''
                const potentialTokenIcon = appData?.tokens?.[key]?.[tokenKey as `0x${string}`]?.logoURI
                if(potentialTokenIcon){
                    tokenIcon = potentialTokenIcon
                }
                const item = tableData.find(item => item.chainId === chainId)
                if(!symbols.includes(tokenName)) {
                    symbols.push(tokenName)
                }
                if(item) {
                    item.data.push({
                        tokenName,
                        tokenIcon,
                        amount: tokenUnclaimed,
                        chainId,
                        tokenAddress: tokenKey,
                        decimals: tokenDecimals,
                        usdValue:tokenUSDValue,
                        proof: tokenProof
                    })
                    reAssignTableData(tableData)
                    claimParams[chainId] = {
                        addresses: [address as `0x${string}`],
                        tokens: [tokenKey as `0x${string}`],
                        claims: [tokenAcumulated],
                        proofs: [tokenProof]
                    }
                    claimParams[chainId] = {
                        addresses: [...claimParams[chainId].addresses, address as `0x${string}`],
                        tokens: [...claimParams[chainId].tokens, tokenKey as `0x${string}`],
                        claims: [...claimParams[chainId].claims, tokenAcumulated],
                        proofs: [...claimParams[chainId].proofs, tokenProof]
                    }
                }else {
                    addItem({
                        chainId: chainId,
                        data: [{
                            tokenName,
                            tokenIcon,
                            amount: tokenUnclaimed,
                            chainId: chainId,
                            tokenAddress: tokenKey,
                            decimals: tokenDecimals,
                            usdValue:tokenUSDValue,
                            proof: tokenProof
                        }]
                    })
                    
                    claimParams[chainId] = {
                        addresses: [address as `0x${string}`],
                        tokens: [tokenKey as `0x${string}`],
                        claims: [tokenAcumulated],
                        proofs: [tokenProof]
                    }
                }
            }
        }
        console.log(claimParams)
        totalUSDValue = totalValue
        loadingRewards = false
    }


    const ogImage = `${config.resolvedBaseUrl}/images/ogs/ffe-merkl-rewards.webp`
    const pageUrl = SveltePage.url.href.replace('http:', 'https:')
    const pageTitle = 'Merkel Rewards Frame'
    const pageDescription = 'Frame for Merkel Rewards'

    const doClaim = async (chainId: number) => {
        error = ''
        errorShow = false
        loadingRewards = true
        const promptTx = await claim({
            chainId,
            params: claimParams[chainId],
            walletConfig: $frameWalletConfig
        })
        console.log(promptTx)

            if(promptTx.success) {
                removeChainId(chainId)
            } else {
                error = promptTx.error || 'Something went wrong'
                errorShow = true
            }
        loadingRewards = false
    }

    isWalletReady.subscribe(async ($isWalletReady) => {
        if ($isWalletReady) {
             const account = await getAccount($frameWalletConfig as WalletConfig)
             address = account.address
             checkRewards()
        }
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
    <h3 class="h5">Check Merkl.xyz LP Rewards</h3>
    <p class="h6 text-[0.9rem] inline">User address:</p>
    <p class="h6 text-[0.86rem] inline"><strong>{`${address?.slice(0,6)}...${address?.slice(-4)}`}</strong></p>
    <div class="flex justify-between items-center gap-4 flex-col">

        <ErrorAlert {error} show={errorShow} />
        
        {#if loadingRewards}
            <SimpleLoader />
        {:else if tableData.length === 0}
        <p class="h6 text-[0.86rem]">No rewards found.</p>
        <button class="btn preset-outlined-success-500 p-2 mx-auto text-[0.8rem]" onclick={() => checkRewards()}>Re-check Rewards</button>
        {:else}

        <div class="table-wrap">
            <table class="table caption-bottom text-[0.7rem]">
              <caption class="pt-4">Merkl Rewards Found.</caption>
              <thead>
                <tr>
                  <th>ChainId</th>
                  <th>Token</th>
                  <th style="text-align: center;">Claim</th>
                </tr>
              </thead>
              <tbody class="[&>tr]:hover:preset-tonal-primary">
                <!-- {
                  tableData.map( (row) => {
                    return (
                                            <tr>
                                                <td>row.chainId}</td>
                                                <td>{row.data.map(item => item.tokenName).join(', ')}</td>
                                                <td>{row.data.map(item => item.chainName).join(', ')}</td>
                                                <td class="text-right">{row.data.map(item => item.amount).join(', ')}</td>
                                            </tr>
                                        )
                  })
                } -->
                {#each tableData as row}
                <tr>
                    <td>{row.chainId}</td>
                    <td>
                        <table>
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Amount</th>
                                {#if totalUSDValue > 0}
                                <th>USD Value</th>
                                {/if}
                            </tr>
                        </thead>                            
                        <tbody>
                                {#each row.data as item}
                                <tr>
                                    <td>
                                        {item.tokenName}
                                    {#if item.tokenIcon}
                                        <img src={item.tokenIcon} alt={item.tokenName} class="w-4 h-4 inline-block" />
                                    {/if}
                                    </td>
                                    <td>{item.amount}</td>
                                    {#if (item?.usdValue || 0) > 0}
                                    <td>{item.usdValue?.toFixed(2)}$</td>
                                    {/if}
                                    </tr>
                                {/each}
                            </tbody>
                    </table></td>
                    <td>
                        <button onclick={(e) => {
                            e.preventDefault()
                            doClaim(row.chainId)
                        }} type="button" class="btn preset-outlined-success-500 p-2 mx-auto text-[0.8rem]">Claim</button>
                    </td>
               </tr>
               {/each}
              </tbody>
              {#if totalUSDValue > 0}
              <tfoot>
                <tr>
                  <td colspan="3">Total USD Value</td>
                  <td class="text-right">{totalUSDValue.toFixed(2)}$</td>
                </tr>
              </tfoot>
              {/if}
            </table>
          </div>

          {/if}

    </div>
</section>
 



{/if}