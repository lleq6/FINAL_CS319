'use client'
import { useSession } from "next-auth/react";
import AdminNavbar from "../components/admin-components/AdminNavbar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";
import { CounterProvider } from "../context/CartCount";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession()


  // if (!session && session.status !== 'loading' || session?.data?.user.role !='a' && session.status !== 'loading'){
    // return redirect('/admin')
  // }else if(session.status !== 'loading'){
    return (
      <div>
        <CounterProvider>
        <h1>admin</h1>
        <Navbar>
        </Navbar>
        <div className="mx-14">
          {session.data?.user.role}
        {children}
        </div>
        <Footer/>
        </CounterProvider>
      </div>
    );
  }
  // if (session?.data?.user.role)

  
  // }
