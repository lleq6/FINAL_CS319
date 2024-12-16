import AddressInfo from "@/app/model/AddressInfo";
import UserInfo from "@/app/model/UserInfo";
import { createHmac } from "crypto";
require("dotenv").config();

const phoneRegex = /^\d{10}$/;
const zipCodeRegex = /^\d{5}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  return phoneRegex.test(phone.replace(/[^0-9]/g, ""));
};

const isValidZipCode = (zipCode: string): boolean => {
  return zipCodeRegex.test(zipCode);
};

const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substr(2, 5);
  return `${timestamp}${randomNum}`;
};

const isEmptyUserData = (User: UserInfo) => {
  let isEmpty: boolean = false;
  for (const key in User) {
    if (key === "User_ID" || key === "Access_Level") {
      continue;
    }
    if (User[key as keyof UserInfo] === "") {
      isEmpty = true;
    }
  }
  return isEmpty;
};

const isEmptyAddressData = (Address: AddressInfo) => {
  let isEmpty: boolean = false;
  console.log(Address);
  for (const key in Address) {
    if (key === "Address_ID") {
      continue;
    }
    if (Address[key as keyof AddressInfo] === "") {
      isEmpty = true;
    }
  }
  return isEmpty;
};

const hashMD5 = (plaintext: string, salt: string = process.env.SALT_SECRET!): string => {
  const hash = createHmac('md5', salt);
  hash.update(plaintext);
  return hash.digest('hex');
};

export { generateOrderId, isEmptyUserData, isEmptyAddressData, hashMD5, isValidEmail, isValidPhone, isValidZipCode };
