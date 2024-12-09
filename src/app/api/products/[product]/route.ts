<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { fetchOneProduct } from "../../lib/db";

export async function GET(req: NextRequest, res) {
  const id = req.nextUrl.searchParams.get("id");
  const product = await fetchOneProduct(id);
  console.log(product);
  if (!product) {
    console.log("test");
    return NextResponse.json("PRODUCT NOT FOUND", { status: 404 });
  }
  return NextResponse.json(product);
}
=======
import { NextRequest, NextResponse } from "next/server"
import { fetchOneProduct } from "../../lib/db"


export async function GET(req : NextRequest, res) {
  const id = req.nextUrl.searchParams.get('id')
  const product = await fetchOneProduct(id)
  console.log(product)
  if (!product){
    console.log('test')
    return NextResponse.json('PRODUCT NOT FOUND',{status:404})
  }
  return NextResponse.json(product)
}
>>>>>>> 8c1ebf8b73ad8290fee41aac5e0141c4c28ffe1f
