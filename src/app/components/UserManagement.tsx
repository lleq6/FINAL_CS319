"use client";
import AdminUserSidebar from "@/app/components/admin-components/AdminUserSidebar";
import UserInfo from "@/app/model/UserInfo";
import React, { MouseEvent, useEffect, useState } from "react";
import AddressInfo from "@/app/model/AddressInfo";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { useDialog } from "../context/DialogContext";
import { isEmptyUserData, isValidEmail, isValidPhone } from "../api/lib/utils";
import UserAddressManagement from "./UserAddressManagement";

interface UserDetailProps {
  User: UserInfo;
  onSelectUser: (User: UserInfo) => void;
  onClearData: () => void;
  fetchUsersData: () => void;
}

function UserDetail(props: UserDetailProps) {
  const { showDialog } = useDialog();
  return (
    <tr>
      <td key="User_ID">{props.User.User_ID}</td>
      <td key="Email">{props.User.Email}</td>
      <td key="First_Name">{props.User.First_Name}</td>
      <td key="Last_Name">{props.User.Last_Name}</td>
      <td key="Phone">{props.User.Phone}</td>
      <td key="Access_Level">
        {props.User.Access_Level == "1" ? "ผู้ดูแลระบบ" : "สมาชิกทั่วไป"}
      </td>
      <td width={200} key="Action">
        <button
          className="btn bg-yellow-500"
          onClick={() => {
            props.onSelectUser(props.User);
          }}
        >
          <FaUserEdit />
          แก้ไข
        </button>
        <button
          className="btn bg-red-500"
          onClick={() => {
            showDialog({
              ID: "deleteUser",
              Header: "ลบบัญชีผู้ใช้งาน",
              Type: "info",
              Message: `คุณต้องการลบบัญชีผู้ใช้ User ID : ${props.User.User_ID} ใช่ไหม?`,
              onConfirm: async () => {
                try {
                  const response = await fetch(`/api/admin/deleteUser`, {
                    method: "POST",
                    body: JSON.stringify({
                      User_ID: props.User.User_ID,
                    }),
                  });
                  if (response.ok) {
                    const data = await response.status;
                    if (data == 200) {
                      showDialog({
                        ID: "deleteSuccess",
                        Header: "แจ้งเตือน",
                        Type: "success",
                        Message: `ลบบัญชีผู้ใช้ User ID : ${props.User.User_ID} สำเร็จ!`,
                        onClose: () => {},
                      });
                      props.onClearData();
                      props.fetchUsersData();
                    }
                  } else {
                    showDialog({
                      ID: "deleteUserFailure",
                      Header: "แจ้งเตือน",
                      Type: "error",
                      Message: `ลบบัญชีผู้ใช้ User ID : ${props.User.User_ID} ล้มเหลว! \n API ไม่ตอบสนอง`,
                      onClose: () => {},
                    });
                  }
                } catch (ex) {
                  showDialog({
                    ID: "deleteUserError",
                    Header: "แจ้งเตือน",
                    Type: "error",
                    Message: `เกิดข้อผิดพลาดในการลบบัญชีผู้ใช้ User ID : ${props.User.User_ID}`,
                    onClose: () => {},
                  });
                }
              },
              onCancel: () => {},
            });
          }}
        >
          <FaTrashAlt />
          ลบ
        </button>
      </td>
    </tr>
  );
}

const UserManagement = () => {
  const { showDialog } = useDialog();
  const [page, setPage] = useState([0, 6]);
  const [usersData, setUsersData] = useState<UserInfo[]>([]);
  const [usersDisplay, setUsersDisplay] = useState<UserInfo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [btnState, setButtonState] = useState(false);
  const [addressList, setAddressList] = useState<AddressInfo[]>([]);
  const [curUser, setCurUser] = useState<UserInfo>({
    User_ID: "",
    Email: "",
    First_Name: "",
    Last_Name: "",
    Phone: "",
    Access_Level: "",
  });
  const [curEmail, setCurEmail] = useState("");

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
          showDialog({
            ID: "addUserSuccess",
            Header: "แจ้งเตือน",
            Type: "success",
            Message: `เพิ่มบัญชีผู้ใช้งานสำเร็จ!`,
            onClose: () => {},
          });
          break;
        case 201:
          showDialog({
            ID: "addUserAlready",
            Header: "แจ้งเตือน",
            Type: "warning",
            Message: `มีบัญชีผู้ใช้งาน '${curUser.Email}' อยู่ในระบบแล้ว!`,
            onClose: () => {},
          });
          break;
        default:
          showDialog({
            ID: "addUserFailure",
            Header: "แจ้งเตือน",
            Type: "error",
            Message: `เพิ่มบัญชีผู้ใช้งาน '${curUser.Email}' ล้มเหลว!`,
            onClose: () => {},
          });
          break;
      }
    }

    e.preventDefault();
    if (isEmptyUserData(curUser)) {
      showDialog({
        ID: "addDataEmpty",
        Header: "แจ้งเตือน",
        Type: "warning",
        Message: `กรุณากรอกข้อมูลให้ครบ!`,
        onClose: () => {},
      });
      return;
    }
    if (!(isValidEmail(curUser.Email))) {
      showDialog({
        ID: "addEmailInvalid",
        Header: "แจ้งเตือน",
        Type: "warning",
        Message: `กรุณากรอกข้อมูลอีเมลให้ถูกต้อง!`,
        onClose: () => {},
      });
      return;
    }
    if (!(isValidPhone(curUser.Phone))) {
      showDialog({
        ID: "addPhoneInvalid",
        Header: "แจ้งเตือน",
        Type: "warning",
        Message: `กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ถูกต้อง!`,
        onClose: () => {},
      });
      return;
    }
    curUser.Access_Level = "0";
    AddUser();
  }

  function onClickSaveUser(e: MouseEvent<HTMLButtonElement>) {
    async function SaveUser() {
      try {
        const Data = new FormData();
        Data.append("user", JSON.stringify(curUser));
        if (curEmail) {
          Data.append("temp_email", curEmail);
        }
        const response = await fetch(`/api/admin/updateUser`, {
          method: "POST",
          body: Data,
        });
        if (response.ok) {
          const status = await response.status;
          switch (status) {
            case 200:
              setIsEditing(false);
              onClearData();
              fetchUsersData();
              showDialog({
                ID: "saveUserSuccess",
                Header: "แจ้งเตือน",
                Type: "success",
                Message: `บันทึกข้อมูลบัญชี User ID : ${curUser.User_ID} สำเร็จ!`,
                onClose: () => {},
              });
              break;
            case 201:
              showDialog({
                ID: "saveUserEmailAlready",
                Header: "แจ้งเตือน",
                Type: "warning",
                Message: `ไม่สามารถเปลี่ยนอีเมล '${curEmail}' เป็น '${curUser.Email}' ได้ เนื่องจากมีอีเมลนี้อยู่ในระบบแล้ว!`,
                onClose: () => {},
              });
              break;
            default:
              showDialog({
                ID: "saveUserFailure",
                Header: "แจ้งเตือน",
                Type: "error",
                Message: `บันทึกข้อมูลบัญชี User ID : ${curUser.User_ID} ล้มเหลว!`,
                onClose: () => {},
              });
              break;
          }
        } else {
          showDialog({
            ID: "saveUserAPIFailure",
            Header: "แจ้งเตือน",
            Type: "error",
            Message: `บันทึกข้อมูลบัญชี User ID : ${curUser.User_ID} ล้มเหลว! \n API ไม่ตอบสนอง`,
            onClose: () => {},
          });
        }
      } catch (ex) {
        showDialog({
          ID: "saveUserError",
          Header: "แจ้งเตือน",
          Type: "error",
          Message: `เกิดข้อผิดพลาดในการบันทึกข้อมูลบัญชี User ID : ${curUser.User_ID}!`,
          onClose: () => {},
        });
      }
    }

    showDialog({
      ID: "saveUser",
      Header: "บันทึกข้อมูลบัญชีผู้ใช้",
      Type: "info",
      Message: `คุณต้องการบันทึกข้อมูลบัญชี User ID : ${curUser.User_ID} ใช่ไหม?`,
      onConfirm: () => {
        if (isEmptyUserData(curUser)) {
          showDialog({
            ID: "saveUserDataEmpty",
            Header: "แจ้งเตือน",
            Type: "warning",
            Message: `กรุณากรอกข้อมูลให้ครบ!`,
            onClose: () => {},
          });
          return;
        }
        if (!(isValidEmail(curUser.Email))) {
          showDialog({
            ID: "saveUserEmailInvalid",
            Header: "แจ้งเตือน",
            Type: "warning",
            Message: `กรุณากรอกข้อมูลอีเมลให้ถูกต้อง!`,
            onClose: () => {},
          });
          return;
        }
        if (!(isValidPhone(curUser.Phone))) {
          showDialog({
            ID: "saveUserPhoneInvalid",
            Header: "แจ้งเตือน",
            Type: "warning",
            Message: `กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ถูกต้อง!`,
            onClose: () => {},
          });
          return;
        }
        SaveUser();
      },
      onCancel: () => {},
    });
  }

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

  function onClearData() {
    setIsEditing(false);
    setButtonState(false);
    setCurUser({
      User_ID: "",
      Email: "",
      First_Name: "",
      Last_Name: "",
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
    setCurEmail(user.Email);
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
      const response = await fetch(`/api/admin/getUsers`);
      if (response.ok) {
        const data: UserInfo[] = await response.json();
        setUsersData(data);
        setUsersDisplay(data);
      } else {
        showDialog({
          ID: "loadAllUsersFailure",
          Header: "แจ้งเตือน",
          Type: "error",
          Message: `โหลดข้อมูลบัญชีผู้ใช้ไม่สำเร็จ! \n API ไม่ตอบสนอง`,
          onClose: () => {},
        });
      }
    } catch (ex) {
      showDialog({
        ID: "loadAllUsersError",
        Header: "แจ้งเตือน",
        Type: "error",
        Message: `เกิดข้อผิดพลาดในการโหลดข้อมูลบัญชีผู้ใช้`,
        onClose: () => {},
      });
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
      if (response.ok) {
        const data = await response.json();
        setAddressList(data);
      } else {
        showDialog({
          ID: "loadAddressByUserFailure",
          Header: "แจ้งเตือน",
          Type: "error",
          Message: `โหลดข้อมูลที่อยู่ของบัญชีผู้ใช้ไม่สำเร็จ! \n API ไม่ตอบสนอง`,
          onClose: () => {},
        });
      }
    } catch (ex) {
      showDialog({
        ID: "loadAddressByUserError",
        Header: "แจ้งเตือน",
        Type: "error",
        Message: `เกิดข้อผิดพลาดในการโหลดข้อมูลที่อยู่ของบัญชีผู้ใช้`,
        onClose: () => {},
      });
    }
  }

  return (
    <div className="">
      <div className="pl-5">
        <h1>จัดการบัญชีผู้ใช้งาน</h1>
        <UserAddressManagement
          UserID={curUser.User_ID}
          Addresses={addressList}
          setAddresses={setAddressList}
        />
      </div>
      <div className="grid grid-cols-7 pl-5 pr-5">
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
                </div>
                <div className="flex">
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">อีเมล</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      name="Email"
                      value={curUser.Email.toLowerCase()}
                      onChange={handleChange}
                    />
                  </label>
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
                    onClick={() => {
                      showDialog({
                        ID: "userResetPassword",
                        Header: "รีเซ็ตรหัสผ่านของบัญชีผู้ใช้",
                        Type: "info",
                        Message: `คุณต้องการรีเซ็ตรหัสผ่านของบัญชีผู้ใช้ User ID : ${curUser.User_ID} ใช่ไหม?`,
                        onConfirm: async () => {
                          async function onResetPassword() {
                            const response = await fetch(
                              "/api/admin/resetPasswordUser",
                              {
                                method: "POST",
                                body: JSON.stringify({
                                  User_ID: curUser.User_ID,
                                }),
                              }
                            );
                            switch (response.status) {
                              case 200:
                                onClearData();
                                fetchUsersData();
                                showDialog({
                                  ID: "userResetPasswordSuccess",
                                  Header: "แจ้งเตือน",
                                  Type: "success",
                                  Message: `รีเซ็ตรหัสผ่านของบัญชีผู้ใช้ User ID : ${curUser.User_ID} สำเร็จ! \n รหัสผ่านคือ : 123456`,
                                  onClose: () => {},
                                });
                                break;
                              default:
                                showDialog({
                                  ID: "userResetPasswordFailure",
                                  Header: "แจ้งเตือน",
                                  Type: "error",
                                  Message: `รีเซ็ตรหัสผ่านล้มเหลว!`,
                                  onClose: () => {},
                                });
                                break;
                            }
                          }
                          onResetPassword();
                        },
                        onCancel: () => {},
                      });
                    }}
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
                  onClick={onClickSaveUser}
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
                  <thead key="thead">
                    <tr>
                      <th key="User_ID">User ID</th>
                      <th key="Email">อีเมล</th>
                      <th key="First_Name">ชื่อ</th>
                      <th key="Last_Name">นามสกุล</th>
                      <th key="Phone">เบอร์โทรศัพท์</th>
                      <th key="Access_Level">สิทธิการเข้าถึง</th>
                      <th key="Action">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody key="tbody">
                    {usersDisplay.length > 0 ? (
                      usersDisplay
                        .slice(page[0], page[1])
                        .map((e: UserInfo) => {
                          return (
                            <UserDetail
                              key={e.User_ID}
                              User={e}
                              onSelectUser={onSelectUser}
                              onClearData={onClearData}
                              fetchUsersData={fetchUsersData}
                            />
                          );
                        })
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
