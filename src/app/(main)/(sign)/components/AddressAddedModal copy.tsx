import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { UserAddress } from "@/app/model/AddressModel";
import ProvinceSelector from "./ProvinceSelector";

interface userAddress {
    Address: UserAddress| false
}



export default function AddressEditModal( { Address, setAddress }){
    // const [address, setAddress] = useState<UserAddress>(Address)

    function handlerChange(e){
        const {name, value} = e.target
        setAddress({
            ...Address,
            [name] : value
        })
    }
    useEffect(()=>{
        // setAddress(Address)
        if(Address){
            console.log(Address)
            setAddress(Address)
        }else{
            setAddress({
                User_ID: '',
                Address_ID:'',
                Address_1: '',
                Address_2: '',
                Province: '',
                District: '',
                Sub_District: '',
                Zip_Code: '',
                Phone: '',
                Is_Default: true,

            })
        }
        console.log(Address)
    },[Address])

    function addHandler(e : SubmitEvent){
        e.preventDefault()
        console.log(Address)
        document.getElementById('address-modal-edit').close()

    }

    return(
        <div className="modal-box w-11/12 max-w-4xl [&>lebel]:mx-auto">
            {!Address?
            <h3 className="font-bold text-lg">เพิ่มที่อยู่ใหม่</h3>:
            <h3 className="font-bold text-lg">แก้ไขที่อยู่</h3>
            
            }

            {/* <label className="form-control w-full max-w-xs mx-1">
                <div className="label"><span className="label-text">เลขที่</span></div>
                <input type="text" placeholder="Type here" className="input input-bordered w-11/12"/>
            </label> */}

            <label className="form-control w-full max-w-[35rem] m-auto">
                <div className="label"><span className="label-text">ที่อยู่ 1</span></div>
                <input type="text" placeholder="Type here" className="input input-bordered w-11/12" 
                name='Address_1' value={Address.Address_1} onChange={(e)=>handlerChange(e)}/>
            </label>

            <label className="form-control w-full max-w-[35rem] m-auto">
                <div className="label"><span className="label-text">ที่อยู่ 2</span></div>
                <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                name='Address_2' value={Address.Address_2} onChange={(e)=>handlerChange(e)}/>
            </label>
            
            <label className="form-control w-full max-w-[34rem] mx-auto">
                {/* <div className="label"><span className="label-text">จังหวัด</span></div> */}
                {/* <select className="select select-bordered w-full max-w-xs"> */}
                {/* {getAllProvinces} */}
                {/* </select> */}
                <ProvinceSelector address={Address} setAddress={setAddress}></ProvinceSelector>
            </label>
            <div className="flex space-x-3 max-w-[34rem] mx-auto">

            <label className="form-control w-full mx-auto ">
                <div className="label"><span className="label-text">รหัสไปรษณีย์</span></div>
                <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                name='Zip_Code' value={Address.Zip_Code} onChange={(e)=>handlerChange(e)}/>
            </label>
            <label className="form-control w-full mx-auto">
                <div className="label"><span className="label-text">เบอร์โทร</span></div>
                <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                name='Phone' value={Address.Phone} onChange={(e)=>handlerChange(e)}/>
            </label>
            </div>
            <form onSubmit={addHandler}>
            <div className="modal-action">
                <button className="btn" type="submit">D</button>
            </div>
            </form>
                <button className="btn">Close</button>
        </div>
    )
}