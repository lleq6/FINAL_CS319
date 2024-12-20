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
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FaUpload } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import ImageWithCheck from "@/app/components/ImageWithCheck";
import { useDialog } from "../context/DialogContext";

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
  Visibility: true,
  Review_Rating: 0,
  Image_URL: "",
  C_ID: 0,
  C_Name: "",
  S_ID: 0,
  S_Name: "",
  CC_Name: "",
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
function setSelectElement(p: ProductInfo) {
  const main = document.querySelector("#c1") as HTMLSelectElement;
  const sub = document.querySelector("#c2") as HTMLSelectElement;
  const child = document.querySelector("#c3") as HTMLSelectElement;

  main.value = p.C_ID ? p.C_ID.toString() : "0";
  sub.value = p.S_ID ? p.S_ID.toString() : "0";
  child.value = p.Child_ID ? p.Child_ID.toString() : "0";
}

interface addCategoryModalProps {
  type: number;
  curCategory: CategoryList | undefined;
  subCategory: SubCategory | undefined;
  callback?: () => void;
}
function AddCategoryModal({
  type,
  curCategory,
  subCategory,
  callback,
}: addCategoryModalProps) {
  const select = {
    0: "ประเภท",
    1: "หมวดหมู่",
    2: "หมวดหมู่ย่อย",
  };

  const [value, setValue] = useState("");
  const { showDialog } = useDialog();
  // const router = useRouter()
  return (
    <dialog id="addCategory" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">
          เพิ่ม {select[type as keyof typeof select]}
        </h3>
        <div>
          <input
            className="input w-full bg-gray-200 my-3"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          ></input>
        </div>
        <form method="dialog">
          <div className="text-end space-x-2">
            <button
              className="btn"
              onClick={async () => {
                let keyword: string;
                let body = {};
                switch (type) {
                  case 0:
                    keyword = "Category";
                    body = {
                      keyword: keyword,
                      Name: value,
                    };
                    break;
                  case 1:
                    keyword = "Sub_Category";
                    body = {
                      keyword: keyword,
                      Category_ID: curCategory?.Category_ID,
                      Name: value,
                    };
                    break;
                  case 2:
                    keyword = "Child_Sub_Category";
                    body = {
                      keyword: keyword,
                      Category_ID: curCategory?.Category_ID,
                      Sub_Category_ID: subCategory?.Sub_Category_ID,
                      Name: value,
                    };
                    break;
                }
                try {
                  const response = await fetch("/api/admin/categoryManage", {
                    method: "PUT",
                    body: JSON.stringify(body),
                  });
                  if (response.ok) {
                    if (callback) {
                      callback();
                    }
                    (
                      document.getElementById(
                        "addCategory"
                      ) as HTMLDialogElement
                    ).close();
                    showDialog({
                      ID: "addProductCategorySuccess",
                      Header: "แจ้งเตือน",
                      Type: "success",
                      Message: `เพิ่มหมวดหมู่ '${value}' สำเร็จ!`,
                      onClose: () => {},
                    });
                  } else {
                    showDialog({
                      ID: "addProductCategoryFailure",
                      Header: "แจ้งเตือน",
                      Type: "error",
                      Message: `เพิ่มหมวดหมู่ '${value}' ล้มเหลว!`,
                      onClose: () => {
                        (
                          document.getElementById(
                            "addCategory"
                          ) as HTMLDialogElement
                        ).close();
                      },
                    });
                  }
                } catch (error) {
                  showDialog({
                    ID: "addProductCategoryError",
                    Header: "แจ้งเตือน",
                    Type: "error",
                    Message: "เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่",
                    onClose: () => {
                      (
                        document.getElementById(
                          "addCategory"
                        ) as HTMLDialogElement
                      ).close();
                    },
                  });
                }
                setValue("");
              }}
            >
              เพิ่ม
            </button>
            <button className="btn">ยกเลิก</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
const ProductManagement = () => {
  const { showDialog } = useDialog();
  const [curProduct, setCurProduct] = useState<ProductInfo>(emptyProduct);
  const [productsNormal, setProductsNormal] = useState<ProductInfo[]>([]);
  const [productsWithoutCategory, setProductsWithoutCategory] = useState<
    ProductInfo[]
  >([]);
  const [Products, setProducts] = useState<ProductInfo[]>([]);
  const [ShowProductsNormal, setShowProductsNormal] = useState<ProductInfo[]>(
    []
  );
  const [ShowProductsWithoutCategory, setShowProductsWithoutCategory] =
    useState<ProductInfo[]>([]);
  const [category, setCategory] = useState<CategoryList[]>([]);
  const [curCategory, setCurCategory] = useState<CategoryList>();
  const [CurSubCategory, setCurSubCategory] = useState<SubCategory>();
  const [curChild, setChild] = useState<ChildCategory[]>();
  const [curImage, setCurImage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [curFileImg, setCurFile] = useState<File>();
  const [addCategoryType, setAddCategory] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("tab1");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/products/allProduct");
      const data: ProductInfo[] = await response.json();
      if (data.length == 0) return "Product not found";
      const productsNormal: ProductInfo[] = data.filter(
        (x) => x.C_ID != 0 || x.S_ID != 0
      );
      const productsWithoutCategory: ProductInfo[] = data.filter(
        (x) => x.C_ID == 0 || x.S_ID == 0
      );
      setProducts(data);
      setProductsNormal(productsNormal);
      setProductsWithoutCategory(productsWithoutCategory);
      setShowProductsNormal(productsNormal.slice(0, 3));
      setShowProductsWithoutCategory(productsWithoutCategory.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  async function getCategory() {
    try {
      const response = await fetch("/api/getCategory/all");
      const data = await response.json();
      if (data.length == 0) {
        return;
      }
      setCategory(data);
      (document.getElementById("c1") as HTMLSelectElement).value = "0";
      (document.getElementById("c2") as HTMLSelectElement).value = "0";
      (document.getElementById("c3") as HTMLSelectElement).value = "0";
      setCurCategory(undefined);
      setCurSubCategory(undefined);
      setChild(undefined);
      setCurProduct({ ...curProduct, Child_ID: 0 });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategory();
    fetchData();
  }, []);

  useEffect(() => {
    setShowProductsNormal(productsNormal.slice(0, 4));
    const k = document.querySelectorAll(".i2");
    k.forEach((d) => d.classList.remove("bg-yellow-600"));
    const k22: HTMLElement = document.querySelector(".i1") as HTMLButtonElement;
    if (k22) {
      k22.classList.add("bg-yellow-600");
    }
  }, [productsNormal]);

  useEffect(() => {
    setShowProductsWithoutCategory(productsWithoutCategory.slice(0, 4));
    const k = document.querySelectorAll(".i2");
    k.forEach((d) => d.classList.remove("bg-yellow-600"));
    const k22: HTMLElement = document.querySelector(".i1") as HTMLButtonElement;
    if (k22) {
      k22.classList.add("bg-yellow-600");
    }
  }, [productsWithoutCategory]);

  useEffect(() => {
    if (curCategory) {
      setCurSubCategory(
        curCategory.Sub_Category.find(
          (sub) => sub.Sub_Category_ID == curProduct.S_ID
        )
      );
      return;
    }
    setCurSubCategory(undefined);
  }, [curCategory]);

  useEffect(() => {
    if (CurSubCategory) {
      setChild(CurSubCategory.ChildCategory);
      return;
    }
    setChild(undefined);
  }, [CurSubCategory]);

  useEffect(() => {
    let m_ChildID = 0;
    const mDefault = curChild?.find((x) => x.Child_ID == curProduct?.Child_ID);
    if (mDefault) {
      m_ChildID = curProduct?.Child_ID;
    }
    const opt = document?.querySelector(
      `#c3 option[value="${m_ChildID}"]`
    ) as HTMLOptionElement;
    if (opt) {
      opt.selected = true;
      opt.defaultSelected = true;
    }
  }, [curChild]);

  function setSelectedProduct(p: ProductInfo) {
    setCurProduct(p);
    setSelectElement(p);
    setCurImage(p.Image_URL);
    if (!p.Product_ID) {
      setCurCategory(undefined);
      setCurSubCategory(undefined);
      return;
    }
    setCurCategory(category.find((e) => e.Category_ID == p.C_ID));
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
    if (!curProduct.Name) newErrors.Name = "กรุณากรอกชื่อสินค้า";
    if (!curProduct.Brand) newErrors.Brand = "กรุณากรอกยี่ห้อ";
    if (!curProduct.Description) newErrors.Description = "กรุณากรอกคำอธิบาย";
    if (curProduct.Quantity <= 0)
      newErrors.Quantity = "กรุณากรอกจำนวนให้ถูกต้อง";
    if (curProduct.Sale_Price <= 0) newErrors.Sale_Price = "กรุณากรอกราคา";
    if (!curProduct.Unit) newErrors.Unit = "กรุณากรอกหน่วยสินค้า";
    if (curProduct.Child_ID == 0)
      newErrors.Child_ID = "กรุณาเลือกหมวดหมู่สินค้า";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    let message: string = "";
    for (const [key, value] of Object.entries(errors)) {
      message += `${value}\n`;
    }
    showDialog({
      ID: "checkValidate",
      Header: "แจ้งเตือน",
      Type: "warning",
      Message: message,
      onClose: () => {},
    });
  }, [errors]);

  useEffect(() => {
    setProductsNormal(Products.filter((x) => x.C_ID != 0 || x.S_ID != 0));
    setProductsWithoutCategory(
      Products.filter((x) => x.C_ID == 0 || x.S_ID == 0)
    );
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
      if (response.ok) {
        const data = await response.json();
        setProducts((e) => [
          ...e,
          { ...curProduct, Product_ID: data.Product_ID },
        ]);
        setProductsNormal((e) => [
          ...Products,
          { ...curProduct, Product_ID: data.Product_ID },
        ]);
        setCurProduct(emptyProduct);
        fetchData();
        showDialog({
          ID: "addProductSuccess",
          Header: "แจ้งเตือน",
          Type: "success",
          Message: `เพิ่มสินค้าสำเร็จ!`,
          onClose: () => {},
        });
      } else {
        showDialog({
          ID: "addProductFailure",
          Header: "แจ้งเตือน",
          Type: "error",
          Message: `เพิ่มสินค้าล้มเหลว!`,
          onClose: () => {},
        });
      }
    } catch (error) {
      showDialog({
        ID: "addProductFailure",
        Header: "แจ้งเตือน",
        Type: "error",
        Message: `เกิดข้อผิดพลาดในการเพิ่มสินค้า!`,
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
      if (response.ok) {
        setSelectedProduct(emptyProduct);
        fetchData();
        showDialog({
          ID: "editProductSuccess",
          Header: "แจ้งเตือน",
          Type: "success",
          Message: `แก้ไขข้อมูลสินค้าสำเร็จ!`,
          onClose: () => {},
        });
      } else {
        showDialog({
          ID: "editProductFailure",
          Header: "แจ้งเตือน",
          Type: "error",
          Message: `แก้ไขข้อมูลสินค้าล้มเหลว!`,
          onClose: () => {},
        });
      }
    } catch (error) {
      showDialog({
        ID: "editProductError",
        Header: "แจ้งเตือน",
        Type: "error",
        Message: `เกิดข้อผิดพลาดในการแก้ไขข้อมูลสินค้า`,
        onClose: () => {},
      });
    }
    return;
  }

  function openAddModal(type: number) {
    setAddCategory(type);
    (document.getElementById("addCategory") as HTMLDialogElement).showModal();
  }
  if (!Product) return <div>loading</div>;
  return (
    <div className="">
      <div className="pl-5">
        <h1>จัดการคลังสินค้า</h1>
      </div>
      <div className="grid grid-cols-7 pl-5 pr-5">
        <AdminProductSidebar
          setProducts={setProductsNormal}
          Products={Products}
        />
        <AddCategoryModal
          curCategory={curCategory}
          subCategory={CurSubCategory}
          type={addCategoryType}
          callback={() => {
            getCategory();
            fetchData();
          }}
        />
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
                      setSelectElement(emptyProduct);
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
                      placeholder="e.g (ชิ้น, แท่ง, แผ่น)"
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
                      name="c1"
                      className="select select-bordered w-full max-w-48"
                      defaultValue={0}
                      onChange={(e) => {
                        const k =
                          document.querySelectorAll<HTMLSelectElement>(".ctgy");
                        k.forEach((e) => {
                          e.value = "0";
                        });
                        setCurProduct({ ...curProduct, Child_ID: 0 });
                        setCurCategory(
                          category.find(
                            (cat) =>
                              cat.Category_ID == Number.parseInt(e.target.value)
                          )
                        );
                      }}
                      disabled={!curProduct.Product_ID ? true : false}
                    >
                      <option value={0}>- เลือก -</option>
                      {category?.map((e) => (
                        <option key={e.Category_ID} value={e.Category_ID}>
                          {e.Name}
                        </option>
                      ))}
                    </select>
                    <div className="text-end space-x-2 my-2">
                      <button
                        className="btn btn-sm btn-outline border-green-700 border-2 hover:bg-green-700 hover:border-white hover:text-white"
                        disabled={!curProduct.Product_ID ? true : false}
                        onClick={() => openAddModal(0)}
                      >
                        เพิ่ม
                      </button>
                      <button
                        className="btn btn-sm btn-outline border-red-700 border-2 hover:bg-red-700 hover:border-white hover:text-white"
                        disabled={!curCategory ? true : false}
                        onClick={() =>
                          showDialog({
                            Header: "โปรดตรวจสอบ",
                            ID: "deleteCategory",
                            Message: `คุณต้องการลบประเภทสินค้า '${curCategory?.Name}' ใช่ไหม่?`,
                            Type: "info",
                            onConfirm: async () => {
                              const body = {
                                keyword: "Category",
                                Category_ID: curCategory?.Category_ID,
                              };
                              try {
                                const response = await fetch(
                                  "/api/admin/categoryManage",
                                  {
                                    method: "DELETE",
                                    body: JSON.stringify(body),
                                  }
                                );
                                if (response.ok) {
                                  getCategory();
                                  fetchData();
                                  showDialog({
                                    ID: "deleteCategorySuccess",
                                    Header: "แจ้งเตือน",
                                    Message: `ลบประเภทสินค้า '${curCategory?.Name}' สำเร็จ!`,
                                    Type: "success",
                                    onClose: () => {},
                                  });
                                } else {
                                  showDialog({
                                    ID: "deleteCategoryFailure",
                                    Header: "แจ้งเตือน",
                                    Message: `ลบประเภทสินค้า '${curCategory?.Name}' ล้มเหลว!`,
                                    Type: "error",
                                    onClose: () => {},
                                  });
                                }
                              } catch (error) {
                                showDialog({
                                  ID: "deleteCategoryError",
                                  Header: "แจ้งเตือน",
                                  Message: "เกิดข้อผิดพลาดในการลบประเภทสินค้า",
                                  Type: "error",
                                  onClose: () => {},
                                });
                              }
                            },
                            onCancel: () => {},
                          })
                        }
                      >
                        ลบ
                      </button>
                    </div>
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">หมวดหมู่</span>
                    </div>
                    <select
                      id="c2"
                      name="c2"
                      className="ctgy select select-bordered w-full max-w-48"
                      defaultValue={0}
                      onChange={(e) => {
                        setCurProduct({ ...curProduct, Child_ID: 0 });
                        setCurSubCategory(
                          curCategory?.Sub_Category.find(
                            (sub) =>
                              sub.Sub_Category_ID ==
                              Number.parseInt(e.target.value)
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
                    <div className="text-end space-x-2 my-2">
                      <button
                        className="btn btn-sm btn-outline border-green-700 border-2 hover:bg-green-700 hover:border-white hover:text-white"
                        disabled={!curCategory ? true : false}
                        onClick={() => openAddModal(1)}
                      >
                        เพิ่ม
                      </button>
                      <button
                        className="btn btn-sm btn-outline border-red-700 border-2 hover:bg-red-700 hover:border-white hover:text-white"
                        disabled={!CurSubCategory ? true : false}
                        onClick={() =>
                          showDialog({
                            Header: "โปรดตรวจสอบ",
                            ID: "deleteSubCategory",
                            Message: `คุณต้องการลบหมวดหมู่สินค้า '${CurSubCategory?.Name}' ใช่ไหม?`,
                            Type: "warning",
                            onConfirm: async () => {
                              const body = {
                                keyword: "Sub_Category",
                                Sub_Category_ID:
                                  CurSubCategory?.Sub_Category_ID,
                              };
                              try {
                                const response = await fetch(
                                  "/api/admin/categoryManage",
                                  {
                                    method: "DELETE",
                                    body: JSON.stringify(body),
                                  }
                                );
                                if (response.ok) {
                                  getCategory();
                                  fetchData();
                                  showDialog({
                                    ID: "deleteSubCategorySuccess",
                                    Header: "แจ้งเตือน",
                                    Message: `ลบหมวดหมู่สินค้า '${CurSubCategory?.Name}' สำเร็จ!`,
                                    Type: "success",
                                    onClose: () => {},
                                  });
                                } else {
                                  showDialog({
                                    ID: "deleteSubCategoryFailure",
                                    Header: "แจ้งเตือน",
                                    Message: `ลบหมวดหมู่สินค้า '${CurSubCategory?.Name}' ล้มเหลว!`,
                                    Type: "error",
                                    onClose: () => {},
                                  });
                                }
                              } catch (error) {
                                showDialog({
                                  ID: "deleteSubCategoryError",
                                  Header: "แจ้งเตือน",
                                  Message:
                                    "เกิดข้อผิดพลาดในการลบหมวดหมู่สินค้า",
                                  Type: "error",
                                  onClose: () => {},
                                });
                              }
                            },
                            onCancel: () => {},
                          })
                        }
                      >
                        ลบ
                      </button>
                    </div>
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">หมวดหมู่ย่อย</span>
                    </div>
                    <select
                      id="c3"
                      name="c3"
                      className="ctgy select select-bordered w-full max-w-48"
                      defaultValue={0}
                      onChange={(e) => {
                        setCurProduct((old) => {
                          const p = {
                            ...old,
                            Child_ID: Number.parseInt(e.target.value),
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
                    <div className="text-end my-2 space-x-2">
                      <button
                        className="btn btn-sm btn-outline border-green-700 border-2 hover:bg-green-700 hover:border-white hover:text-white"
                        disabled={!CurSubCategory ? true : false}
                        onClick={() => openAddModal(2)}
                      >
                        เพิ่ม
                      </button>
                      <button
                        className="btn btn-sm btn-outline border-red-700 border-2 hover:bg-red-700 hover:border-white hover:text-white"
                        disabled={curProduct?.Child_ID == 0 ? true : false}
                        onClick={() =>
                          showDialog({
                            Header: "โปรดตรวจสอบ",
                            ID: "deleteChildSubCategory",
                            Message: `คุณต้องการลบหมวดหมู่สินค้า '${curProduct?.CC_Name}' ใช่ไหม่?`,
                            Type: "warning",
                            onConfirm: async () => {
                              const body = {
                                keyword: "Child_Sub_Category",
                                Child_ID: curProduct.Child_ID,
                              };
                              try {
                                const response = await fetch(
                                  "/api/admin/categoryManage",
                                  {
                                    method: "DELETE",
                                    body: JSON.stringify(body),
                                  }
                                );
                                if (response.ok) {
                                  getCategory();
                                  fetchData();
                                  showDialog({
                                    ID: "deleteChildSubCategorySuccess",
                                    Header: "แจ้งเตือน",
                                    Message: `ลบหมวดหมู่ย่อยของสินค้า '${curProduct?.CC_Name}' สำเร็จ!`,
                                    Type: "success",
                                    onClose: () => {},
                                  });
                                } else {
                                  showDialog({
                                    ID: "deleteChildSubCategoryFailure",
                                    Header: "แจ้งเตือน",
                                    Message: `ลบหมวดหมู่ย่อยของสินค้า '${curProduct?.CC_Name}' ล้มเหลว!`,
                                    Type: "error",
                                    onClose: () => {},
                                  });
                                }
                              } catch (error) {
                                showDialog({
                                  ID: "deleteChildSubCategoryError",
                                  Header: "แจ้งเตือน",
                                  Message:
                                    "เกิดข้อผิดพลาดในการลบหมวดหมู่ย่อยของสินค้า",
                                  Type: "error",
                                  onClose: () => {},
                                });
                              }
                            },
                            onCancel: () => {},
                          })
                        }
                      >
                        ลบ
                      </button>
                    </div>
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
                      name="Reorder_Point"
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
                className="btn ml-auto bg-gray-300 hover:bg-yellow-300"
                disabled={!curProduct.Product_ID ? true : false}
                onClick={(e) => {
                  if (validate()) {
                    if (!isNaN(Number(curProduct.Product_ID))) {
                      saveEditItem();
                      return;
                    }
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
              <button
                className="btn bg-gray-300 hover:bg-red-300"
                disabled={!curProduct.Product_ID ? true : false}
                onClick={() => {
                  setSelectedProduct(emptyProduct);
                  // setCurProduct(emptyProduct);
                }}
              >
                ยกเลิก
              </button>
            </div>
            <div className="container mx-auto p-4">
              <div className="flex border-b">
                <button
                  onClick={() => handleTabChange("tab1")}
                  className={`p-2 ${
                    activeTab === "tab1" ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  สินค้าทั้งหมด
                </button>
                <button
                  onClick={() => handleTabChange("tab2")}
                  className={`p-2 ${
                    activeTab === "tab2" ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  สินค้าที่ไม่มีหมวดหมู่
                </button>
              </div>
              <div className="mt-4">
                {activeTab === "tab1" && (
                  <>
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
                      {productsNormal.length == 0 ? (
                        <p>ไม่พบสินค้า</p>
                      ) : (
                        <>
                          {ShowProductsNormal.map((e, index) => (
                            <div key={e.Product_ID}>
                              <AdminProduct
                                key={e.Product_ID + 1}
                                product={e}
                                setSelectedProduct={setSelectedProduct}
                                isGray={index % 2 == 0}
                                setProducts={setProducts}
                              />
                            </div>
                          ))}
                        </>
                      )}
                      <Paginate
                        items={productsNormal}
                        itemsPerPage={4}
                        setShow={setShowProductsNormal}
                      ></Paginate>
                    </div>
                  </>
                )}
                {activeTab === "tab2" && (
                  <>
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
                      {productsWithoutCategory.length == 0 ? (
                        <p>ไม่พบสินค้า</p>
                      ) : (
                        <>
                          {ShowProductsWithoutCategory.map((e, index) => (
                            <div key={e.Product_ID}>
                              <AdminProduct
                                key={e.Product_ID + 1}
                                product={e}
                                setSelectedProduct={setSelectedProduct}
                                isGray={index % 2 == 0}
                                setProducts={setProducts}
                              />
                            </div>
                          ))}
                        </>
                      )}
                      <Paginate
                        items={productsWithoutCategory}
                        itemsPerPage={4}
                        setShow={setShowProductsWithoutCategory}
                      ></Paginate>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
