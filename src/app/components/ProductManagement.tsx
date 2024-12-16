"use client";
import AdminProduct from "@/app/components/admin-components/AdminProduct";
import AdminProductSidebar from "@/app/components/admin-components/AdminProductSidebar";
import Product from "@/app/components/Product";
import {
  CategoryList,
  ChildCategory,
  SubCategory,
} from "@/app/model/CategoryModel";
import { ProductInfo } from "@/app/model/Product";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { FaInfoCircle, FaUpload } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import ImageWithCheck from "@/app/components/ImageWithCheck";
import { useDialog } from "../context/DialogContext";

// Create an empty data variable
const emptyProduct: ProductInfo = {
  Product_ID: "",
  Child_ID: "0",
  Name: "",
  Brand: "",
  Description: "",
  Unit: "",
  Quantity: 0,
  Sale_Cost: 0,
  Sale_Price: 0,
  Reorder_Point: 0,
  Visibility: true,
  Review_Rating: 0,
  Image_URL: "",
  c_id: 0,
  c_name: "",
  s_id: 0,
  s_name: "",
  cc_name: "",
};
function Paginate({
  items,
  itemsPerPage,
  setShow,
}: {
  items: ProductInfo[];
  itemsPerPage: number;
  setShow: Dispatch<SetStateAction<ProductInfo[]>>;
}) {
  // console.log(items.slice(index * itemsPerPage, (index + 1) * itemsPerPage))
  return (
    <div className="join my-4 w-fit">
      {Array.from(
        { length: Math.ceil(items.length / itemsPerPage) },
        (_, index) => (
          <button
            key={index}
            className={`join-item i2 btn ${
              index == 0 ? "bg-yellow-600 i1" : ""
            }`}
            onClick={(e) => {
              // console.log(index * itemsPerPage, (index + 1) * itemsPerPage);
              setShow(
                items.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
              );
              const k = document.querySelectorAll(".i2");
              k.forEach((d) => d.classList.remove("bg-yellow-600"));
              (e.target as HTMLButtonElement).classList.add("bg-yellow-600");
            }}
          >
            {index + 1}
          </button>
        )
      )}
    </div>
  );
}
function test(p: ProductInfo) {
  const main = document.querySelector("#c1") as HTMLSelectElement;
  const sub = document.querySelector("#c2") as HTMLSelectElement;
  const child = document.querySelector("#c3") as HTMLSelectElement;
  main.value = p.c_id.toString();
  sub.value = p.s_id.toString();
  child.value = p.Child_ID.toString();
}

const ProductManagement = () => {
  const { showDialog } = useDialog();
  const [curProduct, setCurProduct] = useState<ProductInfo>(emptyProduct);
  const [productFilter, setFilter] = useState<ProductInfo[]>([]);
  const [Products, setProducts] = useState<ProductInfo[]>([]);
  const [Show, setShow] = useState<ProductInfo[]>([]);
  const [category, setCategory] = useState<CategoryList[]>([]);
  const [curCategory, setCurCategory] = useState<CategoryList>();
  const [CurSubCategory, setCurSubCategory] = useState<SubCategory>();
  const [curChild, setChild] = useState<ChildCategory[]>();
  const [curImage, setCurImage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [curFileImg, setCurFile] = useState<File>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products/allProduct");
        const data = await response.json();
        setProducts(data);
        setFilter(data);
        setShow(data.slice(0, 3));
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
    if (curCategory) {
      setCurSubCategory(
        curCategory.Sub_Category.find(
          (sub) => sub.Sub_Category_ID == curProduct.s_id.toString()
        )
      );
    }
  }, [curCategory]);

  useEffect(() => {
    setShow(productFilter.slice(0, 4));
    const k = document.querySelectorAll(".i2");
    k.forEach((d) => d.classList.remove("bg-yellow-600"));
    const k22: HTMLElement = document.querySelector(".i1") as HTMLButtonElement;
    if (k22) {
      k22.classList.add("bg-yellow-600");
    }
  }, [productFilter]);

  useEffect(() => {
    if (CurSubCategory) {
      console.log(CurSubCategory);
      setChild(CurSubCategory.ChildCategory);
    }
  }, [CurSubCategory]);

  function setP(p: ProductInfo) {
    setCurProduct(p);
    console.log(p);
    test(p);
    setCurImage(p.Image_URL);
    if (!p.Product_ID) return;
    setCurCategory(category.find((e) => e.Category_ID == p.c_id.toString()));
    setChild(
      curCategory?.Sub_Category.find(
        (sub) => sub.Sub_Category_ID == p.s_id.toString()
      )?.ChildCategory
    );
  }

  function handleChange(
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.currentTarget;
    setCurProduct({
      ...curProduct,
      [name]: value,
    });
  }

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    // if (!curProduct.Product_ID) newErrors.Product_ID = 'Product ID is required';
    if (!curProduct.Name) newErrors.Name = "โปรดกรอกชื่อสินค้า";
    if (!curProduct.Brand) newErrors.Brand = "โปรดกรอกยี่ห้อ";
    if (!curProduct.Description) newErrors.Description = "โปรดกรอกคำอธิบาย";
    if (curProduct.Quantity <= 0)
      newErrors.Quantity = "โปรดกรอกจำนวนที่ถูกต้อง";
    if (curProduct.Sale_Price <= 0) newErrors.Sale_Price = "โปรดกรอกราคา";
    if (!curProduct.Unit) newErrors.Unit = "โปรดกรอกหน่วยสินค้า";
    if (curProduct.Child_ID == "0")
      newErrors.Child_ID = "โปรดเลือกหมวดหมู่สินค้า";
    // if (curProduct.Sale_Price < 0) newErrors.Sale_Price = 'Sale Price cannot be negative';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    let message: string = "";
    for (const [key, value] of Object.entries(errors)) {
      message += `${key} : ${value}\n`;
    }
    showDialog({
      ID: "checkValidate",
      Header: "โปรดตรวจสอบข้อผิดพลาด",
      Type: "warning",
      Message: message,
      onClose: () => {},
    });
  }, [errors]);

  useEffect(() => {
    setFilter(Products);
  }, [Products]);

  async function addNewItem() {
    const formData = new FormData();
    if (curFileImg) {
      formData.append("myfile", curFileImg);
    }
    formData.append("Product", JSON.stringify(curProduct));

    try {
      const response = await fetch("/api/admin/addProduct", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        showDialog({
          ID: "addProductFailure",
          Header: "เกิดข้อผิดพลาดในการเพิ่มสินค้า",
          Type: "error",
          Message: `เพิ่มสินค้าไม่สำเร็จ!`,
          onClose: () => {},
        });
        return;
      }
      const data = await response.json();
      setProducts((e) => [
        ...e,
        { ...curProduct, Product_ID: data.Product_ID },
      ]);
      setFilter((e) => [
        ...Products,
        { ...curProduct, Product_ID: data.Product_ID },
      ]);
      setCurProduct(emptyProduct);
      showDialog({
        ID: "addProductSuccess",
        Header: "แจ้งเตือน",
        Type: "info",
        Message: `เพิ่มสินค้าสำเร็จ!`,
        onClose: () => {},
      });
    } catch (error) {
      showDialog({
        ID: "addProductFailure",
        Header: "เกิดข้อผิดพลาดในการเพิ่มสินค้า",
        Type: "error",
        Message: `เพิ่มสินค้าไม่สำเร็จ!`,
        onClose: () => {},
      });
      return;
    }
  }

  async function saveEditItem() {
    try {
      const response = await fetch("/api/admin/edit-product", {
        method: "POST",
        body: JSON.stringify(curProduct),
      });
      const newObj = Products.map((e) => {
        if (e.Product_ID == curProduct.Product_ID) {
          return curProduct;
        }
        return e;
      });
      setProducts(newObj);
      setFilter(newObj);
      setCurProduct(emptyProduct);
      showDialog({
        ID: "editProductSuccess",
        Header: "แจ้งเตือน",
        Type: "info",
        Message: `แก้ไขข้อมูลสินค้าสำเร็จ!`,
        onClose: () => {},
      });
    } catch (error) {
      showDialog({
        ID: "editProductError",
        Header: "เกิดความผิดพลาดในการแก้ไขสินค้าสำเร็จ",
        Type: "error",
        Message: `แก้ไขสินค้าไม่สำเร็จ!`,
        onClose: () => {},
      });
    }
    return;
  }
  if (!Product) return <div>loading</div>;
  return (
    <div className="">
      <div className="pl-5">
        <h1>จัดการคลังสินค้า</h1>
      </div>
      <div className="grid grid-cols-7 pl-5 pr-5">
        <AdminProductSidebar setProducts={setFilter} Products={Products} />
        <div className="col-span-5 m-2">
          <div>
            <h1>รายละเอียดสินค้า</h1>
            <div className="flex">
              <div className="m-4 text-center">
                <div className="min-h-[300px] flex content-center">
                  <label htmlFor="files" className="m-auto min-h-[300px]">
                    <ImageWithCheck
                      src={curProduct.Image_URL}
                      alt={curProduct.Name}
                      height={300}
                      width={300}
                    ></ImageWithCheck>
                  </label>
                </div>
                <div className="">
                  <label
                    htmlFor="files"
                    className={`btn border-gray-300 bg-gray-200 hover:bg-yellow-500 hover:
                     hover:border-yellow-500 rounded-none w-[300px] 
                  ${!curProduct.Product_ID ? "disabled-class" : ""}`}
                  >
                    <FaUpload className="text-xl" />
                    ..อัพโหลดรูปภาพ
                  </label>
                  <input
                    id="files"
                    hidden
                    name="Image_URL"
                    type="file"
                    className="file-input w-10/12 my-2 file:btn  file:bg-yellow-400"
                    placeholder="...อัพโหลดรูปภาพ"
                    // value={curProduct.Image_URL}
                    // onChange={handleChange}
                    // disabled={!curProduct.Product_ID? true : false}
                    accept=".jpg, .jpeg, .png"
                    // value={curProduct.Image_URL}

                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (!e.target.files) return;
                      const objectUrl = URL.createObjectURL(e.target.files[0]);
                      setCurProduct({ ...curProduct, Image_URL: objectUrl });
                      setCurFile(e.target.files[0]);
                      console.log(`${e.target.files[0]}`);
                      console.log(curProduct.Image_URL);
                      return () => URL.revokeObjectURL(objectUrl);
                    }}
                  ></input>
                </div>
              </div>
              <div className="w-8/12">
                <div className="flex">
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
                  <button
                    className="btn mt-auto mx-2 btn-outline border-yellow-500 border-2 hover:bg-green-700"
                    onClick={() => {
                      setCurProduct({
                        ...emptyProduct,
                        Product_ID: "เพิ่มสินค้าใหม่",
                      });
                      test(emptyProduct);
                    }}
                    disabled={curProduct.Product_ID ? true : false}
                  >
                    <IoIosAddCircle className="text-xl m-auto" />
                    เพิ่มสินค้า
                  </button>
                </div>
                <div className="grid grid-cols-[3fr_2fr] max-w-lg space-x-4">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">ยี่ห้อ</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-sm"
                      value={curProduct?.Brand || ""}
                      onChange={handleChange}
                      name="Brand"
                      disabled={!curProduct.Product_ID ? true : false}
                    />
                  </label>

                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">หน่วย</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g (ชิ้น,แท่ง,แผ่น)"
                      className="input input-bordered w-full max-w-xs"
                      value={curProduct?.Unit || ""}
                      onChange={handleChange}
                      name="Unit"
                      disabled={!curProduct.Product_ID ? true : false}
                    />
                  </label>
                </div>
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
                    disabled={!curProduct.Product_ID ? true : false}
                  />
                </label>
                <div className="flex max-w-lg">
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">ประเภท</span>
                    </div>
                    <select
                      id="c1"
                      className="select select-bordered w-full max-w-48"
                      defaultValue={0}
                      onChange={(e) => {
                        console.log("main change");
                        const k =
                          document.querySelectorAll<HTMLSelectElement>(".ctgy");
                        k.forEach((e) => {
                          e.value = "0";
                        });
                        setCurCategory(
                          category.find(
                            (cat) => cat.Category_ID == e.target.value
                          )
                        );
                      }}
                      disabled={!curProduct.Product_ID ? true : false}
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
                      <span className="label-text">หมวดหมู่</span>
                    </div>
                    <select
                      id={"c2"}
                      className="ctgy select select-bordered w-full max-w-48"
                      defaultValue={0}
                      onChange={(e) => {
                        setCurSubCategory(
                          curCategory?.Sub_Category.find(
                            (sub) => sub.Sub_Category_ID == e.target.value
                          )
                        );
                        const child = document.querySelector(
                          "#c3"
                        ) as HTMLSelectElement;
                        child.value = "0";
                        // setChild(CurSubCategory.ChildCategory)
                      }}
                      disabled={!curProduct.Product_ID ? true : false}
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
                      <span className="label-text">หมวดหมู่ย่อย</span>
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
                      disabled={!curProduct.Product_ID ? true : false}
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
                      disabled={!curProduct.Product_ID ? true : false}
                      name={"Sale_Price"}
                      onChange={handleChange}
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
                      disabled={!curProduct.Product_ID ? true : false}
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
                      onChange={handleChange}
                      disabled={!curProduct.Product_ID ? true : false}
                    />
                  </label>
                </div>
              </div>
            </div>
            <h1>คำอธิบายสินค้า</h1>
            <textarea
              className="mx-2 textarea textarea-bordered w-10/12 h-32"
              value={curProduct.Description}
              name="Description"
              onChange={(e) => handleChange(e)}
            ></textarea>
            <div className="w-10/12 ml-2 mt-3 text-end space-x-5">
              <button
                className="btn bg-gray-300 hover:bg-red-300"
                disabled={!curProduct.Product_ID ? true : false}
                onClick={() => {
                  setP(emptyProduct);
                  // setCurProduct(emptyProduct);
                }}
              >
                ยกเลิก
              </button>
              <button
                className="btn ml-auto bg-gray-300 hover:bg-yellow-300"
                disabled={!curProduct.Product_ID ? true : false}
                onClick={(e) => {
                  console.log(curProduct);
                  if (validate()) {
                    if (!isNaN(Number(curProduct.Product_ID))) {
                      saveEditItem();
                      return;
                    }
                    console.log("addnew");
                    addNewItem();
                  }
                }}
              >
                {curProduct.Product_ID == "เพิ่มสินค้าใหม่" ? (
                  <>เพิ่ม</>
                ) : (
                  "บันทึก"
                )}
              </button>
            </div>

            <div>ค้นหา</div>
            <div className="mx-2 my-3 grid grid-cols-[2fr_1fr_4fr_2fr_2fr_1fr_1fr] divide-x-2 text-center">
              <p>รูปภาพ</p>
              <p>รหัสสินค้า</p>
              <p>ชื่อสินค้า</p>
              <p>หมวดหมู่ย่อย</p>
              <p>ราคา</p>
              <p>จำนวนคงเหลือ</p>
              <p>จุดสั่งซื้อ</p>
            </div>
            <div className="grid grid-rows-4 w-full">
              {productFilter.length == 0 ? <p>ไม่พบสินค้า</p> : ""}
              {Show.map((e, index) => (
                <div key={e.Product_ID}>
                  <AdminProduct
                    key={e.Product_ID + 1}
                    product={e}
                    setProduct={setP}
                    isGray={index % 2 == 0}
                    setProducts={setProducts}
                  />
                </div>
              ))}
              <Paginate
                items={productFilter}
                itemsPerPage={4}
                setShow={setShow}
              ></Paginate>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
