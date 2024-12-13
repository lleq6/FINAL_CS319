"use client";
import AdminUserSidebar from "@/app/components/admin-components/AdminUserSidebar";
import UserInfo from "@/app/model/UserInfo";
import AddressInfo from "@/app/model/AddressModel";
import {
  AdminSaveUser,
  AdminSaveSuccess,
} from "../../../components/admin-components/AdminUpdateUser";
import {
  AdminDeleteUser,
  AdminDeleteSuccess,
} from "../../../components/admin-components/AdminDeleteUser";
import React, { useEffect, useState } from "react";

interface UserTable {
  user: UserInfo;
  selectUser: (user: UserInfo) => void;
}

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
            props.selectUser(props.user);
          }}
        >
          แก้ไข
        </button>
      </td>
    </tr>
  );
}

export default function userManagement() {
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

  const [btnDelete, setBtnDelete] = useState(false);
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
        const address: AddressInfo = data[0]
        setCurUserAddress(address);
        const opt = document?.querySelector(`#addrlist option[value="${address.Address_ID}"]`);
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
                    name="User_ID"
                    value={curUser.User_ID}
                    readOnly={true}
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
                      name="First_Name"
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
                    {data.map((user: UserInfo) => {
                      return (
                        <AdminUserTable user={user} selectUser={selectUser} />
                      );
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
