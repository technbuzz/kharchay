export interface ICategory {
  title: string,
  subCategory?: SubCategory
}

interface SubCategory extends ICategory{}

