export default function AdminProductSidebar(){
    return(
        <div className="bg-slate-600">
            <label className="form-control w-full max-w-xs mx-1">
                <div className="label"><span className="label-text">คำค้นหา</span></div>
                <input type="text" placeholder="Type here" className="input input-bordered w-11/12" />
            </label>
            <label className="form-control w-full max-w-xs mx-1">
                <div className="label"><span className="label-text">รหัสสินค้า</span></div>
                <input type="text" placeholder="Type here" className="input input-bordered w-11/12" />
            </label>
            <label className="form-control w-full max-w-xs mx-1">
                <div className="label"><span className="label-text">หมวดหมู่</span></div>
                <input type="text" placeholder="Type here" className="input input-bordered w-11/12" />
            </label>
            <label className="form-control w-full max-w-xs mx-1">
                <div className="label"><span className="label-text">หมวดหมู่รอง</span></div>
                <input type="text" placeholder="Type here" className="input input-bordered w-11/12" />
            </label>
            <label className="form-control w-full max-w-xs mx-1">
                <div className="label"><span className="label-text">สถานะ</span></div>
                <select className="select select-bordered w-11/12" name="status" id="status">
                    <option value={0}>ปกติ</option>
                    <option value={1}>สินค้าต่ำกว่าจุดสั่งซื้อ</option>
                    <option value={2}>สินค้าหมด</option>
                </select>
            </label>
            <div className="text-center my-5">
                <button className="btn">ค้นหา</button>
            </div>

        </div>
    )
}