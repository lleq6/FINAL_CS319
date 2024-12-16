"use client";
import { useEffect } from "react";

export default function Sidebar() {
  // document.getElementsByClassName
  // var coll = document.getElementsByClassName("collapsible");

  return (
    <div className="bg-slate-600">
      <ul className="contentt">
        <li
          className="collapsible"
          onClick={(e) => {
            const item = document.getElementsByClassName(
              "contentt"
            )[0] as HTMLUListElement;
            if (item.classList.contains("active")) {
              item.classList.add("hidden");
              document
                .getElementsByClassName("content")[1]
                .classList.add("block");
            } else {
              document
                .getElementsByClassName("content")[1]
                .classList.remove("hidden");
              document
                .getElementsByClassName("content")[1]
                .classList.add("block");
            }
            item.classList.toggle("active");
          }}
        >
          asd
        </li>
        <div className="content hidden">
          <ul>
            <li>t1</li>
            <li>t2</li>
            <li>t3</li>
          </ul>
        </div>
        <li>asd</li>
        <li>asd</li>
        <li>asd</li>
        <li>asd</li>
      </ul>
    </div>
  );
}
