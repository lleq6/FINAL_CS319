<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import {
  fetchProductsBySubCategory,
  fetchSubCategoryDetail,
} from "../../lib/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.searchParams.get("category_id");
  // req.nextUrl.pathname
  console.log(id);

  const data = await fetchProductsBySubCategory(id);
  console.log(data.rows);
  const data2 = await fetchSubCategoryDetail(id);

  const result = {
    products: data.rows,
    nav: data2.rows[0],
  };
  return NextResponse.json(result);
}
=======
import { NextRequest, NextResponse } from 'next/server';
import { fetchProductsBySubCategory, fetchSubCategoryDetail } from '../../lib/db';

export async function GET(req: NextRequest, res: NextResponse) {
    const id = req.nextUrl.searchParams.get('category_id')
    // req.nextUrl.pathname
    console.log(id,)

    const data = await fetchProductsBySubCategory(id)
    console.log(data.rows)
    const data2 = await fetchSubCategoryDetail(id)

    const result = {
        products : data.rows,
        nav : data2.rows[0]
    }
    return NextResponse.json(result)
}


>>>>>>> 8c1ebf8b73ad8290fee41aac5e0141c4c28ffe1f
