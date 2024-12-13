import { NextRequest, NextResponse } from "next/server"
import { deleteUser } from "../../lib/db"


export async function POST(req : NextRequest, res) {
    const { User_ID } = await req.json()
    try {
        const response = await deleteUser(User_ID)
        return NextResponse.json('delete complete', {status : 200})
        
    } catch (error) {
        return NextResponse.json('error', {status:400})   
    }
}