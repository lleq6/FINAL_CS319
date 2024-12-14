import { NextRequest, NextResponse } from "next/server";
import { addUser, checkUsername } from "../../lib/db";
import UserInfo from "@/app/model/UserInfo";

export async function POST(req: NextRequest, res) {
  try {
    const request: UserInfo = await req.json();
    delete request.User_ID;
    const data = await checkUsername(request.Username);
    if (data.count < 1) {
      await addUser(request);
      return NextResponse.json("add user complete", { status: 200 });
    } else {
      return NextResponse.json("username already exists", { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 400 });
  }
}
