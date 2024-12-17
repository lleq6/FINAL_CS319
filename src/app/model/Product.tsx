export interface ProductInfo {
  Product_ID: string;
  Child_ID: string;
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
  c_id: number;
  c_name: string;
  s_id: number;
  s_name: string;
  cc_name: string;
  [key: string]: any;
}