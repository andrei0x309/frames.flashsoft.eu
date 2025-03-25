import type { sdk } from '@farcaster/frame-sdk'
import type { Config } from'@wagmi/core'

export type FrameSdk = typeof sdk;
export type WalletConfig =  Config