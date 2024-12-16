import { query } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { Product_ID } = await req.json();
  const queryString = `DELETE FROM public."Product" WHERE "Product_ID"=$1`;
  try {
    await query(queryString, [Product_ID]);
    return NextResponse.json({ message: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "delete fail" }, { status: 400 });
  }
}
