import { NextRequest, NextResponse } from "next/server";
import { addAddress } from "../../lib/db";
import UserAddress from "@/app/model/AddressModel";

export async function POST(req: NextRequest, res) {
  try {
    const request: UserAddress = await req.json();
    delete request.Address_ID;
    await addAddress(request);
    return NextResponse.json("add user address", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 400 });
  }
}
