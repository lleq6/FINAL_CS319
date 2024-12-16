import { NextRequest, NextResponse } from "next/server";
import { query } from "../../lib/db";

interface PutBody {
  keyword: string;
  Category_ID?: string;
  Sub_Category_ID?: string;
  Name: string;
  // [key : string] : string
  [key: string]: string | undefined;
}

interface DeleteBody {
  keyword: "Category" | "Sub_Category" | "Child_Sub_Category";
  Category_ID?: string;
  Sub_Category_ID?: string;
  Child_ID?: string;
}
export async function PUT(req: NextRequest, res: NextResponse) {
  const data: PutBody = await req.json();
  const keys: string[] = [];
  const values: string[] = [];

  Object.keys(data).map((key, _index) => {
    if (key != "keyword") {
      values.push(data[key]);
      keys.push(key);
    }
  });

  const stringQuery = `
    INSERT INTO public."${data.keyword}" (${keys
    .map((e) => `"${e}"`)
    .join(",")})  VALUES (${values
    .map((e, _index) => `$${_index + 1}`)
    .join(",")})`;
  try {
    console.log(data, stringQuery, values);
    await query(stringQuery, values);
    return NextResponse.json({ message: "add complete" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const data: DeleteBody = await req.json();
  const stringQuery = `DELETE FROM public."${data.keyword}" WHERE "${
    Object.keys(data)[1]
  }"=$1`;
  try {
      console.log(stringQuery,[data[Object.keys(data)[1]]])

      if(data.keyword == 'Category'){
        await query(`DELETE FROM "Sub_Category" WHERE "Category_ID"=${data.Category_ID}`)
        await query(`DELETE FROM "Child_Sub_Category" WHERE "Category_ID"=${data.Category_ID}`)
      }
      if(data.keyword == 'Sub_Category'){
        await query(`DELETE FROM "Child_Sub_Category" WHERE "Sub_Category_ID"=${data.Sub_Category_ID}`)
      }
    const queryRes = await query(stringQuery,[data[Object.keys(data)[1]]])
    return NextResponse.json({ message: "delete complete" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error" }, { status: 400 });
  }
}
