const fs = require("fs");
const pg = require("pg");
const url = require("url");
import { UserAddress } from "@/app/model/AddressModel";
const { Pool } = require("pg");
require("dotenv").config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  // database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_CACERT,
  },
};

const client = new Pool(config);

module.exports = {
  feathUsers: async () => {
    client.query(`SELECT * FROM User ORDER BY User_ID ASC`);
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
    const data = await client.query(
      `SELECT * FROM public."Product" ORDER BY "Product_ID" ASC`
    );
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

    const categoriesWithSubCategories = await Promise.all(
      categoryL.rows.map(async (Category) => {
        const subList = await client.query(
          `SELECT * FROM public."Sub_Category" WHERE "Category_ID" = $1`,
          [Category.Category_ID]
        );

        const subCategoriesWithChildren = await Promise.all(
          subList.rows.map(async (sub) => {
            const childList = await client.query(
              `SELECT * FROM public."Child_Sub_Category" WHERE "Sub_Category_ID" = $1`,
              [sub.Sub_Category_ID]
            );
            return {
              ...sub,
              ChildCategory: childList.rows,
            };
          })
        );

        return {
          ...Category,
          Sub_Category: subCategoriesWithChildren,
        };
      })
    );
    return categoriesWithSubCategories;
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

  insertToCart: async (id, product_id, Quantity) =>
    await client.query(
      `INSERT INTO public."Cart_Detail" ("User_ID", "Product_ID", "Quantity") VALUES
    ($1, $2, $3)`,
      [id, product_id, Quantity]
    ),

  fetchItemsInCart: async (user_id) =>
    await client.query(
      `
        SELECT 
            cd."Quantity" as "cd_Quantity",
            p.*
        FROM
            public."Cart_Detail" cd
        JOIN
            public."Product" p ON p."Product_ID" IN (SELECT cd."Product_ID" WHERE cd."User_ID" = $1)
        WHERE
            cd."User_ID" = $1
        `,
      [user_id]
    ),
  removeItemFromCart: async (user_id, product_id) =>
    await client.query(
      `DELETE FROM public."Cart_Detail" WHERE "User_ID"=$1 AND "Product_ID"=$2`,
      [user_id, product_id]
    ),

  clearCart: async (User_ID) =>
    client.query(`DELETE FROM public."Cart_Detail" WHERE "User_ID"=$1`, [
      User_ID,
    ]),
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

  getUserAddress: async (User_ID) =>
    await client.query(`SELECT * FROM public."Address" WHERE "User_ID"=$1`, [
      User_ID,
    ]),
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
};

const a = async () => {
  const childCategory = await client.query(
    `SELECT * FROM public."Child_Sub_Category" WHERE "Child_ID" = $1`,
    [1]
  );
  const subCategory = await client.query(
    `SELECT * FROM public."Sub_Category" WHERE "Sub_Category_ID" = $1`,
    [childCategory.rows[0].Sub_Category_ID]
  );
  const category = await client.query(
    `SELECT * FROM public."Category" WHERE "Category_ID" = $1`,
    [childCategory.rows[0].Category_ID]
  );

  console.log(childCategory.rows[0]);
  const result = {
    Category: category.rows[0].Name,
    SubCategory: subCategory.rows[0].Name,
    ChildCategory: childCategory.rows[0].Name,
  };
  console.log({
    c_name: result,
    c_id: {
      Category_ID: childCategory.rows[0].Category_ID,
      Sub_Category_ID: childCategory.rows[0].Sub_Category_ID,
      Child_ID: childCategory.rows[0].Child_ID,
    },
  });
};

// interface categoryList {
//     Category_ID : string,
//     Category_Name: String,
//     Sub_Category: [{
//         Sub_ID: string,
//         Sub_Name: string,
//         Child_Category: [{
//             Child_ID: string,
//             Sub_Category_Name: string,
// }]},]
//     }
// a()
const b = async () => {
  const user_id = 1;
  const data = await client.query(
    `
        SELECT 
            cd."Quantity" as "cd_Quantity",
            p.*
        FROM
            public."Cart_Detail" cd
        JOIN
            public."Product" p ON p."Product_ID" IN (SELECT cd."Product_ID" WHERE cd."User_ID" = $1)
        WHERE
            cd."User_ID" = $1
        `,
    [user_id]
  );

  console.log(data.rows);
};

// b()
// fetchLogin({email: 'admin@gmail.com'})

import { Pool } from "pg";

// Configure your database connection
const pool = new Pool({
  user: "yourUsername",
  host: "localhost",
  database: "yourDatabase",
  password: "yourPassword",
  port: 5432,
});
