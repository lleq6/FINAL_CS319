import { NextRequest, NextResponse } from "next/server"
import { fetchAllProduct } from "../../lib/db"


export async function GET(req : NextRequest, res) {
  const product = await fetchAllProduct()
  if (!product){
    return NextResponse.json('PRODUCT NOT FOUND',{status:404})
  }
  return NextResponse.json(product)

}
