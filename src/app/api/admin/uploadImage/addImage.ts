import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import { NextApiRequest } from "next";

export const uploadImage = async (file: any) => {
  if (!file) {
    return false;
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  const root = `public`;
  const dir = `products`;
  const location = `${dir}/${filename}`;
  try {
    if (!fs.existsSync(`${root}/${dir}`)) {
      fs.mkdirSync(`${root}/${dir}`, { recursive: true });
    }
    await writeFile(path.join(process.cwd(), `${root}/${location}`), buffer);
    return { path: `/${location}` };
  } catch (error) {
    console.log("Error occured ", error);
    return false;
  }
};
