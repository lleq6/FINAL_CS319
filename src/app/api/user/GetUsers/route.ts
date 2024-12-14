import { NextApiRequest, NextApiResponse } from "next";
import { fetchUsers } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    return NextResponse.json(await fetchUsers());
  } catch (error) {
    console.log(error)
    return NextResponse.json('',{status:400});
  }
}
