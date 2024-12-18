export interface ProductInfo {
  Product_ID: string;
  Child_ID: number;
  Name: string;
  Brand: string;
  Description: string;
  Unit: string;
  Quantity: number;
  Sale_Cost: number;
  Sale_Price: number;
  Reorder_Point: number;
  Visibility: boolean;
  Review_Rating: number;
  Image_URL: string;
  C_ID: number;
  C_Name: string;
  S_ID: number;
  S_Name: string;
  CC_Name: string;
  [key: string]: any;
}