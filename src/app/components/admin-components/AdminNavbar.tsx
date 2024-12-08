import Image from "next/image";
import Link from "next/link";
import { FaLine, FaFacebookSquare, FaSearch} from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";

export default function AdminNavbar() {
    return (
        <nav className="bg-gray-200">
        <div className="px-14">
        <div className="flex">
            <p className="content-center mx-auto">เรื่องบ้านต้อง คชาโฮม ถูก ครบ จบที่เดียว</p>
            <div className="flex mx-auto">
                <span className="flex pl-5 pr-5 text-center"><FaLine className="text-4xl text-green-600"/> <p className="content-center">kacha982</p></span>
                <span className="flex pl-5 pr-5 text-center"><FaFacebookSquare className="text-4xl text-blue-700"/> <p className="content-center">บริษัท คชาโฮม จำกัด</p></span>
            </div>
            <span className="mx-auto content-center">ติดต่อเรา</span>
        </div>
        <div className="flex content-center">
            <Image src={"/kacha-icon.png"} alt="test" width={80} height={80}></Image>
            <div className="flex bg-gray-300 rounded-full px-5 m-auto content-center text-center my-5 w-9/12">
                <FaSearch className="text-2xl my-auto mr-2"/>
                <input placeholder="ค้นหาสินค้า" className="h-8 my-auto bg-gray-300"></input>
            </div>
            <div className="flex content-center">
                <a className="content-center px-2">ล็อคอิน / สมัครสมาชิก</a>
                <GoTriangleDown className="my-auto"></GoTriangleDown>
            </div>
            
        </div>
        <div className="navbar min-h-0 p-0">
        <div className="flex-none mt-0">
            <ul className="menu menu-horizontal px-1 p-0">
            <li className="">
                <details className="">
                <summary className="rounded-none p-4"><Link href={'/admin'}>หน้าหลัก</Link></summary>
                <ul className="bg-red-500 rounded-t-none p-2">
                    <li><a>Link 1</a></li>
                    <li><a>Link 2</a></li>
                </ul>
                </details>
            </li>
            <li><a className="rounded-none p-4">จัดการสมาชิก</a></li>
            <li><a className="rounded-none p-4">จัดการคลังสินค้า</a></li>
            <li><a className="rounded-none p-4">จัดการคำสั่งซื้อ</a></li>
            </ul>
        </div>
        </div>
        </div>
    </nav>
    )
}