import { NextRequest, NextResponse } from 'next/server';
import { fetchChildCategoryDetail, fetchProductsByChildCategory} from '../../lib/db';

export async function GET(req: NextRequest, res: NextResponse) {
    const id = req.nextUrl.searchParams.get('category_id')
    console.log(id,)
    const data = await fetchProductsByChildCategory(id)
    console.log(data.rows)
    const data2 = await fetchChildCategoryDetail(id)
    const result = {
        products : data.rows,
        nav : data2.rows[0]
    }
    return NextResponse.json(result)
}
