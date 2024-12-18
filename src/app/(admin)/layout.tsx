"use client";
import { useSession } from "next-auth/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";
import SessionInfo from "../model/SessionInfo";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const user = session.data?.user as SessionInfo;
  if (
    session.status !== "loading" &&
    (!session || (session?.data?.user as SessionInfo).role != "1")
  ) {
    return redirect("/");
  } else if (session.status !== "loading") {
    return (
      <div>
        <Navbar></Navbar>
        <div className="mx-14 h-fit">{children}</div>
        <Footer />
      </div>
    );
  }
}
