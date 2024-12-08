export default function AdminUserSidebar(){
    return(
        <div>
            <label className="form-control w-full max-w-xs mx-1">
                <div className="label"><span className="label-text">สถานะ</span></div>
                {/* <input type="text" placeholder="Type here" className="input input-bordered w-11/12" /> */}
                <select className="select select-bordered w-11/12" name="status" id="status">
                    <option value={0}>UID</option>
                    <option value={1}>ชื่อ</option>
                    <option value={2}>เบอร์โทรศัพท์</option>
                    <option value={3}>อีเมลล์</option>
                </select>
            </label>

            <label className="form-control w-full max-w-xs mx-1">
                <div className="label"><span className="label-text">คำค้นหา</span></div>
                <input type="text" placeholder="Type here" className="input input-bordered w-11/12" />
            </label>

            <div className="text-center my-5">
                <button className="btn">ค้นหา</button>
            </div>


        </div>
    )
}