import { Vehicle } from '../../store/Vehicle/model';

export function getVehicleList(): Promise<Vehicle[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          make: "Fiat",
          model: "Uno",
          year: "2012",
          licensePlate: "HSV1987",
          docStatus: "OK",
          purchase: {
            price: 20000,
            date: 1578268800000,
          },
          sale: {
            price: 23000,
            date: 1579068800000,
          },
          costs: {
            Documentação: 500,
            Preparação: 200,
            Lanternagem: 150,
            Mecânica: 100,
            Combustível: 50,
          },
        },
      ]);
    }, 1000)
  );
}
