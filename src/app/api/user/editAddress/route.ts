import { NextRequest, NextResponse } from "next/server";
import { editUserAddress } from "../../lib/db";
import AddressInfo from "@/app/model/AddressInfo";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const request: AddressInfo = await req.json();
    delete request.User_ID;
    await editUserAddress(request);
    return NextResponse.json("update address complete", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 400 });
  }
}
