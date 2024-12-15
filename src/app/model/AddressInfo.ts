export default class AddressInfo {
  Address_ID: string = "";
  User_ID: string = "";
  Address_1: string = "";
  Address_2: string = "";
  District: string = "";
  Province: string = "";
  Zip_Code: string = "";
  Is_Default: boolean = false;
  Sub_District: string = "";
  Phone: string = "";
  [Key: string]: string | number | boolean;
}
