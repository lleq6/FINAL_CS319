import { NextRequest, NextResponse } from 'next/server';
import { fetchProductsByCategory } from '../../lib/db';

export async function GET(req: NextRequest, res: NextResponse) {
    const id = req.nextUrl.searchParams.get('category_id')
    console.log(id,)
    const data = await fetchProductsByCategory(id)
    console.log(data.rows)
    return NextResponse.json(data.rows)
}

