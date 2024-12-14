export function AdminAddWarning() {
  return (
    <dialog id="addWarning" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">เพิ่มบัญชีผู้ใช้งาน</h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">กรุณากรอกข้อมูลให้ครบ!</h3>
        <button
          className="btn bg-green-500"
          onClick={() => {
            (
              document.getElementById("addWarning") as HTMLDialogElement
            ).close();
          }}
        >
          ปิด
        </button>
      </div>
    </dialog>
  );
}

export function AdminAddSuccess() {
  return (
    <dialog id="addSuccess" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">เพิ่มบัญชีผู้ใช้งาน</h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">เพิ่มบัญชีผู้ใช้งานสำเร็จ!</h3>
        <button
          className="btn bg-green-500"
          onClick={() => {
            (
              document.getElementById("addSuccess") as HTMLDialogElement
            ).close();
          }}
        >
          ปิด
        </button>
      </div>
    </dialog>
  );
}

export function AdminAddFail() {
  return (
    <dialog id="addFailure" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">เพิ่มบัญชีผู้ใช้งาน</h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">เพิ่มบัญชีผู้ใช้งานล้มเหลว!</h3>
        <button
          className="btn bg-green-500"
          onClick={() => {
            (
              document.getElementById("addFailure") as HTMLDialogElement
            ).close();
          }}
        >
          ปิด
        </button>
      </div>
    </dialog>
  );
}

export function AdminAddUserAlready({ Username } : any) {
    return (
      <dialog id="addUserAlready" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เพิ่มบัญชีผู้ใช้งาน</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">มีชื่อบัญชีผู้ใช้งาน '{Username}' อยู่ในระบบแล้ว!</h3>
          <button
            className="btn bg-green-500"
            onClick={() => {
              (
                document.getElementById("addUserAlready") as HTMLDialogElement
              ).close();
            }}
          >
            ปิด
          </button>
        </div>
      </dialog>
    );
  }
