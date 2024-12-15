import { FaInfoCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

interface alertModalProps {
  id: string;
  header: string;
  message: string;
  errorStatus: boolean;
  callback?: ()=>void
}

export default function AlertModal(props: alertModalProps) {
  return (
    <dialog id={props.id} className="modal">
      <div className="modal-box">
        <div className="flex">
          {props.errorStatus ? (
            <MdErrorOutline className="text-red-800 my-auto mr-3 text-[2rem] -p-2" />
          ) : (
            <FaInfoCircle className="text-blue-700 my-auto mr-3 text-[2rem] -p-2" />
          )}
          <h3 className="font-bold text-lg">{props.header}</h3>
        </div>
        <p className="py-4">{props.message}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn"
            >ปิด</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
