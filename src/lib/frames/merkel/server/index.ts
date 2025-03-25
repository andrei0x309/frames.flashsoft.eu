import { ALCHEMY_API_KEY } from '$env/static/private';

// This gives wrong prices sometimes(might weork well for more popular tokens) so is not used
export const getTokenPriceBySymbol = async (symbols: string[]) => {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    if (!symbols.length) return null;
    if (symbols.length > 25) {
       symbols = symbols.slice(0, 25)
    }

    const querySymbols = symbols.map(symbol => `symbols=${symbol}`).join('&');

    const req = await fetch(`https://api.g.alchemy.com/prices/v1/${ALCHEMY_API_KEY}/tokens/by-symbol?${querySymbols}`, options)

    if(!req.ok) {
        return null
    }

    try {
        const res = await req.json()
        return res as {
            data: {
                "symbol": string
                "prices": [
                  {
                    "currency": string
                    "value": string
                    "lastUpdatedAt": string
                  }
                ]
              }[]
        }
    } catch (e) {
        console.error(e)
        return null
    }
}