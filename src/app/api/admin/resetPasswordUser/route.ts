import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "../../lib/db";

export async function POST(req: NextRequest, res : NextResponse) {
  const { User_ID } = await req.json();
  try {
    await resetPassword(User_ID);
    return NextResponse.json("reset success", { status: 200 });
  } catch (error) {
    return NextResponse.json("error", { status: 400 });
  }
}
