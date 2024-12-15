import { signIn, SignInResponse } from "next-auth/react";
// import { useState } from "react";
import { FormEvent, useState } from "react";

export default function LoginModal() {
  const [curUser, setCurUser] = useState({
    Email: "",
    Password: "",
  });

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setCurUser({
      ...curUser,
      [name]: value,
    });
  }
  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = curUser.Email;
    const password = curUser.Password;
    const res: SignInResponse = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res.error) {
      alert(res.error);
    } else {
        
    }
    (document?.getElementById("my_modal_1") as HTMLDialogElement)?.close();
    alert("เข้าสู่ระบบสำเร็จ");
  };
  return (
    <div className="modal-box">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
          ✕
        </button>
      </form>
      <h3 className="font-bold text-lg">เข้าสู่ระบบ</h3>
      {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
      <form className="flex flex-col " onSubmit={handleSubmit}>
        {/* <input type="text" /> */}
        <input
          className="input bg-slate-500"
          placeholder="อีเมลล์"
          type="text"
          name="Email"
          onChange={handleChange}
        />
        <label className="form-control w-full">
          <input
            className="input bg-slate-500"
            placeholder="รหัสผ่าน"
            type="text"
            name="Password"
            onChange={handleChange}
          />
          {/* <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" /> */}
          <div className="label">
            <span className="label-text-alt"></span>
            <span className="label-text-alt">ลืมรหัสผ่าน</span>
          </div>
        </label>
        <button className="btn">เข้าสู่ระบบ</button>
      </form>
      <hr className="w-full text-center bg-black text-black h-[2px]" />
      <p className="text-end">
        ยังไม่ได้สมัครสมาชิก?{" "}
        <a
          className="link"
          onClick={() => {
            (
              document?.getElementById("my_modal_1") as HTMLDialogElement
            ).close();
            (
              document?.getElementById("my_modal_2") as HTMLDialogElement
            ).showModal();
          }}
        >
          สมัครสมาชิก
        </a>
      </p>
    </div>
  );
}
