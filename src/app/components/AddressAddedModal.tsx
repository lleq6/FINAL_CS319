import { useEffect, useState } from "react";
import UserAddress from "@/app/model/AddressModel";
import ProvinceSelector from "./ProvinceSelector";

interface AddressEditModalProps {
  UserID: string;
  Address: UserAddress | false;
  setAddress: (address: UserAddress) => void;
  setAddressList: (address: UserAddress) => void;
}

export default function AddressEditModal({
  UserID,
  Address,
  setAddress,
  setAddressList,
}: AddressEditModalProps) {
  const [localAddress, setLocalAddress] = useState<UserAddress>(
    Address || {
      User_ID: UserID,
      Address_ID: "",
      Address_1: "",
      Address_2: "",
      Province: "",
      District: "",
      Sub_District: "",
      Zip_Code: "",
      Phone: "",
      Is_Default: true,
    }
  );

  useEffect(() => {
    if (Address) {
      setLocalAddress(Address);
      console.log(Address, "local");
    }
    if (!Address) {
      setLocalAddress({
        User_ID: UserID,
        Address_ID: "",
        Address_1: "",
        Address_2: "",
        Province: "",
        District: "",
        Sub_District: "",
        Zip_Code: "",
        Phone: "",
        Is_Default: false,
      });
      console.log("setlocal");
    }
    console.log("local");
  }, [Address]);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setLocalAddress({
      ...localAddress,
      [name]: value,
    });
  }

  function addHandler(e: SubmitEvent) {
    e.preventDefault();
    async function Add() {
      const response = await fetch("/api/user/addAddress", {
        method: "POST",
        body: JSON.stringify(localAddress),
      });
      // console.log('adr-'+generateOrderId())
      // console.log(addres)
      if (response.ok) {
        const { Address_ID } = await response.json();
        setAddressList((old) => [
          ...old,
          { ...localAddress, Address_ID: Address_ID },
        ]);
        setAddress(localAddress);
        alert("เพิ่มที่อยู่สำเร็จ");
        return;
      }
      alert("เกิดข้อผิดพลาดในการเพิ่มที่อยู่");
    }
    if (!Address) {
      Add();
    }
    // console.log(localAddress)
    document.getElementById("address-modal-edit").close();
  }
  function editHandler(e: SubmitEvent) {
    e.preventDefault();
    async function Edit() {
      const response = await fetch("/api/user/editAddress", {
        method: "POST",
        body: JSON.stringify(localAddress),
      });
      if (response.ok) {
        setAddressList((old) =>
          old.map((e: UserAddress) => {
            if (e.Address_ID == localAddress.Address_ID) {
              // e = localAddress
              return localAddress;
            }
            return e;
          })
        );
        alert("แก้ไขสำเร็จ");
        return;
      }
      alert("เกิดข้อผิดพลาดในการแก้ไขที่อยู่");
    }
    Edit();
    console.log(localAddress);
    document.getElementById("address-modal-edit").close();
  }

  return (
    <div className="modal-box w-11/12 max-w-4xl [&>lebel]:mx-auto">
      {!Address ? (
        <h3 className="font-bold text-lg">เพิ่มที่อยู่ใหม่</h3>
      ) : (
        <h3 className="font-bold text-lg">แก้ไขที่อยู่</h3>
      )}

      <label className="form-control w-full max-w-[35rem] m-auto">
        <div className="label">
          <span className="label-text">ที่อยู่ 1</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-11/12"
          name="Address_1"
          value={localAddress.Address_1}
          onChange={handleChange}
        />
      </label>

      <label className="form-control w-full max-w-[35rem] m-auto">
        <div className="label">
          <span className="label-text">ที่อยู่ 2</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-11/12"
          name="Address_2"
          value={localAddress.Address_2}
          onChange={handleChange}
        />
      </label>

      <label className="form-control w-full max-w-[34rem] mx-auto">
        <ProvinceSelector
          address={localAddress}
          setAddress={setLocalAddress}
        ></ProvinceSelector>
      </label>

      <div className="flex space-x-3 max-w-[34rem] mx-auto">
        <label className="form-control w-full mx-auto ">
          <div className="label">
            <span className="label-text">รหัสไปรษณีย์</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-11/12"
            name="Zip_Code"
            value={localAddress.Zip_Code}
            onChange={handleChange}
          />
        </label>
        <label className="form-control w-full mx-auto">
          <div className="label">
            <span className="label-text">เบอร์โทร</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-11/12"
            name="Phone"
            value={localAddress.Phone}
            onChange={handleChange}
          />
        </label>
      </div>

      {Address ? (
        <form onSubmit={editHandler}>
          <div className="modal-action">
            <button className="btn" type="submit">
              บันทึกการแก้ไข
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={addHandler}>
          <div className="modal-action">
            <button className="btn" type="submit">
              เพิ่มที่อยู่ใหม่
            </button>
          </div>
        </form>
      )}
      <form method="dialog">
        <button className="btn" type="submit">
          Close
        </button>
      </form>
    </div>
  );
}
