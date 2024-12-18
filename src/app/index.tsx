"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const a = useSession();
  return <div className=""></div>;
}
