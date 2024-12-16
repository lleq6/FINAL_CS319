import { VscInfo, VscError, VscWarning, VscPass } from "react-icons/vsc";
import { useDialog } from "../context/DialogContext";

const DialogMessage: React.FC = () => {
  const { dialog, dialogRef, closeDialog } = useDialog();
  if (!dialog) return null;
  return (
    <dialog id={dialog.ID} ref={dialogRef} className="modal">
      <div className="modal-box flex flex-col items-center text-center">
        <div className="p-2 mb-2">
          {dialog.Type === "error" ? (
            <VscError className="text-red-500 text-8xl" />
          ) : dialog.Type === "info" ? (
            <VscInfo className="text-blue-500 text-8xl" />
          ) : dialog.Type === "success" ? (
            <VscPass className="text-green-500 text-8xl" />
          ) : (
            <VscWarning className="text-yellow-500 text-8xl" />
          )}
        </div>
        <h3 className="font-bold text-2xl mb-2">{dialog.Header}</h3>
        <p className="text-lg mb-6 text-gray-700">
          {dialog.Message.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div className="flex gap-4">
          {dialog.onConfirm && (
            <button
              onClick={() => {
                dialog.onConfirm?.();
                closeDialog();
              }}
              className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              ยืนยัน
            </button>
          )}
          {dialog.onCancel && (
            <button
              onClick={() => {
                dialog.onCancel?.();
                closeDialog();
              }}
              className="btn bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
            >
              ยกเลิก
            </button>
          )}
          {dialog.onClose && (
            <button
              onClick={() => {
                dialog.onClose?.();
                closeDialog();
              }}
              className="btn bg-green-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
            >
              ปิด
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default DialogMessage;
