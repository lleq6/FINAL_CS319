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
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_CACERT,
  },
};

const client = new Pool(config);

module.exports = {
  fetchUsers: async () => {
    const data = await client.query(
      `SELECT "User_ID", "Email", "First_Name","Last_Name", "Phone", "Access_Level" FROM public."User" ORDER BY "User_ID" ASC`
    );
    return data.rows;
  },
  query: (text, params) => client.query(text, params),
  test: () => client.query("SELECT * from User"),
  fetchOneUser: (email) =>
    client.query(`SELECT * FROM public."User" WHERE "Email" = $1`, [email]),
  fetchOneProduct: async (id) => {
    const data = await client.query(
      `
            SELECT 
                p.*, 
                c."Name" as C_NAME,
                c."Category_ID" as C_ID,
                s."Name" as S_NAME,
                s."Sub_Category_ID" as S_ID,
                cc."Name" as CC_Name
            FROM 
                public."Product" p
            JOIN 
                public."Child_Sub_Category" cc ON p."Child_ID" = cc."Child_ID"
            JOIN 
                public."Sub_Category" s ON cc."Sub_Category_ID" = s."Sub_Category_ID"
            JOIN 
                public."Category" c ON s."Category_ID" = c."Category_ID"
            WHERE 
                p."Product_ID"=$1;
            `,
      [id]
    );
    return data.rows[0];
  },

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
        c."Name" as "C_NAME",
        COALESCE(c."Category_ID", 0) as "C_ID",
        s."Name" as "S_NAME",
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
    
    const dat = await client.query(`SELECT * FROM public."Child_Sub_Category"`);
    return data.rows;
  },
  fetchProductCategory: async (id) => {
    const result = {
      Category: "",
      SubCategory: "",
      ChildCategory: "",
    };
    const data = await client.query(
      `SELECT * FROM public."Child_Sub_Category" WHERE "Child_ID" = $1`,
      [id]
    );
    // console.log(data.name);
    return data;
  },
  fechProductCategoryID: async () => {
    const data = await client.query(
      `SELECT * FROM public."Child_Sub_Category"`
    );
    return data;
  },
  fetchAllCategory: async () => {
    // console.log(categoryL.rows)
    const categoryL = await client.query(`SELECT * FROM public."Category"`);
    const subList = await client.query(`SELECT * FROM public."Sub_Category"`);
    const childList = await client.query(
      `SELECT * FROM public."Child_Sub_Category"`
    );

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
  fetchAllCategoryList: async () => {
    const categoryL = await client.query(`SELECT * FROM public."Category"`);
    const subList = await client.query(`SELECT * FROM public."Sub_Category"`);
    const childList = await client.query(
      `SELECT * FROM public."Child_Sub_Category"`
    );
    // const result = categoryL.rows.map(e => {
    // return{...e,Sub_Category: subList.rows.filter((sub)=> sub.Category_ID = )}}
    // )

    return [categoryL.rows];
  },
  fetchProductsByCategory: async (category_id) =>
    await client.query(
      `SELECT * FROM public."Product" WHERE "Child_ID" 
    IN (SELECT "Child_ID" FROM public."Child_Sub_Category" WHERE "Category_ID"=$1)`,
      [category_id]
    ),

  fetchProductsBySubCategory: async (category_id) =>
    await client.query(
      `SELECT * FROM public."Product" WHERE "Child_ID" 
    IN (SELECT "Child_ID" FROM public."Child_Sub_Category" WHERE "Sub_Category_ID"=$1)`,
      [category_id]
    ),

  fetchProductsByChildCategory: async (category_id) =>
    await client.query(
      `SELECT * FROM public."Product" WHERE "Child_ID" 
    IN (SELECT "Child_ID" FROM public."Child_Sub_Category" WHERE "Child_ID"=$1)`,
      [category_id]
    ),

  k: `SELECT 
    sc."Category_ID", 
    sc."Sub_Category_ID", 
    sc."Name" as "S_Name",
    cat."Name" as "C_Name"
FROM 
    public."Sub_Category" sc
JOIN 
    public."Category" cat ON sc."Category_ID" = cat."Category_ID"
WHERE sc."Sub_Category_ID" = 2
`,
  fetchCategoryName: "",

  fetchSubCategoryDetail: async (Sub_ID) =>
    await client.query(
      `
        SELECT 
            s.*,
			s."Name" as s_name,
            p."Name" as c_name
		FROM
			public."Sub_Category" s
        JOIN
            public."Category" p ON p."Category_ID" = s."Category_ID"
        WHERE
            s."Sub_Category_ID"=$1
        `,
      [Sub_ID]
    ),

  fetchChildCategoryDetail: async (Child_ID) =>
    await client.query(
      `
        SELECT 
            cc.*,
            cc."Name" as cc_name,
			s."Name" as s_name,
            c."Name" as c_name
		FROM
			public."Child_Sub_Category" cc
        JOIN
            public."Sub_Category" s ON s."Sub_Category_ID" = cc."Sub_Category_ID"
        JOIN
            public."Category" c ON c."Category_ID" = cc."Category_ID"
        WHERE
            cc."Child_ID"=$1
        `,
      [Child_ID]
    ),
  addAddress: async (Address) =>
    await client.query(
      `
        INSERT INTO public."Address" 
        ("User_ID", "Address_1", "Address_2", "District", "Province", "Zip_Code", "Is_Default", "Sub_District", "Phone") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "Address_ID";`,
      [
        Address.User_ID,
        Address.Address_1,
        Address.Address_2,
        Address.District,
        Address.Province,
        Address.Zip_Code,
        Address.Is_Default,
        Address.Sub_District,
        Address.Phone,
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
