import { FaEdit, FaTrash } from "react-icons/fa";
import AddressEditModal from "./AddressAddedModal";
import { UserAddress } from "@/app/model/AddressModel";
import { SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
interface AddressModalProps { userAddresses: UserAddress[]; }
export default function AddressModal( { userAddresses, setAddresses, setCurAddress } ){
    const [address,setAddress] = useState<UserAddress | boolean>(false)
    // const [addressList, setAddressList] = useState<UserAddress[]>([])
    const session = useSession()
    function AddressBox( { address, setCurAddress } : {address:UserAddress}){
        return (
            <div className={`grid grid-cols-[9fr_1fr] border border-1 rounded-lg p-2 my-2 content-center hover:border-green-500 ${address.Is_Default? 'border-green-500 border-2':''}`} onClick={()=>{
                setCurAddress(address)
                setAddresses(old=>old.map((e : UserAddress)=>{
                    if(e.Address_ID == address.Address_ID){
                        e.Is_Default=true
                    }else{
                        e.Is_Default=false
                    }
                    // console.log(userAddresses)
                    return e
                }))
                
            }}>
                <dialog id={`del${address.Address_ID}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-600">คุณต้องการลบที่อยู่?</h3>
                    <p className="py-4">คุณต้องการลบที่อยู่นี้ใช้หรือไม่</p>
                    <p className="">{address.Address_1} {address.Address_2} {}</p>
                    <p className="">{address.District} {address.Sub_District} {address.Province}</p>
                    <div className="modal-action">
                    <form method="dialog" className="flex space-x-5">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn bg-red-500 px-5" onClick={async()=>{
                            try {
                                const response = await fetch('/api/user/deleteAddress',{method:'POST', body: JSON.stringify({Address_ID: address.Address_ID})})
                                
                            } catch (error) {
                                
                            }
                            setAddresses(old => old.filter((e) => e.Address_ID != address.Address_ID))
                        }}>ลบ</button>
                        <button className="btn">ปิด</button>
                    </form>
                    </div>
                </div>
                </dialog>
            <div className="">
                <p>{address.Address_1}</p>
                <p>{address.Address_2}a</p>
                <p>{address.District} {address.Sub_District} {address.Province} {address.Zip_Code}</p>
                <p>ติดต่อ : {address.Phone}</p>
            </div>
            <div className="flex flex-col content-center">
            <a className="link link-hover flex text-end my-auto mx-3"
            onClick={()=>{
                setAddress({
                    User_ID: address.User_ID,
                    Address_ID:address.Address_ID,
                    Address_1: address.Address_1,
                    Address_2: address.Address_2? address.Address_2: '',
                    Province: address.Province,
                    District: address.District,
                    Sub_District: address.Sub_District,
                    Zip_Code: address.Zip_Code,
                    Phone: address.Phone,
                    Is_Default: address.Is_Default
                })
                document.getElementById('address-modal-edit').showModal();
                
            }}><FaEdit className="my-auto text-xl" />แก้ไข</a>
            <a className="link link-hover flex text-end my-auto mx-3"
            onClick={()=>{
                document.getElementById(`del${address.Address_ID}`).showModal()
                }}><FaTrash className="my-auto text-xl" />ลบ</a>
                </div>
            </div>
            
        )
    }
    return(
        <div>
        
        <dialog id="address-modal-edit" className="modal">
            <AddressEditModal Address={address} setAddress={setAddress} isAddNew={true} setAddressList={setAddresses}/>
        </dialog>
        
        <dialog id="address-modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">ที่อยู่ในการจัดส่ง</h3>
            
            
            {userAddresses.map((address : UserAddress)=>{
                return <AddressBox key={address.Address_ID} address={address} setCurAddress={setCurAddress}></AddressBox>
            })}

            <div className="grid grid-cols-[9fr_1fr] border border-1 rounded-lg p-2 my-2 content-center py-5
             hover:border-green-500 hover:text-green-500 text-center"
             onClick={()=>{
                setAddress(false);
                document.getElementById('address-modal-edit').showModal()
                // console.log(userAddresses,'d')
            }
             }
             >
                <h1 className="font-bold text-base">เพิ่มที่อยู่ใหม่ +</h1>
            </div>


            <div className="modal-action sticky bottom-0">
            <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
        </div>
    )
}