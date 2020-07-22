export type DocStatus = "OK";
export type Transaction = {
  price: number;
  date: number;
};
export type Cost = {
  label: string;
  value: number;
  undeleatable?: boolean;
};
export type Buyer = {
  name: string;
  phone: string;
  cpf: string;
};
export interface Vehicle {
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  docStatus: DocStatus;
  purchase: Transaction;
  sale?: Transaction & { buyer: Buyer };
  costs: Cost[];
  picture?: string;
}
