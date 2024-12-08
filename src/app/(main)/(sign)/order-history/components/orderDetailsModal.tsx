import Image from "next/image";

export default function OrderDetailsModal(){
    function Product(){
        return(
            <div className="grid grid-cols-[2fr_7fr_1fr_1.5fr_1fr] w-full text-center content-center m-auto [&>.cp]:m-auto [&>p]:content-center">
            <Image src="/product.jpg" alt="test" width={100} height={0}/>
            <p className="text-start m-0">ชื่อ</p>
            <p className="cp text-center m-auto">19,990</p>
            <button className="join-item btn btn-sm text-center m-auto w-[80%]">X 22</button>
            <p className="cp m-auto">10,000</p>
        </div>
        )
    }
    return(
        <div className="modal-box w-[70vw] max-w-4xl">
        {/* <h3 className="font-bold text-lg">Hello!</h3> */}
        <div>
    {/* <AddressModal/> */}
    <h1>ตะกร้าสินค้า</h1>

    <div className="flex text-center content-center">
        {/* <FaMapMarkerAlt className="my-auto"/> */}
        <label>ที่อยู่ในการจัดส่ง</label>
    </div>
    <div className="grid grid-cols-[9fr_1fr] border border-1 rounded-lg p-2 my-2 content-center">
        <div className="">
            <p>asd</p>
            <p>asd</p>
            <p>asd</p>
        </div>
    </div>
    <div className="flex text-center content-center">
        <div className="grid grid-cols-[2fr_7fr_1fr_1.5fr_1fr] w-full text-center m-2">
            <p>รายการสินค้า</p>
            <div></div>
            <p>ราคาต่อหน่วย</p>
            <p>จำนวน</p>
            <p>ราคารวม</p>
        </div>
    </div>
    <div className="border border-1 rounded-lg p-2 my-2 content-center ">
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        {/* <a className="link link-hover flex text-end my-auto mx-3"><FaEdit className="my-auto text-xl" />เปลี่ยน</a> */}
    </div>
    </div>

    <div className="grid grid-cols-[80%_20%] text-end text-lg"><p>รวมการสั่งซื้อ {14} ชิ้น :</p> <p className="text-yellow-600">฿ 100000</p></div>
    <div className="grid grid-cols-[70%_30%] my-auto mx-2 [&>button]:mx-2">
        <div>
        <p className="">วิธีชำระเงิน : <span>Mobile banking</span></p>
        <Image src="/product.jpg" alt="test" width={100} height={0}/>
        <p className="">สถานะ : <span className="text-orange-600">รอการชำระเงิน</span></p>
        <button className="btn">อัพโหลดหลักฐาน</button>

        </div>
        {/* <button className={`${paymentChoice ? 'btn-outline btn-primary':''} btn`} onClick={(e)=>{setpaymentChoice(true)
            console.log(paymentChoice)
        }}>mobile bank</button>
        <button className={`${!paymentChoice ? 'btn-outline btn-primary':''} btn`} onClick={(e)=>setpaymentChoice(false)}>ชำระปลายทาง</button> */}
        <div className="text-end">
            <div className="grid grid-cols-2"><p>รวมการสั่งซื้อ</p> <p>฿ 100000</p></div>
            <div className="grid grid-cols-2"><p>การจัดส่ง</p> <p>฿ 100000</p></div>
            <div className="grid grid-cols-2"><p>ยอดชำระ</p> <p className="font-bold text-yellow-600 text-xl">฿ 100,000</p></div>
            <button className="btn">สั่งซื้อ</button>
        </div>
    </div>
        <div className="modal-action">
        <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
        </form>
        </div>
    </div>
    )
}