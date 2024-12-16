import Image from "next/image";
import { FaFacebookSquare, FaLine } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bottom bottom-0 bg-yellow-300 w-full py-8">
      <div className="grid grid-cols-4 text-center">
        <div className="mx-auto">
          <Image
            className="mx-auto"
            src={"/kacha-icon.png"}
            alt="test"
            width={150}
            height={150}
          ></Image>
          <p>
            982 หมู่ 2 ต.ศาลาด่าน <br /> อ.เกาะลันตา จ.กระบี่
          </p>
          <p>โทร : 019-999-9999</p>
          <span className="flex pl-5 pr-5 text-center">
            <FaLine className="text-4xl text-green-600" />{" "}
            <p className="content-center">kacha982</p>
          </span>
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
          <ul className="mt-5">
            <li>
              <span className="flex pl-5 pr-5 text-center">
                <FaFacebookSquare className="text-4xl text-blue-700" />{" "}
                <p className="content-center">บริษัท คชาโฮม จำกัด</p>
              </span>
            </li>
            <li>
              <span className="flex pl-5 pr-5 text-center">
                <FaLine className="text-4xl text-green-600" />{" "}
                <p className="content-center">kacha982</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <h3 className="text-center text-xl">
        Copyright © 2024 ...... Designed by .......
      </h3>
    </footer>
  );
};

export default Footer;