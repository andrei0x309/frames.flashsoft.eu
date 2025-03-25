import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getTokenPriceBySymbol } from '$lib/frames/merkel/server';

export const GET: RequestHandler = async ({ url }) => {
    const symbol = url.searchParams.get('symbol');
    const symbols = symbol?.split(',');

    if (!symbols) {
        return json({ error: 'No symbol provided' }, { status: 400 });
    }

    const data = await getTokenPriceBySymbol(symbols);

    if (!data) {
        return json({ error: 'Failed to fetch token price' }, { status: 500 });
    }

    return json(data);
};
