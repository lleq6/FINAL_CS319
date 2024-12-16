"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LoginModalForce from "./components/login/LoginModalForce";
import { redirect } from "next/navigation";

{
  /* <div className="flex"> */
}
export default function Homepage() {
  const session = useSession();
  console.log(session.data?.user);

  
  useEffect(()=>{
    if(document.getElementById('loginModalForce')){
      document.getElementById('loginModalForce').showModal()
    }
    if (session.data?.user){
      if (session.data?.user.role == 1) redirect('/admin')
    }
  },)
    
    
  if (session.status === 'loading') return <div>Loading</div>
  
  return (
    <div>
      {/* <Navbar /> */}
      <LoginModalForce></LoginModalForce>
    </div>
  );
}
