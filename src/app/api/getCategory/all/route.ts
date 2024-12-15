import { NextRequest, NextResponse } from "next/server";
import { fetchAllCategory } from "../../lib/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const category = await fetchAllCategory();
  if (!category) {
    return NextResponse.json("PRODUCT NOT FOUND", { status: 404 });
  }
  return NextResponse.json(category);
}
