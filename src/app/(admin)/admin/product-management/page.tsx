"use client";
import React from "react";
import DialogMessage from "../../../components/DialogMessage";
import { DialogProvider } from "../../../context/DialogContext";
import ProductManagement from "@/app/components/ProductManagement";

const App = () => {
  return (
    <DialogProvider>
      <ProductManagement />
      <DialogMessage />
    </DialogProvider>
  );
};

export default App;