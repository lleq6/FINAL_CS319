"use client";
import { ProductInfo } from "@/app/model/Product";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
interface AdminProductProps {
  product: ProductInfo;
  setProduct: (product: ProductInfo) => void;
  setProducts: (product: ProductInfo[]) => void;
  isGray: boolean;
}
const ImageWithCheck = ({ src, alt, height, width }) => {
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
}: AdminProductProps) {
  return (
    <div className={`${isGray ? "bg-yellow-100" : ""} w-full`}>
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
            const status = confirm(`คุณต้องการจะลบสินค้า
              \nรหัสสินค้า : ${product.Product_ID}
              \nชื่อ : ${product.Name}`);
            if (status) {
              try {
                const response = await fetch("/api/admin/deleteProduct",{
                  method:'POST',
                  body: JSON.stringify({
                    Product_ID : product.Product_ID,
                  })
                });
                if (!response.ok) {
                  alert("การลบสินค้าผิดพลาด");
                  throw new Error("error");
                }

                setProducts((products : ProductInfo[]) => products.filter(e => e.Product_ID != product.Product_ID))
                alert("ลบสินค้าเรียบร้อย");
              } catch (error) {
                alert("การลบสินค้าผิดพลาด");
              }
            }
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
