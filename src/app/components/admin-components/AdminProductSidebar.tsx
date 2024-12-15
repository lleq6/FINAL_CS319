import { ProductInfo } from "@/app/model/Product";
import { useState } from "react";

interface Props {
  Products: ProductInfo[];
  setProducts: (e: any) => void;
}

export default function AdminProductSidebar({
  Products,
  setProducts,
}: Props) {
  const [selectSearch, setSelectSearch] = useState(0);
  const [status, setStatus] = useState(0);
  const [keyword, setKeyword] = useState("");

  function search() {
    let result = Products;
    if (selectSearch) {
      result = result.filter((e) =>
        e[selectSearch].toString().includes(keyword)
      );
    }
    if (status) {
      if (status == 1) {
        result = result.filter((e) => e.Quantity > e.Reorder_Point);
      } else if (status === 2) {
        result = result.filter((e) => e.Quantity < e.Reorder_Point);
      } else if (status === 3) {
        result = result.filter((e) => e.Quantity == 0);
      }
    }
    setProducts(result);
  }
  return (
    <div className="bg-gray-300 w-full">
      <div className="sticky top-0 z-0">
        <label className="form-control w-full max-w-xs mx-1">
          <div className="label">
            <span className="label-text -z-10">ค้นหาโดย</span>
          </div>
          <select
            value={selectSearch}
            onChange={(e: any) => setSelectSearch(e.target.value)}
            className="select w-11/12"
          >
            <option value={0} disabled>
              - เลือก -
            </option>
            <option value={"Product_ID"}>รหัสสินค้า</option>
            <option value={"Name"}>ชื่อ</option>
            <option value={"Brand"}>ยี่ห้อ</option>
            <option value={"c_name"}>ประเภท</option>
            <option value={"s_name"}>หมวดหมู่</option>
            <option value={"cc_name"}>หมวดหมู่ย่อย</option>
          </select>
        </label>
        <label className="form-control w-full max-w-xs mx-1">
          <div className="label">
            <span className="label-text">สถานะ</span>
          </div>
          <select
            className="select select-bordered w-11/12"
            name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
          >
            <option value={0}>ทั้งหมด</option>
            <option value={1}>ปกติ</option>
            <option value={2}>สินค้าต่ำกว่าจุดสั่งซื้อ</option>
            <option value={3}>สินค้าหมด</option>
          </select>
        </label>
        <label className="form-control w-full max-w-xs mx-1">
          <div className="label">
            <span className="label-text">คำค้นหา</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-11/12"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <div className="text-center my-5 space-x-4">
          <button
            className="btn"
            onClick={search}
            // disabled={!selectSearch ? true : false}
          >
            ค้นหา
          </button>
          <button
            className="btn"
            onClick={() => {
              setSelectSearch(0);
              setStatus(0);
              setKeyword("");
              setProducts(Products);
            }}
            // disabled={!selectSearch ? true : false}
          >
            ล้าง
          </button>
        </div>
      </div>
    </div>
  );
}
