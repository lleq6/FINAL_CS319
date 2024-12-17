import { NextRequest, NextResponse } from "next/server";
import { fetchAllProduct } from "../../lib/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const product = await fetchAllProduct();
  console.log(product)
  console.log(product,'fetch all product');
  if (!product) {
    return NextResponse.json("PRODUCT NOT FOUND", { status: 404 });
  }
  return NextResponse.json(product);
}
