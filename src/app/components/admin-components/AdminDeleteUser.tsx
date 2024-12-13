export function AdminDeleteUser({ User_ID, setDeleteUser }: any) {
  async function OnDeleteUser(User_ID: string) {
    try {
      const response = await fetch(`/api/admin/deleteUser`, {
        method: "POST",
        body: JSON.stringify({
          User_ID: User_ID,
        }),
      });
      if (!response.ok) throw new Error("ERROR");
      const data = await response.status;
      if (data == 200) {
        document?.getElementById("deleteUser").close();
        document?.getElementById("deleteSuccess").showModal();
        setDeleteUser(0)
      }
    } catch (ex) {
      console.error(ex);
    }
  }  
  return (
    <dialog id='deleteUser' className="modal bg-[#0006]">
    <div className="modal-box">
      <h3 className="font-bold text-lg">ลบบัญชีผู้ใช้งาน</h3>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
          ✕
        </button>
      </form>
      <h3 className="font-bold text-lg">
        คุณต้องการลบบัญชีผู้ใช้ User ID: {User_ID} ใช่ไหม?
      </h3>
      <button
        className="btn bg-yellow-500"
        onClick={() => {
          OnDeleteUser(User_ID);
        }}
      >
        ยืนยัน
      </button>
      <button
        className="btn bg-red-500"
        onClick={() => {
          document?.getElementById("deleteUser").close();

        }}
      >
        ยกเลิก
      </button>
    </div>
    </dialog>
  );
}

export function AdminDeleteSuccess() {
  return (
    <dialog id="deleteSuccess" className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg">ลบบัญชีผู้ใช้งาน</h3>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
          ✕
        </button>
      </form>
      <h3 className="font-bold text-lg">
        ลบบัญชีผู้ใช้สำเร็จ!
      </h3>
      <button
        className="btn bg-green-500"
        onClick={() => {
          document?.getElementById("deleteSuccess").close();
        }}
      >
        ปิด
      </button>
    </div>
    </dialog>
  );
}
