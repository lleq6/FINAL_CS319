import { NextRequest, NextResponse } from "next/server";
import { fetchOneProduct } from "../../lib/db";

export async function GET(req: NextRequest, res : NextResponse) {
  const id = req.nextUrl.searchParams.get("id");
  const product = await fetchOneProduct(id);
  console.log(product);
  if (!product) {
    console.log("test");
    return NextResponse.json("PRODUCT NOT FOUND", { status: 404 });
  }
  return NextResponse.json(product);
}
