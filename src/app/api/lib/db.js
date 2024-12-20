const fs = require("fs");
const pg = require("pg");
const url = require("url");
const { Pool } = require("pg");
const { hashMD5 } = require("./utils");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const client = new Pool(config);

module.exports = {
  query: async (text) => await client.query(text),
  query: async (text, params) => await client.query(text, params),
  fetchUsers: async () => {
    const data = await client.query(
      `SELECT "User_ID", "Email", "First_Name","Last_Name", "Phone", "Access_Level" FROM public."User" ORDER BY "User_ID" ASC`
    );
    return data.rows;
  },
  fetchOneUser: async (email) => await client.query(`SELECT * FROM public."User" WHERE "Email" = $1`, [email]),
  fetchAllProduct: async () => {
    const data = await client.query(`
      SELECT 
        p."Product_ID",
        COALESCE(p."Child_ID", 0) as "Child_ID",
        p."Name",
        p."Brand",
        p."Description",
        p."Unit",
        p."Quantity",
        p."Sale_Cost",
        p."Sale_Price",
        p."Reorder_Point",
        p."Visibility",
        p."Review_Rating",
        p."Image_URL",
        c."Name" as "C_Name",
        COALESCE(c."Category_ID", 0) as "C_ID",
        s."Name" as "S_Name",
        COALESCE(s."Sub_Category_ID", 0) as "S_ID",
        cc."Name" as "CC_Name"
      FROM 
        public."Product" p
      LEFT JOIN 
        public."Child_Sub_Category" cc ON p."Child_ID" = cc."Child_ID" 
      LEFT JOIN 
        public."Sub_Category" s ON cc."Sub_Category_ID" = s."Sub_Category_ID"
      LEFT JOIN 
        public."Category" c ON s."Category_ID" = c."Category_ID"
      ORDER BY 
        p."Product_ID" ASC;
    `);
    return data.rows;
  },
  fetchAllCategory: async () => {
    const categoryL = await client.query(`SELECT * FROM public."Category"`);
    const subList = await client.query(`SELECT * FROM public."Sub_Category"`);
    const childList = await client.query(`SELECT * FROM public."Child_Sub_Category"`);
    const result = categoryL.rows.map((e) => {
      return {
        ...e,
        Sub_Category: subList.rows
          .filter((sub) => sub.Category_ID == e.Category_ID)
          .map((sub) => {
            const t = {
              ...sub,
              ChildCategory: childList.rows.filter(
                (child) => child.Sub_Category_ID == sub.Sub_Category_ID
              ),
            };
            return t;
          }),
      };
    });
    return result;
  },
  addAddress: async (Address) =>
    await client.query(
      `
        INSERT INTO public."Address" 
        ("User_ID", "Address_1", "Address_2", "District", "Sub_District", "Province", "Zip_Code", "Phone", "Is_Default") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "Address_ID";`,
      [
        Address.User_ID,
        Address.Address_1,
        Address.Address_2,
        Address.District,
        Address.Sub_District,
        Address.Province,
        Address.Zip_Code,
        Address.Phone,
        Address.Is_Default,
      ]
    ),
  deleteAddress: async (Address_ID) =>
    await client.query(`DELETE FROM public."Address" WHERE "Address_ID"=$1`, [
      Address_ID,
    ]),
  getUserAddress: async (User_ID) => {
    const data = await client.query(
      `SELECT * FROM public."Address" WHERE "User_ID"=$1 ORDER BY "Address_ID" ASC`,
      [User_ID]
    );
    return data.rows;
  },
  editUserAddress: async (address) => {
    const updates = [];
    const values = [];
    let index = 1;
    for (const key in address) {
      if (key !== "Address_ID" && address[key] !== undefined) {
        updates.push(`"${key}" = $${index}`);
        values.push(address[key]);
        index++;
      }
    }
    values.push(address.Address_ID);
    await client.query(
      `UPDATE public."Address"
            SET ${updates.join(", ")}
            WHERE "Address_ID" = $${index};`,
      values
    );
  },
  deleteUser: async (User_ID) => {
    await client.query(`DELETE FROM public."User" WHERE "User_ID" = $1;`, [
      User_ID,
    ]);
  },
  updateUser: async (user) => {
    const columns = [];
    const values = [];
    let index = 1;
    for (const key in user) {
      if (key !== "User_ID" && user[key] !== undefined) {
        columns.push(`"${key}" = $${index}`);
        values.push(user[key]);
        index++;
      }
    }
    values.push(user.User_ID);
    await client.query(
      `UPDATE public."User"
            SET ${columns.join(", ")}
            WHERE "User_ID" = $${index};`,
      values
    );
  },
  addUser: async (User) => {
    await client.query(
      `
          INSERT INTO public."User" 
          ("Email", "Password", "First_Name", "Last_Name", "Phone", "Access_Level") 
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING "User_ID";`,
      [
        User.Email,
        hashMD5("123456", process.env.SALT_SECRET),
        User.First_Name,
        User.Last_Name,
        User.Phone,
        User.Access_Level,
      ]
    );
  },
  checkEmail: async (Email) => {
    const data = await client.query(
      `SELECT COUNT(*) FROM public."User" WHERE "Email"=$1`,
      [Email]
    );
    return data.rows[0];
  },
  deleteAddressByUserID: async (UserID) =>
    await client.query(`DELETE FROM public."Address" WHERE "User_ID"=$1`, [
      UserID,
    ]),
  resetPassword: async (UserID) => {
    await client.query(
      `UPDATE public."User" SET "Password" = $1 WHERE "User_ID" = $2;`,
      [hashMD5("123456", process.env.SALT_SECRET), UserID]
    );
  },
};
