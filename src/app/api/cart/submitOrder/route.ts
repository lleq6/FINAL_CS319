import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../auth/[...nextauth]/route";
import { query, clearCart } from "@/app/api/lib/db";
interface cart_detail {
  cd_Quantity: number;
  Product_ID: string;
  Child_ID: string;
  Name: string;
  Brand: string;
  Description: string;
  Unit: string;
  Quantity: number;
  Sale_Cost: number;
  Sale_Price: number;
  Reorder_Point: number;
  Visibility: string;
  Review_Rating: number;
  Image_URL: string;
}
interface RequestBody {
  User_ID: string;
  items: cart_detail[];
}

const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${randomNum}`;
};
fetch('url',{method: 'POST', body : JSON.stringify({
  test:'asdsad',
  test1:'tesda1'
})})
export async function POST(req: NextRequest, res: NextApiResponse) {
  const { User_ID, items, Address_ID, COD }: RequestBody = await req.json();
  if (!items) {
    return NextResponse.json({ error: "error" }, { status: 400 });
  }
  console.log(User_ID, items);
  // console.log(User_ID, Address_ID)
  const Order_ID = generateOrderId();
  const values = [];
  const itemsFilter = items.map((item: cart_detail) => {
    return {
      Order_ID: Order_ID,
      Product_ID: item.Product_ID,
      Quantity: item.cd_Quantity,
      Price: item.Sale_Price,
      Discount: 0,
    };
  });

  // console.log(itemsFilter)
  const placeholders = itemsFilter
    .map((row, i) => {
      const placeHoldersForRow = Object.keys(row)
        .map((_, j) => `$${i * Object.keys(row).length + j + 1}`)
        .join(", ");
      values.push(...Object.values(row));
      return `(${placeHoldersForRow})`;
    })
    .join(", ");

  const columns = Object.keys(itemsFilter[0]).map((e) => `"${e}"`);
  const queryString = `INSERT INTO public."Order_Detail" (${columns}) VALUES ${placeholders}`;
  const query2 = `INSERT INTO public."Order" ("Order_ID", "User_ID", "Address_ID", "Order_Date", "State","Payment_Type", "Invoice_ID") VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  const now = new Date();

  try {
    itemsFilter.forEach(async (element) => {
      await query(
        ` UPDATE public."Product" SET "Quantity" = "Quantity" - $1 WHERE "Product_ID" = $2; `,
        [element.Quantity, element.Product_ID]
      );
    });
    // const DetailInsertResponse = await query(queryString,values)
    // const orderInsertResponse = await query(query2, [values[0], User_ID, Address_ID, now.getDate()+'-'+now.getMonth()+'-'+now.getFullYear(), 0, COD, 0])
    const clearCartResponse = await clearCart(User_ID);
    return NextResponse.json("Order Added", { status: 200 });
  } catch (error) {}
  return NextResponse.json({ error: "error" }, { status: 401 });

  // if ()
  // console.log(queryString,values)
}
