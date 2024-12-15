"use client";
import { ProductInfo } from "@/app/model/Product";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import AlertModal from "../alertModal";
import { Dispatch, SetStateAction } from "react";
interface AdminProductProps {
  product: ProductInfo;
  setProduct: (product: ProductInfo) => void;
  setProducts: Dispatch<SetStateAction<ProductInfo[]>>;
  isGray: boolean;
  showAlert: (alert : alertModal) => void;
}

interface alertModal {
  header: string;
  message: string;
  errorStatus: boolean;
  callback?: () => void | undefined;
}


const ImageWithCheck = ({ src , alt, height, width } : {src:string, alt:string, height:number, width:number}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [src]);

  return imageLoaded && src ? (
    <Image src={src} alt={alt} height={height} width={width} />
  ) : (
    <div className="flex m-auto w-[150px] h-[150px] bg-gray-300">
      <p className="m-auto text-center">ไม่สามารถแสดงภาพ...</p>
    </div>
  );
};

function checkProduct(product: ProductInfo) {}
export default function AdminProduct({
  product,
  setProduct,
  isGray,
  setProducts,
  showAlert,
}: AdminProductProps) {
  const [alert, setAlert] = useState<alertModal>({
    header: "แจ้งเตือน!",
    message: "",
    errorStatus: false,
    callback: () => {},
  });
  function setAlertt(
    alert: {
      header: string;
      message: string;
      errorStatus: boolean;
      callback?: () => void;
    },
    e?: Event
  ) {
    setAlert(alert);
  }

  useEffect(() => {
    if (alert.message != "") {
      console.log(alert);
      (
        document.getElementById("alertModalProduct") as HTMLDialogElement
      ).showModal();
    }
  }, [alert]);

  return (
    <div className={`${isGray ? "bg-yellow-100" : ""} w-full`}>
      {/* dialog */}
      <AlertModal
        id="alertModalProduct"
        header={alert.header}
        message={alert.message}
        errorStatus={alert.errorStatus}
        callback={alert.callback}
      />
      <dialog id={`deleteModal${product.Product_ID}`} className="modal">
        <div className="modal-box">
          <div className="flex">
            <MdErrorOutline className="text-red-800 my-auto mr-3 text-[2rem] -p-2" />
            <h3 className="font-bold text-lg">แจ้งเตือนสำคัญ!</h3>
          </div>
          <p className="py-4">
            คุณต้องการที่จะลบสินค้ารหัส : {product.Product_ID} ใช่หรือไม่?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const response = await fetch("/api/admin/deleteProduct", {
                      method: "POST",
                      body: JSON.stringify({
                        Product_ID: product.Product_ID,
                      }),
                    });
                    if (!response.ok) {
                      showAlert({
                        ...alert,
                        message: `การลบสินค้าผิดพลาดรหัสสินค้า : ${product.Product_ID}`,
                        errorStatus: true,
                      });
                      throw new Error("error");
                    }

                    showAlert({
                      header: "แจ้งลบสินค้า",
                      message: `ลบสินค้ารหัส : ${product.Product_ID} เรียบร้อยแล้ว `,
                      errorStatus: false,
                    });
                    setProducts((products: ProductInfo[]) =>
                      products.filter((e) => e.Product_ID != product.Product_ID)
                    );
                  } catch (error) {
                    showAlert({
                      ...alert,
                      message: `การลบสินค้าผิดพลาด รหัสสินค้า : ${product.Product_ID}`,
                      errorStatus: true,
                    });
                  }
                }}
              >
                ลบ
              </button>
              <button
                className="btn"
                onClick={() =>
                  (document
                    .getElementById(`deleteModal${product.Product_ID}`) as HTMLDialogElement)
                    .close()
                }
              >
                ยกเลิก
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="mx-2 pt-2 grid grid-cols-[2fr_1fr_4fr_2fr_2fr_1fr_1fr] divide-x-2 text-center">
        <div
          className=" text-center content-center w-[150px] h-[150px]"
          style={{}}
        >
          <div className="my-auto">
            <ImageWithCheck
              alt={product.Name}
              src={product.Image_URL}
              width={150}
              height={150}
            ></ImageWithCheck>
          </div>
        </div>
        <div className="m-auto h-full w-full  flex text-center mx-2">
          <p className="m-auto text-center">{product.Product_ID}</p>
        </div>
        <div className="m-auto h-full w-full  flex text-center">
          <p className="m-auto text-center">{product.Name}</p>
        </div>
        <div className="m-auto h-full w-full  flex text-center">
          <p className="m-auto text-center">{product.cc_name}</p>
        </div>
        <div className="m-auto h-full w-full  flex text-center">
          <p className="m-auto text-center">
            {product.Sale_Price.toFixed(2)}/{product.Unit}
          </p>
        </div>
        <div className="m-auto h-full w-full  flex text-center">
          <p className="m-auto text-center">{product.Quantity}</p>
        </div>
        <div className="m-auto h-full w-full  flex text-center">
          <p className="m-auto text-center">{product.Reorder_Point}</p>
        </div>
      </div>
      <hr className="h-px my-2 bg-gray-300 border-0 "></hr>
      <div className="text-end -m-[2px] mt-1 flex justify-end max-h-16 pb-3">
        <p className="my-auto text-md mx-2">
          สถานะ :
          {product.Quantity > product.Reorder_Point ? (
            <span className="text-green-800">ปกติ</span>
          ) : (
            <>
              {product.Quantity != 0 ? (
                <span className="text-warning">สินค้าใกล้หมด</span>
              ) : (
                <span className="text-red-800">สินค้าหมด</span>
              )}
            </>
          )}
        </p>
        <button
          className="btn btn-sm text-md mx-2 p-1 px-2 w-20 hover:bg-amber-300"
          onClick={() => setProduct(product)}
        >
          {" "}
          <FaEdit />
          แก้ไข
        </button>
        <button
          className="btn btn-sm text-md p-1 mx-2 px-2 w-20 hover:bg-red-300 hover:text-red-600"
          onClick={async () => {
            (document
              .getElementById(`deleteModal${product.Product_ID}`) as HTMLDialogElement)
              .showModal();
          }}
        >
          {" "}
          <FaTrash />
          ลบ
        </button>
      </div>
    </div>
  );
}
