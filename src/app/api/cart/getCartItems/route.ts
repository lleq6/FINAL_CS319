import { NextApiRequest, NextApiResponse } from "next";
import { fetchItemsInCart } from "../../lib/db";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const user_id = req.nextUrl.searchParams.get("id");
    const data = await fetchItemsInCart(user_id);

    return NextResponse.json(data.rows);
  } catch (error) {
    return NextResponse.error();
  }
  // console.log(data.rows)
}
