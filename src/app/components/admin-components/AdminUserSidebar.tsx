import UserInfo from "@/app/model/UserInfo";
import { useState } from "react";

interface Props {
  Users: UserInfo[];
  setUsersDisplay: (e: any) => void;
}

export default function AdminUserSidebar({ Users, setUsersDisplay }: Props) {
  const [filter, setFilter] = useState("User_ID");
  const [keyword, setKeyword] = useState("");

  function onSearchByFilter() {
    switch (filter) {
      case "User_ID":
        setUsersDisplay(Users.filter((x) => x.User_ID == keyword));
        break;
      default:
        setUsersDisplay(
          Users.filter((x) => x[filter].toString().includes(keyword))
        );
        break;
    }
  }

  function onClearData() {
    setFilter("User_ID");
    setKeyword("");
    setUsersDisplay(Users);
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setFilter(value);
  }

  function handleKeywordChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setKeyword(value);
  }

  return (
    <div>
      <label className="form-control w-full max-w-xs mx-1">
        <div className="label">
          <span className="label-text">ค้นหาโดย</span>
        </div>
        <select
          className="select select-bordered w-11/12"
          name="filter"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value={"User_ID"}>User ID</option>
          <option value={"Email"}>อีเมล</option>
          <option value={"First_Name"}>ชื่อ</option>
          <option value={"Last_Name"}>นามสกุล</option>
          <option value={"Phone"}>เบอร์โทรศัพท์</option>
        </select>
      </label>

      <label className="form-control w-full max-w-xs mx-1">
        <div className="label">
          <span className="label-text">คำค้นหา</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-11/12"
          name="Value"
          value={keyword}
          onChange={handleKeywordChange}
        />
      </label>

      <div className="text-center my-5">
        <button className="btn mx-1" onClick={onSearchByFilter}>
          ค้นหา
        </button>
        <button className="btn mx-1" onClick={onClearData}>
          ล้างข้อมูล
        </button>
      </div>
    </div>
  );
}
