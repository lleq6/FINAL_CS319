'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { CounterProvider } from "@/app/context/CartCount";

export default function Layout({ children }: { children: React.ReactNode }) {
    const session = useSession()
    console.log(session)
    if (session.status === 'loading'){
        return <div>loading page...</div>
    } 
    if (!session.data && session.status !== 'loading'){
        return redirect('/products')
    }
    
    return ( 
<div>
    {children}
</div>
    
    );
  }