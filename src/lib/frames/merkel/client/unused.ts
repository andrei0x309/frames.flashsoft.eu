export const getTokenPriceBySymbolClient = async (symbols: string[]) => {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    if (!symbols.length) return null;
    if (symbols.length > 25) {
       symbols = symbols.slice(0, 25)
    }
    const symbolQuery = `symbol=${symbols.join(',')}`

    const req = await fetch(`/api/token-price?${symbolQuery}`, options)

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
