import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db";
import { uploadImage } from "../uploadImage/addImage";
import { NextRequest, NextResponse } from "next/server";
import { ProductInfo } from "@/app/model/Product";
export async function POST(req: NextRequest, res: NextApiResponse) {
  const { Product_ID } = await req.json()
  const queryString = `DELETE FROM public."Product" WHERE "Product_ID"=$1`
    try {
        await query(queryString,[Product_ID])
        return NextResponse.json({message: true}, {status:200})
    } catch (error) {
        return NextResponse.json({message:'delete fail'}, {status:400})
    }
}
