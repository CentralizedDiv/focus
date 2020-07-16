import { selector } from 'recoil';

import { getVehicleList } from '../../api/Vehicle';
import { Vehicle } from './model';

export const vehicleList = selector<Vehicle[]>({
  key: "vehicleList",
  get: async () => {
    const response = await getVehicleList();
    return response;
  },
});
