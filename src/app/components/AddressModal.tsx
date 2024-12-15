import { FaEdit, FaTrash, FaCheckCircle, FaMinusCircle } from "react-icons/fa";
import AddressEditModal from "./AddressAddedModal";
import UserAddress from "@/app/model/AddressModel";
import { SetStateAction, useState } from "react";


interface AddressModalProps {
  userID: string;
  userAddresses: UserAddress[];
  setAddresses: React.Dispatch<SetStateAction<UserAddress[]>>;
  setCurAddress: (address: UserAddress) => void;
}

export default function AddressModal({
  userID,
  userAddresses,
  setAddresses,
  setCurAddress,
}: AddressModalProps) {
  const [address, setAddress] = useState<UserAddress | boolean>(false);
  // console.log(userID,'loguser')
  const emptyAddress = {
    User_ID: userID,
    Address_ID: "",
    Address_1: "",
    Address_2: "",
    Province: "",
    District: "",
    Sub_District: "",
    Zip_Code: "",
    Phone: "",
    Is_Default: false,
  }
  function AddressBox({
    address,
    setCurAddress,
  }: {
    address: UserAddress;
    setCurAddress: (address: UserAddress) => void;
  }) {
    return (
      <div
        className={`grid grid-cols-[1fr_9fr_1fr] border border-1 rounded-lg p-2 my-2 content-center hover:border-green-500 ${
          address.Is_Default ? "border-green-500 border-2" : ""
        }`}
        onClick={() => {
          setCurAddress(address);
          setAddresses((old) =>
            old.map((e: UserAddress) => {
              if (e.Address_ID === address.Address_ID) {
                e.Is_Default = true;
              } else {
                e.Is_Default = false;
              }
              return e;
            })
          );
        }}
      >
        <div className="flex content-center">
          {address.Is_Default ? (
            <FaCheckCircle className="m-auto text-3xl text-green-700" />
          ) : (
            <FaMinusCircle className="m-auto text-2xl hover:text-green-700 hover:text-3xl" />
          )}
        </div>
        <dialog id={`del${address.Address_ID}`} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">
              คุณต้องการลบที่อยู่?
            </h3>
            <p className="py-4">คุณต้องการลบที่อยู่นี้ใช่หรือไม่</p>
            <p className="">
              {address.Address_1} {address.Address_2}
            </p>
            <p className="">
              {address.District} {address.Sub_District} {address.Province}
            </p>
            <div className="modal-action">
              <form method="dialog" className="flex space-x-5">
                <button
                  className="btn bg-red-500 px-5"
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/user/deleteAddress", {
                        method: "POST",
                        body: JSON.stringify({
                          Address_ID: address.Address_ID,
                        }),
                      });
                      if (response.ok) {
                        setAddresses((old) =>
                          old.filter((e) => e.Address_ID !== address.Address_ID)
                        );
                        return alert("ลบที่อยู่สำเร็จ");
                      }
                      return alert("ลบที่อยู่ไม่สำเร็จ");
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  ลบ
                </button>
                <button className="btn">ปิด</button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="">
          <p>{address.Address_1}</p>
          <p>{address.Address_2}</p>
          <p>
            {address.District} {address.Sub_District} {address.Province}{" "}
            {address.Zip_Code}
          </p>
          <p>ติดต่อ : {address.Phone}</p>
        </div>
        <div className="flex flex-col content-center">
          <a
            className="link link-hover flex text-end my-auto mx-3"
            onClick={(event) => {
              event.stopPropagation();
              setAddress(address);
              (
                document.getElementById(
                  "address-modal-edit"
                ) as HTMLDialogElement
              ).showModal();
            }}
          >
            <FaEdit className="my-auto text-xl" />
            แก้ไข
          </a>
          <a
            className="link link-hover flex text-end my-auto mx-3"
            onClick={(event) => {
              event.stopPropagation();
              (
                document.getElementById(
                  `del${address.Address_ID}`
                ) as HTMLDialogElement
              ).showModal();
            }}
          >
            <FaTrash className="my-auto text-xl" />
            ลบ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <dialog id="address-modal-edit" className="modal">
        <AddressEditModal
          UserID={userID}
          Address={address}
          setAddress={setAddress}
          isAddNew={true}
          setAddressList={setAddresses}
        />
      </dialog>

      <dialog id="address-modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">ที่อยู่ในการจัดส่ง</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
              ✕
            </button>
          </form>
          {userAddresses.map((address: UserAddress) => (
            <AddressBox
              key={address.Address_ID}
              address={address}
              setCurAddress={setCurAddress}
            />
          ))}
          <div
            className="grid grid-cols-[9fr_1fr] border border-1 rounded-lg p-2 my-2 content-center py-5 hover:border-green-500 hover:text-green-500 text-center"
            onClick={() => {
              setAddress(emptyAddress);
              (
                document.getElementById(
                  "address-modal-edit"
                ) as HTMLDialogElement
              ).showModal();
            }}
          >
            <h1 className="font-bold text-base">เพิ่มที่อยู่ใหม่ +</h1>
          </div>
          <div className="modal-action sticky bottom-0">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
