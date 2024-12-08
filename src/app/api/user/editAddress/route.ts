import { NextRequest, NextResponse } from "next/server"
import { editUserAddress } from "../../lib/db"
import { UserAddress } from "@/app/model/AddressModel"


export async function POST(req : NextRequest, res) {
//   const id = req.nextUrl.searchParams.get('id')
    const request : UserAddress = await req.json()
    delete request.User_ID
    console.log(request)

    const k = await editUserAddress(request)
    return NextResponse.json('product')
}