export const IS_DEV_ENABLED = true;
const baseSiteUrl = 'https://frames.flashsoft.eu';
const devBaseUrl = 'https://tun-5545.flashsoft.eu';


export const config = {
    siteName: 'frames.flashsoft.eu',
    baseSiteUrl,
    devBaseUrl,
    IS_DEV_ENABLED,
    resolvedBaseUrl: IS_DEV_ENABLED ? devBaseUrl : baseSiteUrl,
}