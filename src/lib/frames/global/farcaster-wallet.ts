// import { browser } from '$app/environment'
import { http, createConfig } from '@wagmi/core'
import { base, polygon, mainnet, mode, gnosis, celo, blast, swellchain } from 'wagmi/chains';
import { frameConnector, } from './connector'
import type { FrameSdk } from '../../types/frame-sdk'

export const supportedChains = [base.id, polygon.id, mainnet.id, mode.id, gnosis.id, celo.id, blast.id, swellchain.id]

export const getConfig = (sdk: FrameSdk) => {
  return createConfig({
    chains: [base, polygon, mainnet, mode, gnosis, celo, blast, swellchain],
    transports: {
      [base.id]: http(),
      [polygon.id]: http(),
      [mainnet.id]: http(),
      [mode.id]: http(),
      [gnosis.id]: http(),
      [celo.id]: http(),
      [blast.id]: http(),
      [swellchain.id]: http(),
    },
    connectors: [frameConnector(sdk)],
});
}
  