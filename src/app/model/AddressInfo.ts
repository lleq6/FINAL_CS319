export default class AddressInfo {
  Address_ID: string = "";
  User_ID: string = "";
  Address_1: string = "";
  Address_2: string = "";
  District: string = "";
  Sub_District: string = "";
  Province: string = "";
  Zip_Code: string = "";
  Phone: string = "";
  Is_Default: boolean = false;
  [Key: string]: string | number | boolean;
}
