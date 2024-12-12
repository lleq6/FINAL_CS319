import { NextApiRequest, NextApiResponse } from "next";
import { fetchUsers } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserInfo } from "../../../model/UserInfo";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    let listUsers : UserInfo[] = []
    const Users = await fetchUsers();
    //console.log(Users);
    Users.forEach(element => {
        const user : UserInfo = {
            UID:element["User_ID"],
            Username:element["Username"],
            Password:element["Password"],
            Full_Name:element["Full_Name"],
            Email:element["Email"],
            Phone:element["Phone"],
            Access_Level:element["Access_Level"],
            Token:element["Token"]
        }
        var split = user.Full_Name.split(" ");
        user.Name = split[0];
        user.LastName = split[1];
        listUsers.push(user);
    });
    return NextResponse.json(listUsers);
  } catch (error) {
    return NextResponse.error();
  }
}
