export interface ChildCategory {
  Child_ID: string;
  Name: string;
}

export interface SubCategory {
  Sub_Category_ID: string;
  Name: string;
  ChildCategory: ChildCategory[];
}

export interface CategoryList {
  Category_ID: string;
  Name: string;
  Sub_Category: SubCategory[];
}
