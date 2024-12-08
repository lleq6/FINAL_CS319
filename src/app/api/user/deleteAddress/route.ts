import { NextRequest, NextResponse } from "next/server"
import { deleteAddress } from "../../lib/db"
import { UserAddress } from "@/app/model/AddressModel"


export async function POST(req : NextRequest, res) {
//   const id = req.nextUrl.searchParams.get('id')
    const { Address_ID } = await req.json()
    console.log(Address_ID)

    const k = await deleteAddress(Address_ID)
    return NextResponse.json('product')
}