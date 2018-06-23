import { ICategory } from "./category.interface";
import { DictionaryIteratee } from "lodash";

export interface IExpense {
  price: number,
  note: string,
  category: ICategory,
  date: Date|any
}