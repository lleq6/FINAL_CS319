import { NextRequest, NextResponse } from "next/server"
import { fetchAllCategory } from "../../lib/db"
import { getProviders } from "next-auth/react"


export async function GET(req : NextRequest, res) {
  const category = await fetchAllCategory()
  if (!category){
    return NextResponse.json('PRODUCT NOT FOUND',{status:404})
  }
  return NextResponse.json(category)

}
