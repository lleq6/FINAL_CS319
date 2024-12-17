"use client";
import { useSession } from "next-auth/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";
import { CounterProvider } from "../context/CartCount";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (
    (!session && session.status !== "loading") ||
    (session?.data?.user.role != 1 && session.status !== "loading")
  ) {
    return redirect("/");
  } else if (session.status !== "loading") {
    return (
      <div>
        <CounterProvider>
          <Navbar></Navbar>
          <div className="mx-14 h-fit">{children}</div>
          <Footer />
        </CounterProvider>
      </div>
    );
    //}
    // if (session?.data?.user.role)
  }
}
