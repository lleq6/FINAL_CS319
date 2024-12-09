"use client";
import AdminProduct from "@/app/components/admin-components/AdminProduct";
import AdminUserSidebar from "@/app/components/admin-components/AdminUserSidebar";
import UserInfo from "@/app/model/UserInfo";
import React, { ButtonHTMLAttributes, MouseEvent, useEffect, useState } from "react";

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
  const [curPage, setCurPage] = useState(1);
  const [test, setTest] = useState<UserInfo[]>([
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    user,
    // test.map()
  ].map((e,index) => {
    const obj = {...user, UID:"U00001"+index}
    return obj
  }));
  const [show, setShow] = useState([]);
  // const
  // console.log(test.length / 10);

  useEffect(() => {
    let i = 2;
    setTest(
      test.map((e) => {
        const obj = { ...e,UID: e.UID + i };
        i++;
        return obj;
      })
    );
    // setShow(paginate(test, 6, 1));
    // return e;
  }, []);
  useEffect(() => {
    console.log(test);
    setShow(test);
  }, [test]);

  function AdminUserTable(props: UserTable) {
    return (
      <tr>
        <td>{props.user.UID}</td>
        <td>{props.user.Name}</td>
        <td>{props.user.LastName}</td>
        <td>{props.user.Email}</td>
        <td>{props.user.Phone}</td>
        <td>
          <button
            className="btn bg-yellow-500"
            onClick={(e) => selectUser(props.user)}
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
  const [curUser, setCurUser] = useState({
    UID: "",
    Name: "",
    LastName: "",
    Email: "",
    Phone: "",
    Role: "",
  });

  function selectUser(user: UserInfo) {
    setCurUser(user);
  }

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
                    name="UID"
                    value={curUser.UID}
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
                      value={curUser.Name}
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
                      value={curUser.LastName}
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
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-1">
                    <div className="label">
                      <span className="label-text">UID</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-11/12"
                      value={curUser.Role}
                    />
                  </label>
                  <button className="btn self-end">เปลี่ยนรหัสผ่าน</button>
                </div>
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>UID</th>
                      <th className="">ชื่อ</th>
                      <th>นามสกุล</th>
                      <th>E-mail</th>
                      <th>เบอร์โทรศัพท์</th>
                      {/* <th>สถานะ</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {test.map(e => 
                      <AdminUserTable user={e}/>  
                    )} */}
                    {/* <AdminUserTable user={user} /> */}
                    {/* <AdminUserTable user={user} /> */}
                    {/* <AdminUserTable user={user} /> */}
                    {/* <AdminUserTable user={user} /> */}
                    {/* <AdminUserTable user={user} /> */}
                    {/* {test.slice(page[0],page[1]).map((e)=>{
                        console.log(page[0],page[1])
                        console.log(test.slice(page[0],page[1]))
                        return<AdminUserTable user={e} />})} */}
                    {/* {test.slice(page[0], page[1]).map((e) => ( */}
                    {/* // <AdminUserTable key={e.UID} user={e} /> */}
                    {/* // ))} */}
                    {test.slice(page[0],page[1]).map((e) => {
                      console.log(e)
                      return(
                      <AdminUserTable key={e.UID} user={e} />
                    )})}
                  </tbody>
                </table>
                <div className="join my-4">
                  {test.length > 7
                    ? Array.from(
                        { length: Math.ceil(test.length / 7) },
                        (_, index) => (
                          <button
                            key={index}
                            className={`join-item btn ${
                              index == 0 ? "bg-yellow-600" : ""
                            }`}
                            onClick={(e : MouseEvent<Element>) => {
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
