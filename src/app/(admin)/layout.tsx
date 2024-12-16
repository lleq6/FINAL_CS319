'use client'
import { useSession } from "next-auth/react";
import AdminNavbar from "../components/admin-components/AdminNavbar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";
import { CounterProvider } from "../context/CartCount";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession()


  if (!session && session.status !== 'loading' || session?.data?.user.role != 1 && session.status !== 'loading'){
    return redirect('/')

  }else if(session.status !== 'loading'){
    return (
      <div>
        <h1>admin</h1>
        <Navbar>
        </Navbar>
        <div className="mx-14 h-fit">
        {children}
        </div>
        <Footer/>
      </div>
    );
  //}
  // if (session?.data?.user.role)

  
  }
}
