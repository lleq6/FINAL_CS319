"use client";
import { useEffect, useState } from "react";

export default function AdmindashBoard() {
  useEffect(() => {
    const a = async () => {
      const fetchData = await fetch("/api/admin/dashboard");
      console.log(await fetchData.json());
    };
    a();
  }, []);

  return (
    <div>
      admin dashboard
      <div>
        <h1>สินค้าต่ำกว่ากำหนด</h1>
        <div>
          <table>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
          </table>
          <DashBoardProduct></DashBoardProduct>
        </div>
      </div>
    </div>
  );
}

function DashBoardProduct() {
  return <div></div>;
}
