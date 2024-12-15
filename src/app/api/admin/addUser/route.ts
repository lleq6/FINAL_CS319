import { NextRequest, NextResponse } from "next/server";
import { addUser, checkEmail } from "../../lib/db";
import UserInfo from "@/app/model/UserInfo";

export async function POST(req: NextRequest, res : NextResponse) {
  try {
    const request: UserInfo = await req.json();
    delete request.User_ID;
    const data = await checkEmail(request.Email);
    if (data.count < 1) {
      await addUser(request);
      return NextResponse.json("add user complete", { status: 200 });
    } else {
      return NextResponse.json("email already exists", { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 400 });
  }
}
