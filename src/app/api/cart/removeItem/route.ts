import { NextApiRequest, NextApiResponse } from "next";
import { fetchItemsInCart, removeItemFromCart } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextApiResponse){
    const data = await req.json()
    try {
        const response = await removeItemFromCart(data.User_ID, data.Product_ID)
        return NextResponse.json('delete complete', {status : 200})
        
    } catch (error) {
        return NextResponse.json('error', {status:400})   
    }
}