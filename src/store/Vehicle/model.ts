export type DocStatus = "OK";
export type Transaction = {
  price: number;
  date: number;
};
export interface Vehicle {
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  docStatus: DocStatus;
  purchase: Transaction;
  sale: Transaction;
  costs: { [key: string]: number };
}
