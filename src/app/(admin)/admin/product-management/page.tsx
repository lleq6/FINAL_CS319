'use client'
import AdminProduct from "@/app/components/admin-components/AdminProduct";
import AdminProductSidebar from "@/app/components/admin-components/AdminProductSidebar";
import Product from "@/app/components/Product";

export default function productManagement(){
<<<<<<< HEAD
    useEffect(async()=>{
        try {
            const data = await fetch('api/products/allProduct')
        } catch (error) {
            
        }
    })
=======
>>>>>>> 8c1ebf8b73ad8290fee41aac5e0141c4c28ffe1f
    return(
        <div className="">
        <div className="pl-5">
            <h1>จัดการคลังสินค้า</h1>
        </div>
        <div className="grid grid-cols-7 pl-5 pr-5">
            <AdminProductSidebar/>
            <div className="col-span-5 m-2">

                <div className="grid grid-rows-4 mx-a">
                    <AdminProduct/>
                    <AdminProduct/>
                    <AdminProduct/>
                    <AdminProduct/>
                </div>
                <div>
                    <h1>รายละเอียดสินค้า</h1>
                    <div className="flex">
                        <div className="m-4 text-center">
                            <div className='bg-green-500 text-center content-center w-[150px] h-[150px]' style={{}}><p className="my-auto">นี่คือรูปจำลอง</p></div>
                            <button className="btn my-2">อัพโหลดรูปภาพ...</button>

                        </div>
                        <div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label"><span className="label-text">รหัสสินค้า</span></div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label"><span className="label-text">ชื่อสินค้า</span></div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
                            </label>

                            <div className="flex">
                                <label className="form-control w-full max-w-xs mx-1">
                                    <div className="label"><span className="label-text">หมวดหมู่</span></div>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs mx-1">
                                    <div className="label"><span className="label-text">หมวดหมู่รอง</span></div>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </label>
                            </div>

                            <div className="flex">
                                <label className="form-control w-full max-w-32 mx-2">
                                    <div className="label"><span className="label-text">ราคา</span></div>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-320" />
                                </label>
                                <label className="form-control w-full max-w-32 mx-2">
                                    <div className="label"><span className="label-text">จำนวน</span></div>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-32" />
                                </label>
                                <label className="form-control w-full max-w-32 mx-2">
                                    <div className="label"><span className="label-text">ลดราคา</span></div>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-32" />
                                </label>
                                
                            </div>     
                        </div>
                    </div>

                    <h1>คำอธิบายสินค้า</h1>
                    <textarea className="mx-2 textarea textarea-bordered w-8/12 h-32"></textarea>
                    <div>
                        <button className="btn">asd</button>
                        <button className="btn">asd</button>
                        <button className="btn">asd</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )

}