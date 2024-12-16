import { MdErrorOutline } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import { useDialog } from "../context/DialogContext";

const DialogMessage: React.FC = () => {
  const { dialog, dialogRef, closeDialog } = useDialog();
  if (!dialog) return null;
  return (
    <dialog id={dialog.ID} ref={dialogRef} className="modal">
      <div className="modal-box">
        <div className="flex items-center">
          {dialog.Type === "error" ? (
            <MdErrorOutline className="text-red-800 mr-3 text-2xl" />
          ) : dialog.Type === "info" ? (
            <FaInfoCircle className="text-blue-700 mr-3 text-2xl" />
          ) : (
            <AiOutlineWarning className="text-yellow-600 mr-3 text-2xl" />
          )}
          <h3 className="font-bold text-lg">{dialog.Header}</h3>
        </div>
        {dialog.Message.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
        <div className="modal-action">
          {dialog.onConfirm && (
            <button
              onClick={() => {
                dialog.onConfirm?.();
                closeDialog();
              }}
              className="btn bg-green-500"
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
              className="btn bg-red-500"
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
              className="btn bg-green-500"
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
