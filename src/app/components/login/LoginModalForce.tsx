import { signIn, SignInResponse } from "next-auth/react";
// import { useState } from "react";
import { useState } from "react";
import AlertModal from "../alertModal";

export default function LoginModalForce() {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = curUser.Email;
    const password = curUser.Password;
    const res: SignInResponse = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res.error) {
      document.getElementById("login-fail").showModal();
      return;
    }
    document?.getElementById("my_modal_1")?.close();
    document.getElementById("login-success").showModal();
  };
  // console.log(curUser.Email)

  return (
    <dialog id="loginModalForce" className="modal">
    <div className="modal-box">
      <AlertModal
        id={"login-success"}
        header="เข้าสู่ระบบ"
        message="เข้าสู่ระบบสำเร็จ"
        errorStatus={false}
      />
      <AlertModal
        id={"login-fail"}
        header="เข้าสู่ระบบ"
        message={<>การเข้าสู่ระบบไม่สำเร็จ<br/>โปรดตรวจสอบอีเมลล์และรหัสผ่าน<br></br>หรือติดต่อเจ้าหน้าที่</>}
        errorStatus={true}
      />
      <h3 className="font-bold text-lg">เข้าสู่ระบบ</h3>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <input
          className="input m-2 bg-gray-300"
          placeholder="อีเมลล์"
          type="text"
          name="Email"
          onChange={handleChange}
        />
        <label className="form-control w-full">
          <input
            className="input bg-gray-300 m-2"
            placeholder="รหัสผ่าน"
            type="text"
            name="Password"
            onChange={handleChange}
          />
          <div className="label">
            <span className="label-text-alt"></span>
          </div>
        </label>
        <button className="btn bg-yellow-600 m-4">เข้าสู่ระบบ</button>
      </form>
      <hr className="w-full text-center bg-black text-black h-[2px]" />
      <p className="text-end mt-1">
        ยังไม่ได้สมัครสมาชิก?{" "}
        <a
          className="link"
          onClick={() => {
            document?.getElementById("my_modal_1").close();
            document?.getElementById("my_modal_2").showModal();
          }}
        >
          สมัครสมาชิก
        </a>
      </p>
    </div>
    </dialog>
  );
}
