import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import AddressInfo from "../model/AddressInfo";
import { useDialog } from "../context/DialogContext";
import ProvinceSelector from "./ProvinceSelector";
import {
  isEmptyAddressData,
  isValidPhone,
  isValidZipCode,
} from "../api/lib/utils";

interface AddressCreateOrChangeProps {
  UserID: string;
  Address?: AddressInfo;
  setAddress?: (address: AddressInfo) => void;
  setAddresses?: Dispatch<SetStateAction<AddressInfo[]>>;
}

const UserAddressCreateOrChange = ({
  UserID,
  Address,
  setAddress,
  setAddresses,
}: AddressCreateOrChangeProps) => {
  const { showDialog } = useDialog();
  const [localAddress, setLocalAddress] = useState<AddressInfo>(
    Address || {
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
    }
  );
  const [btnState, setButtonState] = useState(false);

  useEffect(() => {
    if (Address) {
      setLocalAddress(Address);
    }
  }, [Address]);

  useEffect(() => {}, [localAddress]);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setLocalAddress({
      ...localAddress,
      [name]: value,
    });
    setButtonState(true);
  }

  function onClickCreate(e: FormEvent<HTMLFormElement>) {
    async function onCreate() {
      const response = await fetch("/api/user/addAddress", {
        method: "POST",
        body: JSON.stringify(localAddress),
      });
      if (response.ok) {
        const { Address_ID } = await response.json();
        if (setAddresses) {
          setAddresses((old) => [
            ...old,
            { ...localAddress, Address_ID: Address_ID },
          ]);
        }
        if (setAddress) {
          setAddress(localAddress);
        }
        showDialog({
          ID: "createAddressSuccess",
          Header: "แจ้งเตือน",
          Type: "success",
          Message: `บันทึกข้อมูลการเพิ่มที่อยู่ใหม่สำเร็จ!`,
          onClose: () => {
            (
              document.getElementById("address-modal-edit") as HTMLDialogElement
            ).close();
          },
        });
      } else {
        showDialog({
          ID: "createAddressFailure",
          Header: "แจ้งเตือน",
          Type: "error",
          Message: `บันทึกข้อมูลการเพิ่มที่อยู่ใหม่ล้มเหลว!`,
          onClose: () => {},
        });
      }
    }
    e.preventDefault();
    if (isEmptyAddressData(localAddress)) {
      showDialog({
        ID: "createAddressDataEmpty",
        Header: "แจ้งเตือน",
        Type: "warning",
        Message: `กรุณากรอกข้อมูลให้ครบ!`,
        onClose: () => {},
      });
      return;
    }
    if (!isValidZipCode(localAddress.Zip_Code)) {
      showDialog({
        ID: "createAddressZipCodeInvalid",
        Header: "แจ้งเตือน",
        Type: "warning",
        Message: `กรุณากรอกข้อมูลรหัสไปรษณีย์ให้ถูกต้อง!`,
        onClose: () => {},
      });
      return;
    }
    if (!isValidPhone(localAddress.Phone)) {
      showDialog({
        ID: "createAddressPhoneInvalid",
        Header: "แจ้งเตือน",
        Type: "warning",
        Message: `กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ถูกต้อง!`,
        onClose: () => {},
      });
      return;
    }
    onCreate();
  }

  function onClickSave(e: FormEvent<HTMLFormElement>) {
    async function onChange() {
      const response = await fetch("/api/user/editAddress", {
        method: "POST",
        body: JSON.stringify(localAddress),
      });
      if (response.ok) {
        if (setAddresses) {
          setAddresses((old) =>
            old.map((e: AddressInfo) => {
              if (e.Address_ID == localAddress.Address_ID) {
                return localAddress;
              }
              return e;
            })
          );
        }
        showDialog({
          ID: "saveAddressSuccess",
          Header: "แจ้งเตือน",
          Type: "success",
          Message: `บันทึกข้อมูลการแก้ไขที่อยู่สำเร็จ!`,
          onClose: () => {
            (
              document.getElementById("address-modal-edit") as HTMLDialogElement
            ).close();
          },
        });
      } else {
        showDialog({
          ID: "saveAddressFailure",
          Header: "แจ้งเตือน",
          Type: "error",
          Message: `บันทึกข้อมูลการแก้ไขที่อยู่ล้มเหลว!`,
          onClose: () => {},
        });
      }
    }
    e.preventDefault();
    if (isEmptyAddressData(localAddress)) {
      showDialog({
        ID: "saveAddressDataEmpty",
        Header: "แจ้งเตือน",
        Type: "warning",
        Message: `กรุณากรอกข้อมูลให้ครบ!`,
        onClose: () => {},
      });
      return;
    }
    if (!isValidZipCode(localAddress.Zip_Code)) {
      showDialog({
        ID: "saveAddressZipCodeInvalid",
        Header: "แจ้งเตือน",
        Type: "warning",
        Message: `กรุณากรอกข้อมูลรหัสไปรษณีย์ให้ถูกต้อง!`,
        onClose: () => {},
      });
      return;
    }
    if (!isValidPhone(localAddress.Phone)) {
      showDialog({
        ID: "saveAddressPhoneInvalid",
        Header: "แจ้งเตือน",
        Type: "warning",
        Message: `กรุณากรอกข้อมูลเบอร์โทรศัพท์ให้ถูกต้อง!`,
        onClose: () => {},
      });
      return;
    }
    onChange();
  }

  return (
    <div className="modal-box w-11/12 max-w-4xl [&>lebel]:mx-auto">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none">
          ✕
        </button>
      </form>
      {Address?.Address_ID == "" ? (
        <h3 className="font-bold text-lg">เพิ่มที่อยู่ใหม่</h3>
      ) : (
        <h3 className="font-bold text-lg">แก้ไขที่อยู่</h3>
      )}

      <label className="form-control w-full max-w-[35rem] m-auto">
        <div className="label">
          <span className="label-text">ที่อยู่ : 1</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-11/12"
          name="Address_1"
          value={localAddress.Address_1}
          onChange={handleChange}
        />
      </label>

      <label className="form-control w-full max-w-[35rem] m-auto">
        <div className="label">
          <span className="label-text">ที่อยู่ : 2</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-11/12"
          name="Address_2"
          value={localAddress.Address_2}
          onChange={handleChange}
        />
      </label>

      <label className="form-control w-full max-w-[34rem] mx-auto">
        <ProvinceSelector
          address={localAddress}
          setAddress={setLocalAddress}
        ></ProvinceSelector>
      </label>

      <div className="flex space-x-3 max-w-[34rem] mx-auto">
        <label className="form-control w-full mx-auto ">
          <div className="label">
            <span className="label-text">รหัสไปรษณีย์</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-11/12"
            name="Zip_Code"
            value={localAddress.Zip_Code}
            onChange={handleChange}
          />
        </label>
        <label className="form-control w-full mx-auto">
          <div className="label">
            <span className="label-text">เบอร์โทร</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-11/12"
            name="Phone"
            value={localAddress.Phone}
            onChange={handleChange}
          />
        </label>
      </div>

      {!(Address?.Address_ID == "") ? (
        <form onSubmit={onClickSave}>
          <div className="modal-action">
            <button
              className="btn bg-yellow-500"
              type="submit"
              disabled={!btnState}
            >
              บันทึกการแก้ไข
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onClickCreate}>
          <div className="modal-action">
            <button
              className="btn bg-green-500"
              type="submit"
              disabled={!btnState}
            >
              เพิ่มที่อยู่ใหม่
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserAddressCreateOrChange;
