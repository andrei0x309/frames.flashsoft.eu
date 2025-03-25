
import {
    registry,
} from "@angleprotocol/sdk";
import { DistributorPartialABI } from "../abis/distributorPartialABI";
import { writeContract, switchChain, getChainId } from '@wagmi/core'
import type { WalletConfig } from '$lib/types/frame-sdk'
import { supportedChains } from '$lib/frames/global/farcaster-wallet';

const baseAPIURL = 'https://api.merkl.xyz/v3/'

export const getRewardsForUser = async ({
    address
}: { address: `0x${string}` }

) => {
    try {
        const rewardsUrl = `${baseAPIURL}rewards?user=${address}`;
        const res = await fetch(rewardsUrl);
        if (!res.ok) {
            return null
        }
        const data = await res.json();
        if (!data) {
            return null
        }
        return data;
    } catch {
        return null
    }
};

export function formatTokenAmount(amount: string | bigint, decimals: number, places = 2): string {
    try {
      const amountBigInt = BigInt(amount);
      const divisor = BigInt(10) ** BigInt(decimals);
  
      const integerPart = amountBigInt / divisor;
      const fractionalPart = amountBigInt % divisor;
  
      let fractionalString = fractionalPart.toString().padStart(decimals, '0');
  
      // Remove trailing zeros
      fractionalString = fractionalString.replace(/0+$/, '');
  
      if (fractionalString === '') {
        return integerPart.toString();
      } else {
        return `${integerPart}.${fractionalString.slice(0, places)}`;
      }
    } catch (error) {
      console.error('Error formatting token amount:', error);
      return '0'; // Or some other error indicator
    }
  }

export const getMerklAppData = async () => {
    try {
      const res = await fetch(`${baseAPIURL}app`);
      if (!res.ok) {
        return null
      }
      const data = await res.json();
      if (!data) {
        return null
      }
      return data as {
        prices: [
            { rate:number, token: string }
        ],
        tokens: {
            [key: string]: {
                [key: `0x${string}`]: {
                    logoURI: string,
                }
            }
        }
      }
    } catch {
      return null
    }
  };

export const claim = async ({
  chainId,
  params,
  walletConfig
}: {
  chainId: number,
  params: {
    addresses: string[],
    tokens: string[],
    claims: string[],
    proofs: string[][]
  }
  walletConfig: WalletConfig
}) => {

    if (!supportedChains.includes(chainId as any)) {
      return {
        success: false,
        error: 'Chain not supported'
      }
    }

    const walletChainId = await getChainId(walletConfig)
    try {
    if (Number(walletChainId) !== Number(chainId)) {
      await switchChain(walletConfig, {
        chainId
      })
    }
   } catch {
    return {
        success: false,
        error: 'User rejected chain switch'
      }
    }

    const contractAddress = registry(chainId)?.Merkl?.Distributor;
    if (!contractAddress) {
      return {
        success: false,
        error: 'Distributor contract not found'
      }
    }
    
    let tx
    try {
    tx = await writeContract(walletConfig, {
      address: contractAddress as `0x${string}`,
      abi: DistributorPartialABI,
      functionName: 'claim',
      args: [
        params.addresses,
        params.tokens,
        params.claims,
        params.proofs
      ]
    })

    } catch {
      return {
        success: false,
        error: 'Transaction rejected'
      }
    }

    if (!tx) {
      return {
        success: false,
        error: 'Transaction failed'
      }
    }
    
    return {
      success: true,
      txHash: tx
    }

  };