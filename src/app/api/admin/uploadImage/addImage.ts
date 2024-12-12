import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { NextApiRequest } from "next";

export const uploadImage = async (file : any) => {
    // const formData = await req.formData();
    // console.log(formData)
  // const file = formData.get("myfile");
  if (!file) {
    // return NextResponse.json({ error: "No files received." }, { status: 400 });
    return false
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/products/" + filename),
      buffer
    );
    const k = path.join(process.cwd(), "public/products/" + filename)
    console.log(k)
    // return NextResponse.json({ Message: "Success", status: 201 });
    return {path : `/products/${filename}`}
  } catch (error) {
    console.log("Error occured ", error);
    // return NextResponse.json({ Message: "Failed", status: 500 });
    return false


  }
};