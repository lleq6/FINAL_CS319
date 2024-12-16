"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LoginForceUI from "./components/login/LoginForceUI";
import { redirect } from "next/navigation";
import { DialogProvider } from "./context/DialogContext";
import DialogMessage from "./components/DialogMessage";

{
  /* <div className="flex"> */
}
export default function Homepage() {
  const session = useSession();
  console.log(session.data?.user);

  useEffect(() => {
    const e = document.getElementById("loginForceUI") as HTMLDialogElement;
    if (e) {
      e.showModal();
    }
    if (session.data?.user) {
      if (session.data?.user.role == "1") redirect("/admin");
    }
  });

  if (session.status === "loading") return <div>Loading</div>;

  return (
    <div>
      {/* <Navbar /> */}
      <DialogProvider>
        <LoginForceUI/>
        <DialogMessage />
      </DialogProvider>
    </div>
  );
}
