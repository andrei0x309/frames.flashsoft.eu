export const IS_DEV_ENABLED = false;
const baseSiteUrl = 'https://frames.flashsoft.eu';
const devBaseUrl = 'https://tun-5545.flashsoft.eu';


export const config = {
    siteName: 'SveleteKit Starter Mini-App',
    baseSiteUrl,
    devBaseUrl,
    IS_DEV_ENABLED,
    resolvedBaseUrl: IS_DEV_ENABLED ? devBaseUrl : baseSiteUrl,
}