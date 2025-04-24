import { config } from './index'
const IS_DEV_ENABLED = config.IS_DEV_ENABLED
import type { TriggerConfig } from '$lib/types/farcaster-frame-v2'

export const FCConfig = {
    JFS: { 
        // JSON Farcaster Signature for ./well-known account association
        // JFS can be generated directly with Clear Wallet
        // JSON for .welll-known/farcaster.json is {"domain": "yourdomain-here.com"
        accountAssociation:
            IS_DEV_ENABLED ?
                {
                    "header": "eyJmaWQiOjE3OTEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhmOWM0ODNlNTFjOUIzNGMyYmNENTgyNTYwMzBlQjQzMmFEQTAyNDhmIn0",
                    "payload": "eyJkb21haW4iOiJ0dW4tNTU0NS5mbGFzaHNvZnQuZXUifQ", // {"domain": "tunn-5545.farcaster.eu"}
                    "signature": "MHg2N2Q2ZTQyZjcyNDk3NWY4YjE3ZDQyYTVkZjU2YzFmMjQ2YzhiZTM4OWM2NWY5MjMyMDZlNDMxNThjNTE1MDIyMWNiNDM2YTMwZWRkOTcxYTcyNWI3Zjg2YTdhZGQyZDAzOWQzM2ViZDY5YzhkNjg0MjNjZjRhMzRkY2MwNzM2ZjFi"
                }
                :
                {
                    "header": "eyJmaWQiOjE3OTEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhmOWM0ODNlNTFjOUIzNGMyYmNENTgyNTYwMzBlQjQzMmFEQTAyNDhmIn0",
                    "payload": "eyJkb21haW4iOiJmcmFtZXMuZmxhc2hzb2Z0LmV1In0", // {"domain": "frames.flashsoft.eu"}
                    "signature": "MHhjNTdhMDMyYzk4ZDc1ZjUzYzFlMzQzNGYyMmNkYjFiZTc3YTQ0ZjExZTllNmRjZWM2MTUwZjExOGJhMjY2MWU1NTU4MDczNDMyY2UxNzUxZWVhMjRkNGM3NjI5YTY0ZDMxOGQ1ODE4YmJmMzFhNDI1OTExYWZmOWMwNmQ5ZGIxYjFi"
                }
    },
    FrameConfig: {
        // Manifest version. Required.
        version: '1',

        // App name. Required.
        // Max length of 32 characters.
        // Example: "Yoink!"
        name: config.siteName,

        // Default launch URL. Required.
        // Max 512 characters.
        // Example: "https://yoink.party/"
        homeUrl: IS_DEV_ENABLED ? config.devBaseUrl + '/' : config.baseSiteUrl + '/',

        // Frame application icon URL.
        // Max 512 characters.
        // Image must be 200x200px and less than 1MB.
        // Example: "https://yoink.party/img/icon.png"
        iconUrl:  IS_DEV_ENABLED ? config.devBaseUrl + '/hotlink-ok/favicon.png' : config.baseSiteUrl + '/hotlink-ok/favicon.png' ,

        // Default image to show when frame is rendered in a feed.
        // Max 512 characters.
        // Image must have a 3:2 ratio.
        // Example: "https://yoink.party/framesV2/opengraph-image"
        imageUrl:  IS_DEV_ENABLED ? config.devBaseUrl + '/images/ogs/ffe-og-index.webp' : config.baseSiteUrl  + '/images/ogs/ffe-og-index.webp',

        // Default button title to use when frame is rendered in a feed.
        // Max 32 characters.
        // Example: "🚩 Start"
        buttonTitle: 'Open App',

        // Splash image URL.
        // Max 512 characters.
        // Image must be 200x200px and less than 1MB.
        // Example: "https://yoink.party/img/splash.png"
        splashImageUrl: IS_DEV_ENABLED ? config.devBaseUrl + '/hotlink-ok/favicon.png' : config.baseSiteUrl + '/hotlink-ok/favicon.png' ,

        // Hex color code.
        // Example: "#eeeee4"
        splashBackgroundColor: '#35303f',


        // URL to which clients will POST events.
        // Max 512 characters.
        // Required if the frame application uses notifications.
        // Example: "https://yoink.party/webhook"
        webhookUrl:  IS_DEV_ENABLED ? config.devBaseUrl + '/api/fc-webhook' :  config.baseSiteUrl + '/api/fc-webhook',

        triggers: [
            {   
                // Type of trigger, either cast or composer. Required.
                type: 'cast',
    
                // Unique ID. Required. Reported to the frame.
                // Example: "yoink-score"
                id: 'flashsoft-blog-id',
    
                // Handler URL. Required.
                // Example: "https://yoink.party/triggers/cast"
                url: IS_DEV_ENABLED ? config.devBaseUrl : config.baseSiteUrl
            },
            {
                type: 'composer',
                id: 'flashsoft-blog-id',
                url: IS_DEV_ENABLED ? config.devBaseUrl : config.baseSiteUrl
            }
        ] as TriggerConfig[],

        // Extended Metadata.
        subtitle: config.extendedMetadata.subtitle,
        description: config.extendedMetadata.description,
        screenshotUrls: config.extendedMetadata.screenshotUrls,
        primaryCategory: config.extendedMetadata.primaryCategory,
        tags: config.extendedMetadata.tags,
        heroImageUrl: IS_DEV_ENABLED ? config.devBaseUrl + '/images/ogs/ffe-og-index.webp' : config.baseSiteUrl  + '/images/ogs/ffe-og-index.webp',
        tagline: config.extendedMetadata.description,
        ogTitle: config.siteName,
        ogDescription: config.extendedMetadata.description,
        ogImageUrl: IS_DEV_ENABLED ? config.devBaseUrl + '/images/ogs/ffe-og-index.webp' : config.baseSiteUrl  + '/images/ogs/ffe-og-index.webp',
    }
}