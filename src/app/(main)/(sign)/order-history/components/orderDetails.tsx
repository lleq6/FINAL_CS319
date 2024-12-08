import Image from "next/image";

export default function OrderDetail(){
    function Product(){
        return(
            <div className={`grid w-full grid-cols-[8fr_2fr] ${'bg-slate-200'} [&>p]:mx-2`}>
            <p className="content-center">ชื่อสินค้า</p>
            <div className="">
                <p className="text-center">x 2 </p>
                <p className="text-center">100</p>
            </div>
        </div>
        )
    }
    return(
        <div className="grid grid-cols-[2fr_7fr_1fr_1.5fr_1fr] w-full text-center content-center m-auto [&>.cp]:m-auto [&>p]:content-center my-2">
        <Image src="/product.jpg" alt="test" width={100} height={0} className="mx-auto"/>

        <div className="h-[150px] overflow-y-scroll text-start row-span-2">
        <div className="grid w-full grid-cols-[8fr_2fr] text-sm my-2">
            <p className="content-center"></p>
            <div>
                <p className="text-center">คำสั่งซื้อทั้งหมด {16} ชิ้น</p>
            </div>
        </div>
            
        <Product/>
        <Product/>
        <Product/>
        
        </div>
        <p className="cp">12/12/2000</p>
        <div className="join text-center m-auto">
            <p className="text-green-700">จัดส่งเรียบร้อย</p>
        </div>
        <p className="cp">10000</p>
        <div className="w-full col-start-4">
            <button className="btn btn-sm m-2 text-end">ตรวจสอบ</button>
        </div>
        <hr className="h-px my-3 bg-gray-200 border-0 bg-slate-200 col-start-1 col-end-6"></hr>
    </div>
    )
}