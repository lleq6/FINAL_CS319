"use client";
import React from "react";
import DialogMessage from "../../../components/DialogMessage";
import { DialogProvider } from "../../../context/DialogContext";
import UserManagement from "@/app/components/UserManagement";

const App = () => {
  return (
    <DialogProvider>
      <UserManagement />
      <DialogMessage />
    </DialogProvider>
  );
};

export default App;