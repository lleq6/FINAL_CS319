interface Child {
    Child_ID: string;
    Child_Name: string;
}

interface SubCategory {
    Sub_ID: string;
    Sub_Name: string;
    Child: Child[];
}

export interface CategoryList {
    Category_ID: string;
    Category_Name: string;
    Sub_Category: SubCategory[];
}
