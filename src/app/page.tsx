"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import LoginForceUI from "./components/login/LoginForceUI";
import { redirect } from "next/navigation";
import { DialogProvider } from "./context/DialogContext";
import DialogMessage from "./components/DialogMessage";
import SessionInfo from "./model/SessionInfo";

export default function Homepage() {
  const session = useSession();
  const user = session.data?.user as SessionInfo;
  useEffect(() => {
    const e = document.getElementById("loginForceUI") as HTMLDialogElement;
    if (e) {
      e.showModal();
    }

    if (user) {
      if (user.role == "1") redirect("/admin");
    }
  });

  if (session.status === "loading") return <div>Loading</div>;

  return (
    <div>
      {/* <Navbar /> */}
      <DialogProvider>
        <LoginForceUI />
        <DialogMessage />
      </DialogProvider>
    </div>
  );
}
