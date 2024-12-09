"use client";
import AdminUserSidebar from "@/app/components/admin-components/AdminUserSidebar";
import UserInfo from "@/app/model/UserInfo";
import AddressInfo from "@/app/model/AddressModel";
import React, { useEffect, useState } from "react";

interface UserTable {
  user: UserInfo;
}

export default function userManagement() {
  function AdminUserTable(props: UserTable) {
    const nameParts = props.user.Full_Name.split(" ");
    return (
      <tr>
        <td>{props.user.User_ID}</td>
        <td>{nameParts[0]}</td>
        <td>{nameParts[1]}</td>
        <td>{props.user.Email}</td>
        <td>{props.user.Phone}</td>
        <td>{props.user.Access_Level}</td>
        <td>
          <button
            className="btn bg-yellow-500"
            onClick={(e) => {
              selectUser(props.user);
            }}
          >
            แก้ไข
          </button>
        </td>
      </tr>
    );
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setCurUser({
      ...curUser,
      [name]: value,
    });
  }

  function handleAddrChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const selected = dataAddr.find((x:AddressInfo) => x.Address_ID == value);
    setCurUserAddress(
      selected || {
        Address_ID: "",
        User_ID: "",
        Address_1: "",
        Address_2: "",
        District: "",
        Province: "",
        Zip_Code: "",
        Is_Default: false,
        Sub_District: "",
        Phone: "",
      }
    );
  }

  const [curUser, setCurUser] = useState({
    User_ID: "",
    Full_Name: "",
    Email: "",
    Phone: "",
    Access_Level: "",
  });

  useEffect(() => {
    if (dataAddr) setAddrData([]);
  }, [curUser]);

  const [curUserAddr, setCurUserAddress] = useState<AddressInfo>({
    Address_ID: "",
    User_ID: "",
    Address_1: "",
    Address_2: "",
    District: "",
    Province: "",
    Zip_Code: "",
    Is_Default: false,
    Sub_District: "",
    Phone: "",
  });

  function selectUser(user: UserInfo) {
    setCurUser(user);
    setCurUserAddress({
      Address_ID: "",
      User_ID: "",
      Address_1: "",
      Address_2: "",
      District: "",
      Province: "",
      Zip_Code: "",
      Is_Default: false,
      Sub_District: "",
      Phone: "",
    });
    async function fetchData() {
      try {
        const response = await fetch(`/api/user/getAddressByUserID`, {
          method: "POST",
          body: JSON.stringify({
            UserID: user.User_ID,
          }),
        });
        if (!response.ok) throw new Error("ERROR");
        const data = await response.json();
        console.log(data);
        setAddrData(data);
      } catch (ex) {
        console.error(ex);
      }
    }
    fetchData();
  }

  const [data, setData] = useState([]);
  const [dataAddr, setAddrData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/user/GetUsers`);
        if (!response.ok) throw new Error("ERROR");
        const data = await response.json();
        setData(data);
      } catch (ex) {
        console.error(ex);
      }
    }
    fetchData();
  }, []);
  let Index = 0;
  return (
    <div className="">
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");
        `}
      </style>
      <div className="pl-5">
        <h1>จัดการคลังสินค้า</h1>
      </div>
      <div className="grid grid-cols-7 pl-5 pr-5">
        <AdminUserSidebar />
        <div className="col-span-5 m-2">
          <div>
            <h1>รายละเอียดสินค้า</h1>
            <div>
              <div className="">
                <label className="form-control w-full max-w-xs mx-1">
                  <div className="label">
                    <span className="label-text">UID</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-11/12"
                    name="Name"
                    value={curUser.User_ID}
                    onChange={handleChange}
                  />
                </label>
                <div className="flex">
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">ชื่อ</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUser.Full_Name.split(" ")[0]}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">นามสกุล</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUser.Full_Name.split(" ")[1]}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">E-mail</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUser.Email}
                    />
                  </label>
                </div>
                <div className="flex">
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">เบอร์โทรศัพท์</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUser.Phone}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">สิทธิการเข้าถึง</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUser.Access_Level}
                    />
                  </label>
                  <button className="btn self-end">เปลี่ยนรหัสผ่าน</button>
                </div>
                <button className="btn bg-green-500">เพิ่ม</button>
                <button className="btn bg-yellow-500">บันทึก</button>
                <button className="btn bg-red-500">ลบ</button>
              </div>
              <div className="">
                <label className="form-control w-full max-w-xs mx-1">
                  <div className="label">
                    <span className="label-text">ที่อยู่</span>
                  </div>
                  <select
                    name="addrlist"
                    id="addrlist"
                    className="select select-bordered"
                    onChange={handleAddrChange}
                  >
                    {dataAddr.map((x: AddressInfo) => {
                      return (
                        <option value={x.Address_ID}>
                          ที่อยู่ - {++Index}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <div className="flex">
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">ที่อยู่ : 1</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUserAddr.Address_1}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">ที่อยู่ : 2</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUserAddr.Address_2}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">ตำบล/แขวง</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUserAddr.Sub_District}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">อำเภอ/เขต</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUserAddr.District}
                    />
                  </label>
                </div>
                <div className="flex">
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">จังหวัด</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUserAddr.Province}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">รหัสไปรษณีย์</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUserAddr.Zip_Code}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">เบอร์โทรศัพท์</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUserAddr.Phone}
                    />
                  </label>
                </div>
                <button className="btn bg-green-500">เพิ่ม</button>
                <button className="btn bg-yellow-500">บันทึก</button>
                <button className="btn bg-red-500">ลบ</button>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>UID</th>
                      <th className="">ชื่อ</th>
                      <th>นามสกุล</th>
                      <th>E-mail</th>
                      <th>เบอร์โทรศัพท์</th>
                      <th>สิทธิการเข้าถึง</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user: UserInfo) => {
                      return <AdminUserTable user={user} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
