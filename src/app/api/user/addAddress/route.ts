import { NextRequest, NextResponse } from "next/server"
import { addAddress } from "../../lib/db"
import UserAddress from "@/app/model/AddressModel"


export async function POST(req : NextRequest, res) {
//   const id = req.nextUrl.searchParams.get('id')
    const request : UserAddress = await req.json()
    delete request.Address_ID

    const k = await addAddress(request)
    console.log(k)
    return NextResponse.json(k.rows[0])
}