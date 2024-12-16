import { NextRequest, NextResponse } from "next/server";
import { updateUser, checkEmail } from "../../lib/db";
import UserInfo from "@/app/model/UserInfo";

export async function POST(req: NextRequest, res : NextResponse) {
  try {
    const data = await req.formData();
    let User: UserInfo = JSON.parse(data.get("user") as string);
    if (User.Email !== data.get("temp_email")) {
      const allEmail = await checkEmail(User.Email);
      if (allEmail.count < 1) {
        await updateUser(User);
        return NextResponse.json("update complete", { status: 200 });
      } else {
        return NextResponse.json("update failure", { status: 201 });
      }
    } else {
      await updateUser(User);
      return NextResponse.json("update complete", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 400 });
  }
}
