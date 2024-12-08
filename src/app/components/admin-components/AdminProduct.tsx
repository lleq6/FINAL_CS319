export default function AdminProduct(){
    return(
        <div className="">
            <div className="mx-2 flex divide-x-2 h-[130px] text-center">
                <div className='bg-green-500 text-center content-center w-full' style={{}}><p className="my-auto">นี่คือรูปจำลอง</p></div>
                <div className="m-auto h-full w-full bg-red-300 flex text-center"><p className="my-auto text-center">SKU00000</p></div>
                <div className="m-auto h-full w-full bg-red-300 flex text-center"><p className="my-auto text-center">ชื่อสินค้า....</p></div>
                <div className="m-auto h-full w-full bg-red-300 flex text-center"><p className="my-auto text-center">หมวดหมู่</p></div>
                <div className="m-auto h-full w-full bg-red-300 flex text-center"><p className="my-auto text-center">หมวดหมู่รอง</p></div>
                <div className="m-auto h-full w-full bg-red-300 flex text-center"><p className="my-auto text-center">599</p></div>
                <div className="m-auto h-full w-full bg-red-300 flex text-center"><p className="my-auto text-center">0</p></div>
            </div>
            <div className="text-end mx-5 flex justify-end">
                <p className="my-auto text-lg mx-2">สถานะ : <span className="text-green-800">ปกติ</span></p>
                <button className="rounded-lg bg-red-500 text-lg m-2 p-1 px-2 w-28"> แก้ไข</button>
                <button className="rounded-lg bg-red-500 text-lg m-2 p-1 px-2 w-28"> ลบ</button>
            </div>

        </div>
    )
}