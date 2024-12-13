import { NextRequest, NextResponse } from "next/server"
import { updateUser } from "../../lib/db"
import UserInfo from "@/app/model/UserInfo"


export async function POST(req : NextRequest, res) {
    try {
        const request : UserInfo = await req.json()
        await updateUser(request)
        return NextResponse.json('update complete', {status : 200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json('error', {status:400})   
    }
}