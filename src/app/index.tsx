"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const a = useSession();
  console.log(a.data?.user);
  return <div className=""></div>;
}
