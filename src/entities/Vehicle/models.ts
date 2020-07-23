export type Person = {
  name: string;
  phone?: string;
  cpf?: string;
  email?: string;
};

export type Transaction = {
  price: string;
  date: string;
  buyer?: Person;
  seller?: Person;
};

export type Cost = {
  label: string;
  value: string;
};

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  docStatus: string;
  purchase: Transaction;
  sale?: Transaction;
  costs: Cost[];
  picture?: string;
}
