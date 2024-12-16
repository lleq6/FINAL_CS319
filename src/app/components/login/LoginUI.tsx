import { useDialog } from "@/app/context/DialogContext";
import { signIn, SignInResponse } from "next-auth/react";
import { useState } from "react";

const LoginUI = () => {
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        Header: "แจ้งเตือน",
        Type: "error",
        Message: `การเข้าสู่ระบบไม่สำเร็จ! \n โปรดตรวจสอบอีเมลล์และรหัสผ่าน \n หรือติดต่อเจ้าหน้าที่`,
        onClose: () => {},
      });
      return;
    }
    (document?.getElementById("my_modal_1") as HTMLDialogElement)?.close();
    showDialog({
      ID: "loginSuccess",
      Header: "แจ้งเตือน",
      Type: "success",
      Message: `เข้าสู่ระบบสำเร็จ!`,
      onClose: () => {},
    });
  };
  return (
    <dialog id="my_modal_1" className="modal">
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
              type="password"
              name="Password"
              onChange={handleChange}
            />
            {/* <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" /> */}
            <div className="label">
              <span className="label-text-alt"></span>
              {/* <span className="label-text-alt">ลืมรหัสผ่าน</span> */}
            </div>
          </label>
          <button className="btn bg-yellow-600 m-4">เข้าสู่ระบบ</button>
        </form>
        <hr className="w-full text-center bg-black text-black h-[2px]" />
        <p className="text-end mt-1">
          ยังไม่ได้สมัครสมาชิก?
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
    </dialog>
  );
};

export default LoginUI;
