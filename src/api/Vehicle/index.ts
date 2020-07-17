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
          costs: [
            { label: "Valor de Compra", value: 20000 },
            { label: "Documentação", value: 500 },
            { label: "Preparação", value: 200 },
            { label: "Lanternagem", value: 150 },
            { label: "Mecânica", value: 100 },
            { label: "Combustível", value: 50 },
          ],
        },
      ]);
    }, 1000)
  );
}
