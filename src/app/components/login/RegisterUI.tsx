import { FormEvent, useState } from "react";

const RegisterUI = () => {
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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">สมัครสมาชิก</h3>
        {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/* <input type="text" /> */}
          <input
            className="input bg-slate-500"
            placeholder="อีเมลล์"
            type="text"
          />
          <div className="flex">
            <input
              className="input bg-slate-500 m-auto"
              placeholder="ชื่อ"
              type="text"
            />
            <input
              className="input bg-slate-500 m-auto"
              placeholder="นามสกุล"
              type="text"
            />
          </div>
          <input
            className="input bg-slate-500 "
            placeholder="วัน/เดือน/ปีเปิด"
            type="text"
          />
          <input
            className="input bg-slate-500 "
            placeholder="รหัสผ่าน"
            type="text"
          />
          <input
            className="input bg-slate-500 "
            placeholder="ยืนยันรหัสผ่าน"
            type="text"
          />
          <button className="btn">สมัครสมาชิก</button>
        </form>
        <hr className="w-full text-center bg-black text-black h-[2px]" />
        <p className="text-end">
          มีบัญชีผู้ใช้อยู่แล้ว?{" "}
          <a
            className="link"
            onClick={() => {
              (
                document?.getElementById("my_modal_2") as HTMLDialogElement
              ).close();
              (
                document?.getElementById("my_modal_1") as HTMLDialogElement
              ).showModal();
            }}
          >
            เข้าสู่ระบบ
          </a>
        </p>
      </div>
    </dialog>
  );
};

export default RegisterUI;
