"use client";
import Image from "next/image";
import { FaLine, FaFacebookSquare, FaSearch } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import LoginUI from "./login/LoginUI";
import RegisterUI from "./login/RegisterUI";
import { signOut, useSession } from "next-auth/react";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchData } from "next-auth/client/_utils";
import Link from "next/link";
import { useCounter } from "../context/CartCount";
import { DialogProvider } from "../context/DialogContext";

interface Child {
  Child_ID: string;
  Name: string;
}

interface SubCategory {
  Sub_Category_ID: string;
  Name: string;
  ChildCategory: Child[];
}

interface CategoryList {
  Category_ID: string;
  Name: string;
  Sub_Category: SubCategory[];
}

const Navbar = () => {
  const session = useSession();
  const [Categories, setCategories] = useState<CategoryList[]>([]);
  const [Loading, setLoading] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(0);
  const { count, increment, decrement, setCounter } = useCounter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getCategory/all");
        const result = await response.json();
        if(result.length == 0){
          console.log(result,'test')
          throw new Error('data not found')
        }
        setCategories(result);
      } catch (error) {
        console.log(error);
      }
    };
    async function fetchCart() {
      const res = await fetch(
        `/api/cart/getCartItems?id=${session.data?.user.id}`
      );
      try{
        const d = await res.json();
        console.log(d.length, "dd");
        setCounter(d.length);
      }catch(error){
        setCounter(0);
      }
    }
    fetchData();
    if (session.status === "authenticated") {
      fetchCart();
    }
  }, [session.status]);

  // console.log(Categories)

  function dropHandler() {
    const dropdown = document.querySelector(
      "#category_menu"
    ) as HTMLDetailsElement;
    if (dropdown) {
      dropdown.open = false;
    }
  }
  function dropHandlerAdmin() {
    const dropdown = document.querySelector(
      "#admin_menu"
    ) as HTMLDetailsElement;
    if (dropdown) {
      dropdown.open = false;
    }
  }

  function CategoryMenu() {
    return (
      <div key={1} className="">
        {Categories.map((Category: CategoryList) => (
          <li key={Category.Category_ID}>
            <details>
              <summary>
                <Link
                  href={`/category/${Category.Category_ID}/`}
                  onClick={dropHandler}
                >
                  {Category.Name}
                </Link>
              </summary>
              <ul>
                {Category.Sub_Category.map((Sub) => (
                  <li key={`${Category.Category_ID}${Sub.Sub_Category_ID}`}>
                    <details>
                      <summary>
                        <Link
                          href={`/category/${Category.Category_ID}/${Sub.Sub_Category_ID}`}
                          onClick={dropHandler}
                        >
                          {Sub.Name}
                        </Link>
                      </summary>
                      <ul>
                        {Sub.ChildCategory.map((Child) => (
                          <li
                            key={`${Category.Category_ID}${Sub.Sub_Category_ID}${Child.Child_ID}`}
                          >
                            <Link
                              href={`/category/${Category.Category_ID}/${Sub.Sub_Category_ID}/${Child.Child_ID}`}
                              onClick={dropHandler}
                            >
                              {Child.Name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </div>
    );
  }
  // if (!Categories.length) return <div>loadingD</div>;
  if (session.status === "loading") {
    return <div>Loading</div>;
  }
  return (
    <DialogProvider>
      <nav className="bg-gray-200">
        <LoginUI />
        <RegisterUI />
        <div className="div w-11/12 mx-auto">
          <div className="flex">
            <p className="content-center mx-auto">
              เรื่องบ้านต้อง คชาโฮม ถูก ครบ จบที่เดียว
            </p>
            <div className="flex mx-auto">
              <span className="flex pl-5 pr-5 text-center">
                <FaLine className="text-4xl text-green-600" />{" "}
                <p className="content-center">kacha982</p>
              </span>
              <span className="flex pl-5 pr-5 text-center">
                <FaFacebookSquare className="text-4xl text-blue-700" />{" "}
                <p className="content-center">บริษัท คชาโฮม จำกัด</p>
              </span>
            </div>
            <span className="mx-auto content-center">
              <Link href={"/contact"}>ติดต่อเรา</Link>
            </span>
          </div>
          <div className="flex content-center">
            <Link href={"/"} className="content-center m-auto">
              <Image
                src={"/kacha-icon.png"}
                alt="test"
                width={80}
                height={80}
                className="m-auto"
              ></Image>
            </Link>
            <div className="flex bg-gray-300 rounded-full px-5 mx-[4%] content-center text-center my-5 w-8/12">
              <FaSearch className="text-2xl my-auto mr-2" />
              <input
                placeholder="ค้นหาสินค้า"
                className="h-8 my-auto bg-gray-300"
              ></input>
            </div>

            <div className="content-center m-auto w-[20%]">
              {!session.data ? (
                <div className="flex content-center">
                  <a
                    className="link link-hover content-center px-2"
                    onClick={() => {
                      (
                        document?.getElementById(
                          "my_modal_1"
                        ) as HTMLDialogElement
                      ).showModal();
                    }}
                  >
                    ล็อคอิน / สมัครสมาชิก
                  </a>
                  <GoTriangleDown className="my-auto"></GoTriangleDown>
                </div>
              ) : (
                <div className="flex content-center my-auto mx-auto">
                  <Link href={"/cart"}>
                    <button className="text-start border rounded-box bg-yellow-400 py-2 px-2 flex m-auto" disabled>
                      <FaShoppingCart className="content-center my-auto" />
                      <span className="mx-1"></span>
                    </button>
                  </Link>
                  <span className="content-center m-auto flex">
                    Welcome
                    <div className="dropdown dropdown-left">
                      <a
                        className="link link-hover content-center px-2 flex"
                        tabIndex={0}
                        role="button"
                      >
                        {session.data?.user?.name}
                        <GoTriangleDown className="my-auto"></GoTriangleDown>
                      </a>
                      {/* <div tabIndex={0} role="button" className="btn m-1">Click</div> */}
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[99] w-52 p-2 shadow"
                      >
                        {/* <button className="btn" onClick={() => {signOut()}}>sign out</button> */}
                        <li>
                          <a>ประวัติการสั่งซื้อ</a>
                        </li>
                        <li>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              signOut();
                            }}
                          >
                            ออกจากระบบ
                          </a>
                        </li>
                      </ul>
                    </div>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-fit bg-gray-300">
          <ul className="menu menu-horizontal flex-row px-1 p-0 w-11/12 mx-auto z-20">
            <li className="">
              <details id={"category_menu"}>
                <summary className="rounded-none p-4 px-10 bg-yellow-400 font-semibold">
                  สินค้า
                </summary>
                <ul className="menu bg-base-200 rounded-box w-56 rounded-t-none">
                  <CategoryMenu />
                </ul>
              </details>
            </li>
            <li>
              <Link href={"/"} className="p-4 rounded-none">
                หน้าหลัก
              </Link>
            </li>
            <li>
              <Link href={"/products"} className="rounded-none p-4">
                สินค้าลดราคา
              </Link>
            </li>
            <li>
              <Link href={""} className="rounded-none p-4">
                โปรโมชั่น
              </Link>
            </li>
            <li>
              <Link href={""} className="rounded-none p-4">
                ข่าวสาร
              </Link>
            </li>
            <li>
              <Link href={"/contact"} className="rounded-none p-4">
                แคทตาล็อก
              </Link>
            </li>
            {session.data?.user?.role == "1" ? (
              <li className="bg-yellow-400 ml-auto mr-14">
                <details id={"admin_menu"} className="h-full">
                  <summary className="rounded-none px-10 m-auto h-full font-semibold content-center">
                    <Link href={"/admin"} className="rounded-none px-7">
                      Admin Menu
                    </Link>
                  </summary>
                  <ul className="menu bg-base-200 rounded-box w-56 rounded-t-none">
                    <li></li>
                    <li>
                      <Link
                        href={"/admin/user-management"}
                        className="rounded-none p-4"
                        onClick={dropHandlerAdmin}
                      >
                        จัดการสมาชิก
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/admin/product-management"}
                        className="rounded-none p-4"
                        onClick={dropHandlerAdmin}
                      >
                        จัดการคลังสินค้า
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        href={"/"}
                        className="rounded-none p-4"
                        onClick={dropHandlerAdmin}
                      >
                        จัดการคำสั่งซื้อ
                      </Link>
                    </li> */}
                  </ul>
                </details>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="bg-amber-500 my-[2px] w-full h-[3px]"></div>
      </nav>
    </DialogProvider>
  );
};

export default Navbar;
