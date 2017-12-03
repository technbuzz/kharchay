export interface Expense {
  id?: string,
  category: string,
  note?: string,
  price: number,
  dateCreated?: Date,
  dateModified?: Date
}