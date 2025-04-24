export const IS_DEV_ENABLED = false;
const baseSiteUrl = 'https://frames.flashsoft.eu';
const devBaseUrl = 'https://tun-5545.flashsoft.eu';


export const config = {
    siteName: 'SveleteKit Starter Mini-App',
    baseSiteUrl,
    devBaseUrl,
    IS_DEV_ENABLED,
    resolvedBaseUrl: IS_DEV_ENABLED ? devBaseUrl : baseSiteUrl,
    extendedMetadata: {
        description: 'SvelteKit Mini app starter with many features and demos',
        tags: ['sveltekit', 'svelte', 'starter', 'sveltekit miniapp', 'developer'],
        primaryCategory: 'developer-tools',
        subtitle: 'Flashsoft MiniApp Starter',
        screenshotUrls: [
            IS_DEV_ENABLED ? devBaseUrl + '/hotlink-ok/screenshots/screenshot-1.png' : baseSiteUrl + '/hotlink-ok/screenshots/screenshot-1.png',
            IS_DEV_ENABLED ? devBaseUrl + '/hotlink-ok/screenshots/screenshot-2.png' : baseSiteUrl + '/hotlink-ok/screenshots/screenshot-2.png',
        ],
    }
}