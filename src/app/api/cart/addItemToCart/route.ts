import { NextApiRequest, NextApiResponse } from "next";
import { fetchItemsInCart, insertToCart } from "../../lib/db";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import Error from "next/error";

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const { User_ID, Product_ID, Quantity } = await req.json();
    console.log(User_ID, Product_ID, Quantity);
    const response = await insertToCart(User_ID, Product_ID, Quantity);
  } catch (error) {
    return NextResponse.error();
  }
  return NextResponse.json({ message: "addToCart Success" }, { status: 200 });
}
