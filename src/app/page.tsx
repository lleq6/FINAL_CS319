'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

{/* <div className="flex"> */}
export default function Homepage(){
    const a = useSession()
  console.log(a.data?.user)
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
    return(
        <div>

        </div>
    )
}