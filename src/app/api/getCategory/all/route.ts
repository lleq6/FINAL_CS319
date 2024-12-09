<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { fetchAllCategory } from "../../lib/db";
import { getProviders } from "next-auth/react";

export async function GET(req: NextRequest, res) {
  const category = await fetchAllCategory();
  if (!category) {
    return NextResponse.json("PRODUCT NOT FOUND", { status: 404 });
  }
  return NextResponse.json(category);
=======
import { NextRequest, NextResponse } from "next/server"
import { fetchAllCategory } from "../../lib/db"
import { getProviders } from "next-auth/react"


export async function GET(req : NextRequest, res) {
  const category = await fetchAllCategory()
  if (!category){
    return NextResponse.json('PRODUCT NOT FOUND',{status:404})
  }
  return NextResponse.json(category)

>>>>>>> 8c1ebf8b73ad8290fee41aac5e0141c4c28ffe1f
}
