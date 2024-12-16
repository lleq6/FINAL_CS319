import { NextRequest, NextResponse } from "next/server"
import { getUserAddress } from "../../lib/db"


export async function POST(req : NextRequest, res : NextResponse) {
//   const id = req.nextUrl.searchParams.get('id')
    const {UserID} = await req.json()

    const data = await getUserAddress(UserID)
    return NextResponse.json(data)
}