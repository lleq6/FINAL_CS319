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
  AdminSaveUser,
  AdminSaveSuccess,
} from "../../../components/admin-components/AdminUpdateUser";
import {
  AdminDeleteUser,
  AdminDeleteSuccess,
} from "../../../components/admin-components/AdminDeleteUser";
import { FaTrashAlt } from "react-icons/fa";
// import React, { useEffect, useState } from "react";

interface UserTable {
  user: UserInfo;
  selectUser: (user: string) => void;
  setDeleteUser: (user: string) => void;
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

function AdminUserTable(props: UserTable) {
  return (
    <>
      <tr>
        <td>{props.user.User_ID}</td>
        <td>{props.user.First_Name}</td>
        <td>{props.user.Last_Name}</td>
        <td>{props.user.Email}</td>
        <td>{props.user.Phone}</td>
        <td>{props.user.Access_Level}</td>
        <td width={100}>
          <button
            className="btn bg-yellow-500"
            onClick={() => {
              props.selectUser(props.user);
            }}
          >
            แก้ไข
          </button>
        </td>
        <td width={100}>
          <button
            className="btn bg-red-500 px-3"
            onClick={() => {
              props.setDeleteUser(props.user.User_ID);
              document.querySelector(`#deleteUser`).show();
            }}
          >
            <FaTrashAlt />
            ลบ
          </button>
        </td>
      </tr>
    </>
  );
}

export default function userManagement() {
  const [page, setPage] = useState([0, 6]);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setCurUser({
      ...curUser,
      [name]: value,
    });
    setBtnSave(true);
  }

  function handleAddrChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    console.log(value);
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

  const [btnDelete, setBtnDelete] = useState(0);
  const [btnSave, setBtnSave] = useState(false);

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
      setAddrData([]);
    }
  }, [btnDelete]);

  useEffect(() => {
    fetchUsersData();
  }, [btnSave]);

  const [curUser, setCurUser] = useState<UserInfo>({
    User_ID: "",
    First_Name: "",
    Last_Name: "",
    Email: "",
    Phone: "",
    Access_Level: "",
  });

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
      if (data.length > 0) {
        const address: AddressInfo = data[0];
        setCurUserAddress(address);
        const opt = document?.querySelector(
          `#addrlist option[value="${address.Address_ID}"]`
        );
        if (opt) {
          opt.selected = true;
          opt.defaultSelected = true;
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  function selectUser(user: UserInfo) {
    setBtnDelete(true);
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
    fetchUserAddressData(user.User_ID);
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
      <div className="pl-5">
        <h1>จัดการคลังสินค้า</h1>
      </div>
      <div className="grid grid-cols-7 pl-5 pr-5">
        <AdminDeleteUser User_ID={btnDelete} setDeleteUser={setBtnDelete} />
        <AdminDeleteSuccess />
        <dialog id="saveUser" className="modal">
          <AdminSaveUser
            UserData={curUser}
            btnSave={btnSave}
            setState={setBtnSave}
          />
        </dialog>
        <dialog id="saveSuccess" className="modal">
          <AdminSaveSuccess />
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
                    name="User_ID"
                    value={curUser.User_ID}
                    readOnly={true}
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
                      name="First_Name"
                      value={curUser.First_Name}
                      onChange={handleChange}
                      name="First_Name"
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
                      name="Last_Name"
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
                      name="Email"
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
                      name="Phone"
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
                      name="Access_Level"
                      value={curUser.Access_Level}
                      onChange={handleChange}
                    />
                  </label>
                  <button className="btn self-end">เปลี่ยนรหัสผ่าน</button>
                </div>
                <button className="btn bg-green-500">เพิ่ม</button>
                <button
                  className="btn bg-yellow-500"
                  disabled={!btnSave}
                  onClick={() => {
                    document?.getElementById("saveUser").showModal();
                  }}
                >
                  บันทึก
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
                    {dataAddr.map((x: AddressInfo, Index) => {
                      return (
                        <option value={x.Address_ID} key={Index}>
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
                      return (
                        <AdminUserTable
                          key={e.User_ID}
                          user={e}
                          selectUser={selectUser}
                          setDeleteUser={setBtnDelete}
                        />
                      );
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
