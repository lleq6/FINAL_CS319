import { ProductInfo } from "@/app/model/Product";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const product: ProductInfo = await req.json();
  const filter = ["Product_ID", "C_Name", "C_ID", "S_Name", "S_ID", "CC_Name"];
  const keys: string[] = [];
  const values: string[] = [];
  values.push(product.Product_ID);
  Object.keys(product).map((e, index) => {
    if (filter.includes(e)) {
      return;
    }
    keys.push(`"${e}"=$${index + 1}`);
    values.push(String(product[e]));
  });
  const queryString = `
    UPDATE public."Product"
    SET ${keys.join(",")}
    WHERE
    "Product_ID"=$1
    `;
  try {
    await query(queryString, values);
    return NextResponse.json({ message: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "edit error" }, { status: 400 });
  }
}
