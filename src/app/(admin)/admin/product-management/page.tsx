"use client";
import AdminProduct from "@/app/components/admin-components/AdminProduct";
import AdminProductSidebar from "@/app/components/admin-components/AdminProductSidebar";
import Product from "@/app/components/Product";
import { CategoryList } from "@/app/model/CategoryModel";
import { ProductInfo } from "@/app/model/Product";
import Image from "next/image";
import { useEffect, useState } from "react";

// Create an empty data variable
const emptyProduct: ProductInfo = {
  Product_ID: "",
  Child_ID: 0,
  Name: "",
  Brand: "",
  Description: "",
  Unit: "",
  Quantity: 0,
  Sale_Cost: 0,
  Sale_Price: 0,
  Reorder_Point: 0,
  Visibility: false,
  Review_Rating: 0,
  Image_URL: "",
  c_id: 0,
  c_name: "",
  s_id: 0,
  s_name: "",
  cc_name: "",
};

function Paginate({ items, itemsPerPage, setShow }) {
  console.log("paginate", items);
  return (
    <div className="join my-4">
      {Array.from(
        { length: Math.ceil(items.length / itemsPerPage) },
        (_, index) => (
          <button
            key={index}
            className={`join-item i2 btn ${index == 0 ? "bg-yellow-600" : ""}`}
            onClick={(e: MouseEvent<Element>) => {
              console.log(index * itemsPerPage, (index + 1) * itemsPerPage);
              setShow(
                items.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
              );
              const k = document.querySelectorAll(".i2");
              k.forEach((d) => d.classList.remove("bg-yellow-600"));
              e.target.classList.add("bg-yellow-600");
              console.log("clickpage");
              console.log(index);
            }}
          >
            {index + 1}
          </button>
        )
      )}
    </div>
  );
}
const ImageWithCheck = ({ src, alt, height, width }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [src]);

  return imageLoaded ? (
    <Image src={src} alt={alt} height={height} width={width} />
  ) : (
    <div className="flex m-auto w-[300px] h-[300px] bg-red-300">
      <p className="m-auto text-center">ไม่สามารถแสดงภาพ...</p>
    </div>
  );
};
function test(p) {
  const main = document.querySelector("#c1");
  const sub = document.querySelector("#c2");
  const child = document.querySelector("#c3");
  main.value = p.c_id;
  sub.value = p.s_id;
  child.value = p.Child_ID;
}

export default function productManagement() {
  const [curProduct, setCurProduct] = useState<ProductInfo>({
    Product_ID: "",
    Child_ID: 0,
    Name: "",
    Brand: "",
    Description: "",
    Unit: "",
    Quantity: 0,
    Sale_Cost: 0,
    Sale_Price: 0,
    Reorder_Point: 0,
    Visibility: false,
    Review_Rating: 0,
    Image_URL: "",
    c_id: 0,
    c_name: "",
    s_id: 0,
    s_name: "",
    cc_name: "",
  });

  const [Products, setProducts] = useState<ProductInfo[]>([]);
  const [Show, setShow] = useState<ProductInfo[]>([]);
  const [category, setCategory] = useState<CategoryList[]>([]);
  const [curCategory, setCurCategory] = useState<CategoryList>();
  const [CurSubCategory, setCurSubCategory] = useState<CategoryList>();
  const [curChild, setChild] = useState<CategoryList>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products/allProduct");
        const data = await response.json();
        setProducts(data);
        setShow(data.slice(0, 2));
      } catch (error) {}
      try {
        const response = await fetch("/api/getCategory/all");
        const data = await response.json();
        setCategory(data);
        console.log(data);
      } catch (error) {}
    };
    fetchData();
    console.log(category);
  }, []);

  // useEffect(()=>{
  //   if(curCategory){
  //     setCurSubCategory(
  //       curCategory.Sub_Category.find((sub) => sub.Sub_Category_ID == curProduct.s_id)
  //     );
  //   }
  // },[curCategory])
  useEffect(() => {
    if (CurSubCategory) {
      setChild(CurSubCategory.ChildCategory);
    }
  }, [CurSubCategory]);
  function setP(p: ProductInfo) {
    setCurProduct(p);
    console.log(p);
    test(p);
    setCurCategory(category.find((e) => e.Category_ID == p.c_id));
    setCurSubCategory(
      curCategory.Sub_Category.find(
        (sub) => sub.Sub_Category_ID == curProduct.s_id
      )
    );
    setChild(
      curCategory?.Sub_Category.find((sub) => sub.Sub_Category_ID == p.s_id)
        .ChildCategory
    );
    console.log(curChild);
    // setTimeout(() => (child.value = p.Child_ID), 1000);
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setCurProduct({
      ...curProduct,
      [name]: value,
    });
  }
  if (!Product) return <div>loading</div>;

  return (
    <div className="">
      <div className="pl-5">
        <h1>จัดการคลังสินค้า</h1>
      </div>
      <div className="grid grid-cols-7 pl-5 pr-5">
        <AdminProductSidebar />
        <div className="col-span-5 m-2">
          <div>
            <h1>รายละเอียดสินค้า</h1>
            <div className="flex">
              <div className="m-4 text-center">
                <ImageWithCheck
                  src={curProduct.Image_URL}
                  alt={curProduct.Name}
                  height={300}
                  width={300}
                ></ImageWithCheck>
                <button className="btn my-2">อัพโหลดรูปภาพ...</button>
              </div>
              <div className="w-8/12">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">รหัสสินค้า</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={curProduct?.Product_ID || ""}
                    onChange={(e) => handleChange(e)}
                    name="Product_ID"
                    disabled
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">ยี่ห้อ</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-md"
                    value={curProduct?.Brand || ""}
                    onChange={handleChange}
                    name="Brand"
                  />
                </label>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">ชื่อ</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-lg"
                    value={curProduct?.Name || ""}
                    onChange={handleChange}
                    name="Name"
                  />
                </label>

                <div className="flex max-w-lg">
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">หมวดหมู่</span>
                    </div>
                    <select
                      id="c1"
                      className="select select-bordered w-full max-w-48"
                      defaultValue={0}
                      onChange={(e) => {
                        console.log("main change");
                        const k = document.querySelectorAll(".ctgy");
                        k.forEach((e) => {
                          e.value = 0;
                        });
                        setCurCategory(
                          category.find(
                            (cat) => cat.Category_ID == e.target.value
                          )
                        );
                      }}
                    >
                      <option value={0}>- เลือก -</option>
                      {category.map((e) => (
                        <option key={e.Category_ID} value={e.Category_ID}>
                          {e.Name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">หมวดหมู่รอง</span>
                    </div>
                    <select
                      id={"c2"}
                      className="ctgy select select-bordered w-full max-w-48"
                      defaultValue={0}
                      onChange={(e) => {
                        console.log(e.target.value, "subchange");
                        setCurSubCategory(
                          curCategory?.Sub_Category.find(
                            (sub) => sub.Sub_Category_ID == e.target.value
                          )
                        );
                        const child = document.querySelector("#c3")
                        child.value = 0
                        // setChild(CurSubCategory.ChildCategory)
                      }}
                    >
                      <option disabled value={0}>
                        - เลือก -
                      </option>
                      {curCategory?.Sub_Category.map((e) => (
                        <option
                          key={e.Sub_Category_ID}
                          value={e.Sub_Category_ID}
                        >
                          {e.Name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">หมวดหมู่รอง 2</span>
                    </div>
                    <select
                      id="c3"
                      className="ctgy select select-bordered w-full max-w-48"
                      defaultValue={0}
                      onChange={(e) => {
                        setCurProduct((old) => {
                          const p = {
                            ...old,
                            Child_ID: e.target.value,
                          };
                          return p;
                        });
                      }}
                    >
                      <option disabled value={0}>
                        - เลือก -
                      </option>
                      {curChild?.map((e) => (
                        <option key={e.Child_ID} value={e.Child_ID}>
                          {e.Name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="flex">
                  <label className="form-control w-full max-w-32 mx-2">
                    <div className="label">
                      <span className="label-text">ราคา</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-320"
                      value={curProduct.Sale_Price}
                    />
                  </label>
                  <label className={`form-control w-full max-w-32 mx-2`}>
                    <div className="label">
                      <span className="label-text">จำนวน</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className={`input input-bordered w-full max-w-32 ${
                        !(curProduct.Product_ID == "")
                          ? `${
                              curProduct.Quantity > curProduct.Reorder_Point
                                ? ""
                                : "border-red-800 focus:border-red-800"
                            }`
                          : ""
                      }`}
                      value={curProduct.Quantity}
                      onChange={handleChange}
                      name={"Quantity"}
                    />
                    {!(curProduct.Product_ID == "") ? (
                      <>
                        {curProduct.Quantity == 0 ? (
                          <span className="label-text">สินค้าหมด</span>
                        ) : (
                          <>
                            {curProduct.Quantity <= curProduct.Reorder_Point ? (
                              <span className="label-text">
                                ต่ำกว่าจุดสั่งซื้อ
                              </span>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </label>
                  <label className="form-control w-full max-w-32 mx-2">
                    <div className="label">
                      <span className="label-text">จุดสั่งซื้อ</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-32"
                      value={curProduct.Reorder_Point}
                    />
                  </label>
                </div>
              </div>
            </div>
            <h1>คำอธิบายสินค้า</h1>
            <textarea
              className="mx-2 textarea textarea-bordered w-8/12 h-32"
              value={curProduct.Description}
              name="Description"
              onChange={handleChange}
            ></textarea>
            <div className="w-full">
              <div className="ml-auto flex w-[30%]">
              <button
                className="btn mr-auto"
                onClick={() => {
                  const p = {
                    Product_ID: "",
                    Child_ID: 0,
                    Name: "",
                    Brand: "",
                    Description: "",
                    Unit: "",
                    Quantity: 0,
                    Sale_Cost: 0,
                    Sale_Price: 0,
                    Reorder_Point: 0,
                    Visibility: false,
                    Review_Rating: 0,
                    Image_URL: "",
                    c_id: 0,
                    c_name: "",
                    s_id: 0,
                    s_name: "",
                    cc_name: "",
                  };
                  setCurProduct(p);
                  test(p);
                }}
              >
                asd
              </button>
              <button className="btn">asd</button>
              <button className="btn ml-auto">asd</button>
              </div>
            </div>
            <div className="grid grid-rows-4 mx-a">
              {Show.map((e) => (
                <div key={e.Product_ID}>
                  <AdminProduct
                    key={e.Product_ID + 1}
                    product={e}
                    setProduct={setP}
                  />
                  <AdminProduct
                    key={e.Product_ID}
                    product={e}
                    setProduct={setP}
                  />
                </div>
              ))}
              <Paginate
                items={Products}
                itemsPerPage={2}
                setShow={setShow}
              ></Paginate>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
