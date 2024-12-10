import { ProductInfo } from "@/app/model/Product";
import Image from "next/image";

interface AdminProductProps {
  product: ProductInfo;
  setProduct: (product : ProductInfo)=> void
}
export default function AdminProduct({ product, setProduct }: AdminProductProps) {

  return (
    <div className="">
      <div className="mx-2 grid grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr_1fr] divide-x-2 text-center">
        <div
          className="bg-green-500 text-center content-center w-full"
          style={{}}
        >
          <p className="my-auto">
            {!(product.Image_URL == "") ?
            <Image
              alt={product.Name}
              src={product.Image_URL}
              width={500}
              height={500}
            ></Image>
            :
            <p className="w-[150px] h-[150px]">URL NOT FOUND</p>
            }
          </p>
        </div>
        <div className="m-auto h-full w-full bg-red-300 flex text-center mx-2">
          <p className="m-auto text-center">{product.Product_ID}</p>
        </div>
        <div className="m-auto h-full w-full bg-red-300 flex text-center">
          <p className="m-auto text-center">{product.Name}</p>
        </div>
        <div className="m-auto h-full w-full bg-red-300 flex text-center">
          <p className="m-auto text-center">หมวดหมู่</p>
        </div>
        <div className="m-auto h-full w-full bg-red-300 flex text-center">
          <p className="m-auto text-center">หมวดหมู่รอง</p>
        </div>
        <div className="m-auto h-full w-full bg-red-300 flex text-center">
          <p className="m-auto text-center">599</p>
        </div>
        <div className="m-auto h-full w-full bg-red-300 flex text-center">
          <p className="m-auto text-center">0</p>
        </div>
      </div>
      <div className="text-end mx-5 flex justify-end">
        <p className="my-auto text-lg mx-2">
          สถานะ : <span className="text-green-800">ปกติ</span>
        </p>
        <button className="btn rounded-lg bg-red-500 text-lg m-2 p-1 px-2 w-28" onClick={()=>setProduct(product)}>
          {" "}
          แก้ไข
        </button>
        <button className="btn bg-red-500 text-lg m-2 p-1 px-2 w-28">
          {" "}
          ลบ
        </button>
      </div>
    </div>
  );
}
