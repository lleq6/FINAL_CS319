import { NextApiRequest, NextApiResponse } from "next";
import { fetchItemsInCart } from "../../lib/db";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

<<<<<<< HEAD
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
=======
export async function GET(req : NextRequest, res : NextApiResponse){
    try {
        const user_id = req.nextUrl.searchParams.get('id')
        const data = await fetchItemsInCart(user_id)
        
        return NextResponse.json(data.rows)
    } catch (error) {
        return NextResponse.error()
    }
    // console.log(data.rows)

}
>>>>>>> 8c1ebf8b73ad8290fee41aac5e0141c4c28ffe1f
