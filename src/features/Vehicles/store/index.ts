import { Vehicle } from 'entities/Vehicle/models';
import { atom, selector } from 'recoil';

import { getVehicleList } from '../../../api/Vehicle';

export const $vehicleList = selector<Vehicle[]>({
  key: "vehicleList",
  get: async () => {
    const response = await getVehicleList();
    return response;
  },
});

export const $searchQuery = atom<string>({
  key: "searchQuery",
  default: "",
});

export const $filteredVehicleList = selector<Vehicle[]>({
  key: "filteredVehicleList",
  get: ({ get }) => {
    const searchQuery = get($searchQuery);
    const vehicleList = get($vehicleList);
    return vehicleList.filter(
      (v) =>
        v.model.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
        v.licensePlate.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    );
  },
});

export const $currentVehicle = atom<null | Vehicle>({
  key: "currentVehicle",
  default: null,
});

export const $isCreating = atom<boolean>({
  key: "isCreating",
  default: false,
});

export const $isEditing = atom<boolean>({
  key: "isEditing",
  default: false,
});

export const $forceDrawer = atom<boolean | undefined>({
  key: "forceDrawer",
  default: undefined,
});

export const $isDrawerOpen = selector<boolean>({
  key: "isDrawerOpen",
  get: ({ get }) => {
    const forceDrawer = get($forceDrawer);
    if (forceDrawer !== undefined) {
      return forceDrawer;
    }

    const isEditing = get($isEditing);
    const isCreating = get($isCreating);
    const currentVehicle = get($currentVehicle);

    return isEditing || isCreating || currentVehicle !== null;
  },
});
