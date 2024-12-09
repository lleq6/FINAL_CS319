"use client";
import AdminProduct from "@/app/components/admin-components/AdminProduct";
import AdminProductSidebar from "@/app/components/admin-components/AdminProductSidebar";
import Product from "@/app/components/Product";
import { CategoryList } from "@/app/model/CategoryModel";
import { ProductInfo } from "@/app/model/Product";
import { useEffect, useState } from "react";

export default function productManagement() {
  const [Products, setProducts] = useState<ProductInfo[]>([]);
  const [Show, setShow] = useState<ProductInfo[]>([]);
  const [category, setCategory] = useState<CategoryList[]>([]);
  const [categorySelect, setCategorySelect] = useState({
    cat: 0,
    sub: 0,
    child: 0,
  });
  const [curCategory, setCurCategory] = useState<CategoryList>();
  const [CurSubCategory, setCurSubCategory] = useState<CategoryList>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products/allProduct");
        const data = await response.json();
        setProducts(data);
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

  useEffect(() => {
    console.log(categorySelect);
    setCurCategory(category[categorySelect.cat]);
  }, [categorySelect]);
  useEffect(() => {}, [curCategory]);

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
                <div
                  className="bg-green-500 text-center content-center w-[150px] h-[150px]"
                  style={{}}
                >
                  <p className="my-auto">นี่คือรูปจำลอง</p>
                </div>
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
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">ชื่อสินค้า</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-md"
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
                        const k = document.querySelectorAll('.ctgy')
                        k.forEach(e => {
                            e.value = 0
                        })
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
                        console.log(e.target.value);
                        console.log(
                          curCategory?.Sub_Category.find(
                            (sub) => sub.Sub_Category_ID == e.target.value
                          )
                        );
                        setCurSubCategory(
                          curCategory?.Sub_Category.find(
                            (sub) => sub.Sub_Category_ID == e.target.value
                          )
                        );
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
                      className="ctgy select select-bordered w-full max-w-48"
                      defaultValue={0}
                    >
                      <option disabled value={0}>
                        - เลือก -
                      </option>
                      {CurSubCategory?.ChildCategory?.map((e) => (
                        <option key={e.Child_ID}>{e.Name}</option>
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
                    />
                  </label>
                  <label className="form-control w-full max-w-32 mx-2">
                    <div className="label">
                      <span className="label-text">จำนวน</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-32"
                    />
                  </label>
                  <label className="form-control w-full max-w-32 mx-2">
                    <div className="label">
                      <span className="label-text">ลดราคา</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-32"
                    />
                  </label>
                </div>
              </div>
            </div>
            <h1>คำอธิบายสินค้า</h1>
            <textarea className="mx-2 textarea textarea-bordered w-8/12 h-32"></textarea>
            <div>
              <button className="btn">asd</button>
              <button className="btn">asd</button>
              <button className="btn">asd</button>
            </div>
            <div className="grid grid-rows-4 mx-a">
              {Products.map((e) => (
                <AdminProduct key={e.Product_ID} product={e} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
