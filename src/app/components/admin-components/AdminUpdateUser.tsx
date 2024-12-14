import UserInfo from "@/app/model/UserInfo";

export function AdminSaveUser({ UserData, isEditing, setState }: any) {
  async function OnUpdateUser(UserData: UserInfo) {
    try {
      const response = await fetch(`/api/admin/updateUser`, {
        method: "POST",
        body: JSON.stringify(UserData),
      });
      if (!response.ok) throw new Error("ERROR");
      const data = await response.status;
      if (data == 200) {
        (document?.getElementById("saveUser") as HTMLDialogElement).close();
        (
          document?.getElementById("saveSuccess") as HTMLDialogElement
        ).showModal();
        setState((isEditing = false));
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  return (
    <dialog id="saveUser" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">บันทึกข้อมูลบัญชีผู้ใช้งาน</h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">
          คุณต้องการบันทึกข้อมูลบัญชีผู้ใช้ User ID: {UserData.User_ID} ใช่ไหม?
        </h3>
        <button
          className="btn bg-yellow-500"
          onClick={() => {
            OnUpdateUser(UserData);
          }}
        >
          ยืนยัน
        </button>
        <button
          className="btn bg-red-500"
          onClick={() => {
            (document?.getElementById("saveUser") as HTMLDialogElement).close();
          }}
        >
          ยกเลิก
        </button>
      </div>
    </dialog>
  );
}

export function AdminSaveSuccess() {
  return (
    <dialog id="saveSuccess" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">บันทึกข้อมูลบัญชีผู้ใช้งาน</h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">บันทึกข้อมูลบัญชีผู้ใช้สำเร็จ!</h3>
        <button
          className="btn bg-green-500"
          onClick={() => {
            (
              document?.getElementById("saveSuccess") as HTMLDialogElement
            ).close();
          }}
        >
          ปิด
        </button>
      </div>
    </dialog>
  );
}
