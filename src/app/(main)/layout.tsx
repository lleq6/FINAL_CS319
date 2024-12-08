'use client'
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CategoryList } from "../model/CategoryModel";
import { CounterProvider

 } from "../context/CartCount";

export default function Layout({ children }: { children: React.ReactNode }) { 
  
  // const [Categories,setCategories] = useState<CategoryList[]>([]) 
  // },[])
    return (
      <div>
        <CounterProvider>

        <h1>user</h1>
        <Navbar></Navbar>
        <div className="mx-20 my-2">
        {children}
        </div>
        <Footer/>
        </CounterProvider>
      </div>
    );
  }