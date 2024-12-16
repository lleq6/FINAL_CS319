import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db";
import { uploadImage } from "../uploadImage/addImage";
import { NextRequest, NextResponse } from "next/server";
import { ProductInfo } from "@/app/model/Product";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const formData = await req.formData();
  let Product: ProductInfo = JSON.parse(formData.get("Product") as string);
  const imgFile = formData.get("myfile");

  if (imgFile) {
    console.log(imgFile);
    try {
      const response = await uploadImage(imgFile);
      if (!response) throw new Error("upload error");
      Product = {
        ...Product,
        Image_URL: response.path,
      };
      console.log("upload complete");
    } catch (error) {
      console.log("upload error message : ", error);
      return NextResponse.json(
        { message: "upload image error" },
        { status: 401 }
      );
    }
  }
  const keys = new Array();
  const values: string[] = [];
  Object.keys(Product).forEach((key) => {
    if (
      [
        "Product_ID",
        "c_id",
        "c_name",
        "s_id",
        "s_name",
        "cc_name",
        "",
      ].includes(key)
    )
      return;
    keys.push(`"${key}"`);
    values.push(Product[key]);
  });
  const queryString = `
  INSERT INTO public."Product" (${keys.join(",")}) VALUES (${keys
    .map((e, index) => `$${index + 1}`)
    .join(",")}) RETURNING "Product_ID"
`;

  console.log(keys, Product);
  try {
    const response = await query(queryString, values);
    console.log(response, "add response");
    return NextResponse.json(
      { message: "true", Product_ID: response.rows[0].Product_ID },
      { status: 200 }
    );
  } catch (error) {
    console.log("query error : ", error);
    return NextResponse.json({ message: "add error" }, { status: 400 });
  }
}
