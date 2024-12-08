import { NextRequest, NextResponse } from "next/server"
import { getUserAddress } from "../../lib/db"


export async function POST(req : NextRequest, res) {
//   const id = req.nextUrl.searchParams.get('id')
    const {UserID} = await req.json()

    const k = await getUserAddress(UserID)
    console.log(k.rows)

    
    return NextResponse.json(k.rows)
}