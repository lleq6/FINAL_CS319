'use client'

import Navbar from "@/app/components/Navbar";
// import Sidebar from "../components/Sidebar";
import { FaStar } from "react-icons/fa";
// import Product from "../components/Product";
import Head from "next/head";
import Product from "@/app/components/Product";
import Sidebar from "@/app/components/Sidebar";
import { useEffect, useState } from "react";
import { ProductInfo } from "@/app/model/Product";

export default function Products(){
    const [data, setData]= useState([])

  useEffect(()=>{
    async function fetchData(){
      try{
        const response = await fetch(`/api/products/allProduct`);
        if(!response.ok)
          throw new Error('ERROR')
        // console.log(await response.json())
        setData(await response.json())
      }catch (error){

      }
    }
    fetchData()
  },[])
  console.log(data)
    return(
        <div>
            <a href="#">test</a> &gt; <a>test</a> &gt; <a>test</a>
            <Sidebar/>
            <div className="grid grid-cols-4 lg:grid-cols-4 max-sm:grid-cols-2 :">
            {data.map((product : ProductInfo) => {
                return <>
                    <Product key={product.Product_ID} product={product}>
                    index
                </Product>
                    <Product key={product.Product_ID+'2'} product={product}>
                    index
                </Product>
                    <Product key={product.Product_ID+'3'} product={product}>
                    index
                </Product>
                </>
            })}
        
            
            </div>
        </div>
    )
}