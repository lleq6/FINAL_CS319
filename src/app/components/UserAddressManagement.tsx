import { SetStateAction, useEffect, useState } from "react";
import AddressInfo from "../model/AddressInfo";
import { FaCheckCircle, FaEdit, FaMinusCircle, FaTrash } from "react-icons/fa";
import { useDialog } from "../context/DialogContext";
import UserAddressCreateOrChange from "./UserAddressCreateOrChange";

interface UserAddressProps {
  UserID: string;
  Addresses: AddressInfo[];
  setAddresses?: React.Dispatch<SetStateAction<AddressInfo[]>>;
  setCurAddress?: (address: AddressInfo) => void;
}

interface UserAddressDetail {
  index: number;
  address: AddressInfo;
  setCurAddress?: (address: AddressInfo) => void;
}

const UserAddressManagement = ({
  UserID,
  Addresses,
  setAddresses,
  setCurAddress,
}: UserAddressProps) => {
  const { showDialog } = useDialog();
  const [address, setAddress] = useState<AddressInfo>();
  const emptyAddress = {
    User_ID: UserID,
    Address_ID: "",
    Address_1: "",
    Address_2: "",
    Province: "",
    District: "",
    Sub_District: "",
    Zip_Code: "",
    Phone: "",
    Is_Default: false,
  };

  const [oldAddress, setOldAddress] = useState<AddressInfo>();

  async function onChange(address: AddressInfo) {
    const response = await fetch("/api/user/editAddress", {
      method: "POST",
      body: JSON.stringify(address),
    });
    if (!response.ok) {
      showDialog({
        ID: "setDefaultAddressFailure",
        Header: "แจ้งเตือน",
        Type: "error",
        Message: `บันทึกข้อมูลที่อยู่เริ่มต้นล้มเหลว!`,
        onClose: () => {},
      });
    }
  }

  function AddressDetail({ index, address, setCurAddress }: UserAddressDetail) {
    useEffect(() => {
      if (address.Is_Default) {
        setOldAddress(address);
      }
    }, [address]);
    return (
      <div
        className={`grid grid-cols-[1fr_9fr_1fr] border border-1 rounded-lg p-2 my-2 content-center hover:border-green-500 ${
          address.Is_Default ? "border-green-500 border-2" : ""
        }`}
        onClick={() => {
          if (setCurAddress) {
            setCurAddress(address);
          }
          if (setAddresses) {
            setAddresses((old) =>
              old.map((e: AddressInfo) => {
                if (e.Address_ID === address.Address_ID) {
                  e.Is_Default = true;
                } else {
                  e.Is_Default = false;
                }
                return e;
              })
            );
          }
          if (oldAddress && oldAddress.Address_ID !== address.Address_ID) {
            onChange(oldAddress);
            onChange(address);
          }
        }}
      >
        <div className="flex content-center">
          {address.Is_Default ? (
            <FaCheckCircle className="m-auto text-3xl text-green-700" />
          ) : (
            <FaMinusCircle className="m-auto text-2xl hover:text-green-700 hover:text-3xl" />
          )}
        </div>

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
              showDialog({
                ID: `delAddress_${address.Address_ID}`,
                Header: `จัดการข้อมูลที่อยู่`,
                Type: "info",
                Message: `คุณยืนยันที่ต้องการลบที่อยู่ลำดับที่ '${
                  index + 1
                }' ใช่หรือไม่!`,
                onConfirm: async () => {
                  try {
                    const response = await fetch("/api/user/deleteAddress", {
                      method: "POST",
                      body: JSON.stringify({
                        Address_ID: address.Address_ID,
                      }),
                    });
                    if (response.ok) {
                      showDialog({
                        ID: "deleteAddressSuccess",
                        Header: "แจ้งเตือน",
                        Type: "success",
                        Message: `ลบข้อมูลที่อยู่สำเร็จ!`,
                        onClose: () => {},
                      });
                      if (setAddresses) {
                        setAddresses((old) =>
                          old.filter((e) => e.Address_ID !== address.Address_ID)
                        );
                      }
                    } else {
                      showDialog({
                        ID: "deleteAddressFailure",
                        Header: "แจ้งเตือน",
                        Type: "error",
                        Message: `ลบข้อมูลที่อยู่ล้มเหลว!`,
                        onClose: () => {},
                      });
                    }
                  } catch (error) {
                    showDialog({
                      ID: "deleteAddressError",
                      Header: "แจ้งเตือน",
                      Type: "error",
                      Message: `เกิดข้อผิดพลาดไม่สามารถลบข้อมูลที่อยู่ได้!`,
                      onClose: () => {},
                    });
                  }
                },
                onCancel: () => {},
              });
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
        <UserAddressCreateOrChange
          UserID={UserID}
          Address={address}
          setAddress={setAddress}
          setAddresses={setAddresses}
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
          {Addresses.map((address: AddressInfo, index) => (
            <AddressDetail
              key={address.Address_ID}
              index={index}
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
        </div>
      </dialog>
    </div>
  );
};

export default UserAddressManagement;
