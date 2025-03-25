import { writable } from 'svelte/store';
import type { WalletConfig, FrameSdk } from '$lib/types/frame-sdk'

export const theme = writable('dark');
export const navigationLoading = writable(false);
export const frameSDK = writable<FrameSdk>(null as unknown as FrameSdk);
export const frameWalletConfig = writable<WalletConfig>(null as unknown as WalletConfig);
export const isViewingFromFrame = writable(false);
export const isWalletReady = writable(false);