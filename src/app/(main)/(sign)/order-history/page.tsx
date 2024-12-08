'use client'
import Image from "next/image";
import OrderDetail from "./components/orderDetails";
import OrderDetailsModal from "./components/orderDetailsModal";

export default function orderHistory(){

    return(
        <div>
            <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
            <dialog id="my_modal_5" className="modal modal-middle">
                <OrderDetailsModal/>
            </dialog>
            <div className="flex text-center content-center">
                <div className="grid grid-cols-[2fr_7fr_1fr_1.5fr_1fr] w-full text-center">
                    <p>ประวัติการสั่งซือ</p>
                    <p className="text-start">รายการสินค้า</p>
                    <p>วันที่</p>
                    <p>สถานะ</p>
                    <p>ราคารวม</p>
                </div>
            </div>
            <div className="border border-1 rounded-lg p-2 my-2 content-center ">
                <OrderDetail/>
                <OrderDetail/>
                <OrderDetail/>
            </div>
        </div>
    )
}