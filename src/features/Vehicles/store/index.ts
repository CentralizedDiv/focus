import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { getVehicleList, vehiclesCollection } from '../../../api/Vehicle';

import { Vehicle } from 'entities/Vehicle/models';
import { useEffect } from 'react';
import { useOnAll } from '@typesaurus/react';

// Vehicles
const vehiclesAtom = atom<Vehicle[] | undefined>({
  key: 'vehiclesAtom',
  default: undefined,
});

const $vehicles = selector<Vehicle[]>({
  key: 'vehicleList',
  get: async ({ get }) => {
    let vehicles = get(vehiclesAtom);
    if (!vehicles) {
      vehicles = await getVehicleList();
    }
    return vehicles;
  },
  set: ({ set }, newValue) => {
    set(vehiclesAtom, newValue);
  },
});

const $filteredVehicleList = selector<Vehicle[]>({
  key: 'filteredVehicleList',
  get: async ({ get }) => {
    const searchQuery = get($searchQuery);
    const vehicleList = get($vehicles);
    return vehicleList.filter(
      (v) =>
        v.make.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
        v.model.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
        v.licensePlate.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    );
  },
});

export const $searchQuery = atom<string>({
  key: 'searchQuery',
  default: '',
});

export const useVehicles = () => {
  const vehiclesDocs = useOnAll(vehiclesCollection);
  const filteredVehicleList = useRecoilValue($filteredVehicleList);
  const setVehicleList = useSetRecoilState($vehicles);

  useEffect(() => {
    if (vehiclesDocs) {
      setVehicleList(vehiclesDocs.map((v) => ({ ...v.data, id: v.ref.id })));
    }
  }, [vehiclesDocs, setVehicleList]);

  const sortVehicles = (a: Vehicle, b: Vehicle) => {
    if (a.make === b.make) {
      return a.model.localeCompare(b.model);
    } else {
      return a.make.localeCompare(b.make);
    }
  };

  return [...filteredVehicleList].sort(sortVehicles);
};

// UI
export const $currentVehicle = atom<null | Vehicle>({
  key: 'currentVehicle',
  default: null,
});

export const $isCreating = atom<boolean>({
  key: 'isCreating',
  default: false,
});

export const $isEditing = atom<boolean>({
  key: 'isEditing',
  default: false,
});

export const $forceDrawer = atom<boolean | undefined>({
  key: 'forceDrawer',
  default: undefined,
});

export const $isDrawerOpen = selector<boolean>({
  key: 'isDrawerOpen',
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
