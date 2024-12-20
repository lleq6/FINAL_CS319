import Image from "next/image";
import { FaFacebookSquare, FaLine } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bottom bottom-0 bg-yellow-300 w-full py-8">
      <div className="grid grid-cols-4 text-center">
        <div className="mx-auto">
        </div>
        <div className="mx-auto">
          <h1>เมนู</h1>
          <ul className="mt-5">
            <li>
              <a>สินค้าลดราคา</a>
            </li>
            <li>
              <a>โปรโมชั่น</a>
            </li>
            <li>
              <a>ข่าวสาร</a>
            </li>
            <li>
              <a>แคทตาล็อก</a>
            </li>
            <li>
              <a>ติดต่อเรา</a>
            </li>
          </ul>
        </div>
        <div>
          <h1>บัญชี</h1>
          <ul className="mt-5">
            <li>บัญชีของฉัน</li>
            <li>รายการโปรด</li>
            <li>ประวัติการซื้อ</li>
            <li>ที่อยู่</li>
          </ul>
        </div>
        <div className="text-center mx-auto">
          <h1>ติดตามเราที่</h1>
        </div>
      </div>
      <h3 className="text-center text-xl">
        Copyright © 2024 ...... Designed by .......
      </h3>
    </footer>
  );
};

export default Footer;