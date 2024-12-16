import { NextRequest, NextResponse } from "next/server";
import { deleteAddress } from "../../lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { Address_ID } = await req.json();
  try {
    await deleteAddress(Address_ID);
    return NextResponse.json("delete complete", { status: 200 });
  } catch (error) {
    return NextResponse.json("error", { status: 400 });
  }
}
