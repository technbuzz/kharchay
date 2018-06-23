import { IExpense } from "../../shared/expense.interface";

export interface Expense extends IExpense {
  id?: string,
  dateModified?: string
}

