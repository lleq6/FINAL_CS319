import { useDialog } from "@/app/context/DialogContext";
import { signIn, SignInResponse } from "next-auth/react";
import { useState } from "react";

const LoginForceUI = () => {
  const { showDialog } = useDialog();
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
      showDialog({
        ID: "loginFailure",
        Header: "เข้าสู่ระบบ",
        Type: "error",
        Message: `การเข้าสู่ระบบไม่สำเร็จ! \n โปรดตรวจสอบอีเมลและรหัสผ่าน \n หรือติดต่อเจ้าหน้าที่`,
        onClose: () => {},
      });
      return;
    }
    //(document?.getElementById("my_modal_1") as HTMLDialogElement)?.close();
    showDialog({
      ID: "loginSuccess",
      Header: "เข้าสู่ระบบ",
      Type: "info",
      Message: `เข้าสู่ระบบสำเร็จ!`,
      onClose: () => {},
    });
  };
  return (
    <dialog id="loginForceUI" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">เข้าสู่ระบบ</h3>
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <input
            className="input m-2 bg-gray-300"
            placeholder="อีเมล"
            type="text"
            name="Email"
            onChange={handleChange}
          />
          <label className="form-control w-full">
            <input
              className="input bg-gray-300 m-2"
              placeholder="รหัสผ่าน"
              type="password"
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
      </div>
    </dialog>
  );
}

export default LoginForceUI