"use client";
import AdminUserSidebar from "@/app/components/admin-components/AdminUserSidebar";
import { ProductInfo } from "@/app/model/Product";
import UserInfo from "@/app/model/UserInfo";
import React, {
  // ButtonHTMLAttributes,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import AddressInfo from "@/app/model/AddressModel";
import {
  AdminDeleteUser,
  AdminDeleteSuccess,
} from "../../../components/admin-components/AdminDeleteUser";
import React, { useEffect, useState } from "react";

interface UserTable {
  user: UserInfo;
}
const user: UserInfo = {
  UID: "U00001",
  Email: "test@gmail.com",
  Name: "Name",
  LastName: "Lastname",
  Phone: "000000001",
  Role: "",
};
function paginate(items, itemsPerPage, pageNumber) {
  const startIndex = pageNumber * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  console.log(startIndex, endIndex, pageNumber, "d");
  if (endIndex > items.length - 1) {
    console.log("over length");
    return items.slice(startIndex, items.length - 1);
  }
  return items.slice(startIndex, endIndex);
}

export default function userManagement() {
  const [page, setPage] = useState([0, 6]);

  function AdminUserTable(props: UserTable) {
    return (
      <tr>
        <td>{props.user.User_ID}</td>
        <td>{props.user.First_Name}</td>
        <td>{props.user.Last_Name}</td>
        <td>{props.user.Email}</td>
        <td>{props.user.Phone}</td>
        <td>{props.user.Access_Level}</td>
        <td>
          <button
            className="btn bg-yellow-500"
            onClick={() => {
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
    const selected = dataAddr.find((x: AddressInfo) => x.Address_ID == value);
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

  const [btnDelete, setBtnDelete] = useState(false);

  useEffect(() => {
    fetchUsersData();
    if (!btnDelete) {
      setCurUser({
        User_ID: "",
        First_Name: "",
        Last_Name: "",
        Email: "",
        Phone: "",
        Access_Level: "",
      });
    }
  }, [btnDelete]);

  const [curUser, setCurUser] = useState({
    User_ID: "",
    First_Name: "",
    Last_Name: "",
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

  async function fetchUserAddressData(User_ID: string) {
    try {
      const response = await fetch(`/api/user/getAddressByUserID`, {
        method: "POST",
        body: JSON.stringify({
          UserID: User_ID,
        }),
      });
      if (!response.ok) throw new Error("ERROR");
      const data = await response.json();
      setAddrData(data);
    } catch (ex) {
      console.error(ex);
    }
  }

  function selectUser(user: UserInfo) {
    setBtnDelete(true);
    setCurUser(user);
    fetchUserAddressData(user.User_ID);
    if (dataAddr.length == 0) {
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
    } else {
      setCurUserAddress(dataAddr[0]);
    }
  }

  async function fetchUsersData() {
    try {
      const response = await fetch(`/api/user/GetUsers`);
      if (!response.ok) throw new Error("ERROR");
      const data = await response.json();
      setData(data);
    } catch (ex) {
      console.error(ex);
    }
  }

  const [data, setData] = useState([]);
  const [dataAddr, setAddrData] = useState([]);
  useEffect(() => {
    fetchUsersData();
  }, []);
  // let Index = 0;
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
        <dialog id="deleteUser" className="modal">
          <AdminDeleteUser
            User_ID={curUser.User_ID}
            btnDelete={btnDelete}
            setState={setBtnDelete}
          />
        </dialog>
        <dialog id="deleteSuccess" className="modal">
          <AdminDeleteSuccess />
        </dialog>
        <AdminUserSidebar />
        <div className="col-span-5 m-2">
          <div>
            <h1>รายละเอียดบัญชีผู้ใช้งาน</h1>
            <div>
              <div className="">
                <label className="form-control w-full max-w-xs mx-1">
                  <div className="label">
                    <span className="label-text">UID</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Please choose first"
                    className="input input-bordered w-11/12"
                    name="Name"
                    readOnly={true}
                    value={curUser.User_ID}
                    onChange={handleChange}
                    disabled
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
                      value={curUser.First_Name}
                      onChange={handleChange}
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
                      value={curUser.Last_Name}
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                    />
                  </label>
                  <button className="btn self-end">เปลี่ยนรหัสผ่าน</button>
                </div>
                <button className="btn bg-green-500">เพิ่ม</button>
                <button className="btn bg-yellow-500">บันทึก</button>
                <button
                  className="btn bg-red-500"
                  disabled={!btnDelete}
                  onClick={() => {
                    document?.getElementById("deleteUser").showModal();
                  }}
                >
                  ลบ
                </button>
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
                    {data.slice(page[0], page[1]).map((e: UserInfo) => {
                      return <AdminUserTable key={e.User_ID} user={e} />;
                    })}
                  </tbody>
                </table>
                <div className="join my-4">
                  {data.length > 7
                    ? Array.from(
                        { length: Math.ceil(data.length / 7) },
                        (_, index) => (
                          <button
                            key={index}
                            className={`join-item btn ${
                              index == 0 ? "bg-yellow-600" : ""
                            }`}
                            onClick={(e: MouseEvent<Element>) => {
                              setPage([index * 7, (index + 1) * 7 - 1]);
                              const k = document.querySelectorAll(".join-item");
                              k.forEach((d) =>
                                d.classList.remove("bg-yellow-600")
                              );
                              e.target.classList.add("bg-yellow-600");
                            }}
                          >
                            {index + 1}
                          </button>
                        )
                      )
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
