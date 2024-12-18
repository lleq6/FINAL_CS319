import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { NextApiRequest } from "next";

export const uploadImage = async (file : any) => {
  if (!file) {
    return false
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  try {
    await writeFile(
      path.join(process.cwd(), `public/products/${filename}`),
      buffer
    );
    return {path : `/products/${filename}`}
  } catch (error) {
    console.log("Error occured ", error);
    return false
  }
};