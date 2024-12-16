"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
interface ProductInfo {
  Product_ID: string;
  Child_ID: number;
  Name: string;
  Brand: string;
  Description: string;
  Unit: string;
  Quantity: number;
  Sale_Cost: number;
  Sale_Price: number;
  Reorder_Point: number;
  Visibility: boolean;
  Review_Rating: number;
  Image_URL: string;
}

export default function Home() {
  const a = useSession();
  console.log(a.data?.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/products/allProduct`);
        if (!response.ok) throw new Error("ERROR");
        // console.log(await response.json())
        setData(await response.json());
      } catch (error) {}
    }
    fetchData();
  }, []);
  console.log(data);
  return <div className=""></div>;
}
