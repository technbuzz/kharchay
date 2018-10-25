import { ICategory } from "./category.interface";

export interface IExpense {
  price: number,
  note: string,
  category: ICategory,
  date: Date|any,
  details?: boolean,
  imageName: string,
  imageUrl: string
}