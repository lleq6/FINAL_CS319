"use client";
import ImageWithCheck from "@/app/components/ImageWithCheck";
import { ProductInfo } from "@/app/model/Product";
import { useEffect, useState } from "react";

export default function AdmindashBoard() {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  useEffect(() => {
    const request = async () => {
      const response = await fetch("/api/admin/dashboard");
      const data: ProductInfo[] = await response.json();
      setProducts(data);
    };
    request();
  }, []);

  return (
    <div>
      <div className="mt-5">
        <div className="w-10/12 m-auto">
        <h1 className="absolute">สินค้าต่ำกว่ากำหนด</h1>
        <h1 className="text-end text-xl">จำนวน : {products.length}</h1>
          <div className="mx-2 my-3 grid grid-cols-[2fr_1fr_4fr_2fr_2fr_2fr] divide-x-2 text-center pr-6">
            <p>รูปภาพ</p>
            <p>รหัสสินค้า</p>
            <p>ชื่อสินค้า</p>
            <p>จำนวนคงเหลือ</p>
            <p>จุดสั่งซื้อ</p>
            <p>asd</p>
          </div>
          <div className="max-h-[500px] overflow-y-auto w-full pr-3">
            {products.length == 0 ? 'ไม่พบสินค้า' : <>
            {products.map((e: ProductInfo, _index) => (
              <DashBoardProduct key={_index} product={e} index={_index} />
            ))}
            </>
            }
            {/* <DashBoardProduct></DashBoardProduct> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashBoardProduct({ product, index }: { product: ProductInfo , index: number }) {
  return (
    <div className={`${index%2==0? 'bg-gray-200' : ''} m-2 my-3 grid grid-cols-[2fr_1fr_4fr_2fr_2fr_2fr] divide-x-2 text-center`}>
      <ImageWithCheck
        alt={product.Name}
        src={product.Image_URL}
        width={120}
        height={120}
      />
      <p className="text-center m-auto">{product.Product_ID}</p>
      <p className="text-center m-auto">{product.Name}</p>
      <p className="text-center m-auto">{product.Quantity}</p>
      <p className="text-center m-auto">{product.Reorder_Point}</p>
      <div className="m-auto">
      </div>
    </div>

  );
}
