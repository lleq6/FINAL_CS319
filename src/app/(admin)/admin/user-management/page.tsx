"use client";
import AdminUserSidebar from "@/app/components/admin-components/AdminUserSidebar";
import UserInfo from "@/app/model/UserInfo";
import React, { MouseEvent, useEffect, useState } from "react";
import AddressInfo from "@/app/model/AddressModel";
import {
  AdminSaveUser,
  AdminSaveSuccess,
} from "../../../components/admin-components/AdminUpdateUser";
import {
  AdminDeleteUser,
  AdminDeleteSuccess,
} from "../../../components/admin-components/AdminDeleteUser";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import AddressModal from "@/app/components/AddressModal";
import {
  AdminAddFail,
  AdminAddSuccess,
  AdminAddUserAlready,
  AdminAddWarning,
} from "@/app/components/admin-components/AdminAddUser";

interface UserTable {
  user: UserInfo;
  onSelectUser: (user: UserInfo) => void;
  onDeleteUser: (user: string) => void;
}

function AdminUserTable(props: UserTable) {
  return (
    <tr>
      <td>{props.user.User_ID}</td>
      <td>{props.user.Username}</td>
      <td>{props.user.First_Name}</td>
      <td>{props.user.Last_Name}</td>
      <td>{props.user.Email}</td>
      <td>{props.user.Phone}</td>
      <td>{props.user.Access_Level == "1" ? "ผู้ดูแลระบบ" : "สมาชิกทั่วไป"}</td>
      <td width={200}>
        <button
          className="btn bg-yellow-500"
          onClick={() => {
            props.onSelectUser(props.user);
          }}
        >
          <FaUserEdit />
          แก้ไข
        </button>
        <button
          className="btn bg-red-500"
          onClick={() => {
            props.onDeleteUser(props.user.User_ID);
            (
              document.querySelector(`#deleteUser`) as HTMLDialogElement
            ).showModal();
          }}
        >
          <FaTrashAlt />
          ลบ
        </button>
      </td>
    </tr>
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
    if (curUser.User_ID) {
      setIsEditing(true);
    }
  }

  function handleAccessChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setCurUser({
      ...curUser,
      ["Access_Level"]: value,
    });
    if (curUser.User_ID) {
      setIsEditing(true);
    }
  }

  function onClickAddUser(e: MouseEvent<HTMLButtonElement>) {
    async function AddUser() {
      const response = await fetch("/api/admin/addUser", {
        method: "POST",
        body: JSON.stringify(curUser),
      });
      switch (response.status) {
        case 200:
          onClearData();
          fetchUsersData();
          (
            document?.getElementById("addSuccess") as HTMLDialogElement
          ).showModal();
          break;
        case 201:
          (
            document?.getElementById("addUserAlready") as HTMLDialogElement
          ).showModal();
          break;
        default:
          (
            document?.getElementById("addFailure") as HTMLDialogElement
          ).showModal();
          break;
      }
    }

    e.preventDefault();
    let Check: boolean = false;
    for (const key in curUser) {
      if (key === "User_ID" || key === "Access_Level") {
        continue;
      }
      if (curUser[key as keyof UserInfo] === "") {
        Check = true;
      }
    }
    if (!Check) {
      curUser.Access_Level = "0";
      AddUser();
    } else {
      (document?.getElementById("addWarning") as HTMLDialogElement).showModal();
    }
  }

  const [delUser_ID, onDeleteUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [btnState, setButtonState] = useState(false);

  const [addressList, setAddressList] = useState<AddressInfo[]>([]);
  const [curAddress, setCurAddress] = useState<AddressInfo>();

  useEffect(() => {
    fetchUsersData();
    if (!delUser_ID) {
      onClearData();
    }
  }, [delUser_ID]);

  useEffect(() => {
    fetchUsersData();
  }, [isEditing]);

  const [curUser, setCurUser] = useState<UserInfo>({
    User_ID: "",
    Username: "",
    First_Name: "",
    Last_Name: "",
    Email: "",
    Phone: "",
    Access_Level: "",
  });

  function onClearData() {
    setIsEditing(false);
    setButtonState(false);
    setCurUser({
      User_ID: "",
      Username: "",
      First_Name: "",
      Last_Name: "",
      Email: "",
      Phone: "",
      Access_Level: "",
    });
    const opt = document?.querySelector(
      `#accessList option[value="0"]`
    ) as HTMLOptionElement;
    if (opt) {
      opt.selected = true;
      opt.defaultSelected = true;
    }
  }

  function onSelectUser(user: UserInfo) {
    setCurUser(user);
    setIsEditing(false);
    setButtonState(true);
    fetchUserAddressData(user.User_ID);
    const opt = document?.querySelector(
      `#accessList option[value="${user.Access_Level}"]`
    ) as HTMLOptionElement;
    if (opt) {
      opt.selected = true;
      opt.defaultSelected = true;
    }
  }

  async function fetchUsersData() {
    try {
      const response = await fetch(`/api/user/GetUsers`);
      if (!response.ok) throw new Error("ERROR");
      const data = await response.json();
      setUsersData(data);
      setUsersDisplay(data);
    } catch (ex) {
      console.error(ex);
    }
  }

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
      setAddressList(data);
    } catch (ex) {
      console.error(ex);
    }
  }

  const [usersData, setUsersData] = useState<UserInfo[]>([]);
  const [usersDisplay, setUsersDisplay] = useState<UserInfo[]>([]);

  useEffect(() => {
    setPage([0, 6]);
    const k = document.querySelectorAll(".join-item");
    k.forEach((d, index) => {
      if (index !== 0) {
        d.classList.remove("bg-yellow-600");
      } else {
        d.classList.add("bg-yellow-600");
      }
    });
  }, [usersDisplay]);

  useEffect(() => {
    fetchUsersData();
  }, []);
  return (
    <div className="">
      <div className="pl-5">
        <h1>จัดการบัญชีผู้ใช้งาน</h1>
        <AddressModal
          userID={curUser.User_ID}
          userAddresses={addressList}
          setAddresses={setAddressList}
          setCurAddress={setCurAddress}
        />
      </div>
      <div className="grid grid-cols-7 pl-5 pr-5">
        <AdminAddSuccess />
        <AdminAddWarning />
        <AdminAddFail />
        <AdminAddUserAlready Username={curUser.Username} />
        <AdminDeleteUser User_ID={delUser_ID} setDeleteUser={onDeleteUser} />
        <AdminDeleteSuccess />
        <AdminSaveUser
          UserData={curUser}
          isEditing={isEditing}
          setState={setIsEditing}
        />
        <AdminSaveSuccess />
        <AdminUserSidebar Users={usersData} setUsersDisplay={setUsersDisplay} />
        <div className="col-span-5 m-2">
          <div>
            <h1>รายละเอียดบัญชีผู้ใช้งาน</h1>
            <div>
              <div>
                <div className="flex">
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">UID</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Please select first"
                      className="input input-bordered w-11/12"
                      name="User_ID"
                      value={curUser.User_ID}
                      readOnly={true}
                      disabled={true}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">ชื่อผู้ใช้</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      name="Username"
                      value={curUser.Username}
                      onChange={handleChange}
                    />
                  </label>
                </div>
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
                    <select
                      id="accessList"
                      name="accessList"
                      className="select select-bordered w-11/12"
                      onChange={handleAccessChange}
                    >
                      <option key="0" value="0">
                        สมาชิกทั่วไป
                      </option>
                      <option key="1" value="1">
                        ผู้ดูแลระบบ
                      </option>
                    </select>
                  </label>
                  <button
                    className="btn self-end bg-yellow-500 mx-1"
                    disabled={!btnState}
                  >
                    เปลี่ยนรหัสผ่าน
                  </button>
                  <button
                    className="btn self-end bg-yellow-500 mx-1"
                    disabled={!btnState}
                    onClick={() =>
                      (
                        document.getElementById(
                          "address-modal"
                        ) as HTMLDialogElement
                      ).showModal()
                    }
                  >
                    เปิดดูข้อมูลที่อยู่
                  </button>
                </div>
                <button
                  className="btn bg-green-500 w-30 max-w-xs mx-1 my-2"
                  onClick={onClickAddUser}
                >
                  เพิ่ม
                </button>
                <button
                  className="btn bg-yellow-500 w-30 max-w-xs mx-1 my-2"
                  disabled={!isEditing}
                  onClick={() => {
                    (
                      document.getElementById("saveUser") as HTMLDialogElement
                    ).showModal();
                  }}
                >
                  บันทึก
                </button>
                <button
                  className="btn bg-yellow-500 w-30 max-w-xs mx-1 my-2"
                  disabled={!btnState}
                  onClick={onClearData}
                >
                  ล้างข้อมูล
                </button>
              </div>
              <div className="join my-4">
                {usersDisplay.length > 6
                  ? Array.from(
                      { length: Math.ceil(usersDisplay.length / 6) },
                      (_, index) => (
                        <button
                          key={index}
                          className={`join-item btn ${
                            index == 0 ? "bg-yellow-600" : ""
                          }`}
                          onClick={(e: MouseEvent<Element>) => {
                            setPage([index * 6, (index + 1) * 6]);
                            const k = document.querySelectorAll(".join-item");
                            k.forEach((d) =>
                              d.classList.remove("bg-yellow-600")
                            );
                            (e.target as Element).classList.add(
                              "bg-yellow-600"
                            );
                          }}
                        >
                          {index + 1}
                        </button>
                      )
                    )
                  : ""}
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>ชื่อผู้ใช้</th>
                      <th>ชื่อ</th>
                      <th>นามสกุล</th>
                      <th>E-mail</th>
                      <th>เบอร์โทรศัพท์</th>
                      <th>สิทธิการเข้าถึง</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersDisplay.slice(page[0], page[1]).map((e: UserInfo) => {
                      return (
                        <AdminUserTable
                          key={e.User_ID}
                          user={e}
                          onSelectUser={onSelectUser}
                          onDeleteUser={onDeleteUser}
                        />
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
