export interface ChildCategory {
  Child_ID: number;
  Name: string;
}

export interface SubCategory {
  Sub_Category_ID: number;
  Name: string;
  ChildCategory: ChildCategory[];
}

export interface CategoryList {
  Category_ID: number;
  Name: string;
  Sub_Category: SubCategory[];
}
