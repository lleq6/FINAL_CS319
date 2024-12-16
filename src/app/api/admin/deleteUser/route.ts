import { NextRequest, NextResponse } from "next/server";
import { deleteUser, deleteAddressByUserID } from "../../lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const { User_ID } = await req.json();
  try {
    await deleteAddressByUserID(User_ID);
    await deleteUser(User_ID);
    return NextResponse.json("delete complete", { status: 200 });
  } catch (error) {
    return NextResponse.json("error", { status: 400 });
  }
}
