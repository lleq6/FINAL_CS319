import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db";
import { uploadImage } from "../uploadImage/addImage";
import { NextRequest, NextResponse } from "next/server";
import { ProductInfo } from "@/app/model/Product";

export async function POST(req: NextRequest, res: NextApiResponse) {
  // const formData : FormData = req.formData()
  const formData = await req.formData();
  let Product: ProductInfo = JSON.parse(formData.get("Product"));
  const imgFile = formData.get("myfile");

  if (imgFile) {
    console.log(imgFile);
    try {
      const response = await uploadImage(imgFile);
      if (!response) throw new Error("upload error");
      Product = {
        ...Product,
        Image_URL: response.path
      }
      console.log("upload complete");
    } catch (error) {
      console.log("upload error message : ", error);
      return NextResponse.json({message:'upload image error'},{status:401})
    }
  }
  // const c = await formData.file()
  const keys = new Array();
  const values = [];
  Object.keys(Product).forEach((key) => {
    if (['Product_ID','c_id', 'c_name','s_id','s_name','cc_name',''].includes(key)) return
    keys.push(`"${key}"`);
    values.push(Product[key]);
  });
  const queryString = `
  INSERT INTO public."Product" (${keys.join(",")}) VALUES (${keys.map(
    (e, index) => `$${index+1}`
  ).join(',')
})
`;

console.log(keys, Product)
try {
    await query(queryString,values)
} catch (error) {
    console.log('query error : ',error)
    
}

console.log(queryString,values)



  return NextResponse.json({ message: "true" });
}
