import { NextRequest, NextResponse } from "next/server";
import { addUser, checkUsername, query } from "../../lib/db";
import UserInfo from "@/app/model/UserInfo";
import { NextApiResponse } from "next";

export async function GET(req: NextRequest, res : NextApiResponse) {
  
    const queryString = `
    SELECT * FROM public."Product" WHERE "Quantity" < "Reorder_Point"
    `
    try {
        const result = await query(queryString)
        return NextResponse.json(result.rows, {status : 200})
    } catch (error) {
        return NextResponse.json({error : 'error'}, {status : 400})
    }
}