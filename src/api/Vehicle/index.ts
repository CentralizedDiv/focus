import { Vehicle } from 'entities/Vehicle/models';
import { storage } from 'firebase-config';
import { add, all, collection, remove, update } from 'typesaurus';

export const vehiclesCollection = collection<Vehicle>("vehicles");

export function getVehicleList() {
  return all(vehiclesCollection).then((docs) => docs.map((v) => ({ ...v.data, id: v.ref.id })));
}

export async function saveVehicle(vehicle: Vehicle) {
  let picture = vehicle.picture;
  if (picture && !picture.includes("firebasestorage.googleapis.com")) {
    const upload = await storage
      .child(`${vehicle.model}${vehicle.year}${vehicle.licensePlate}.jpg`.toLowerCase())
      .putString(picture, "data_url");
    picture = await upload.ref.getDownloadURL();
  }
  if (vehicle.id) {
    return update(vehiclesCollection, vehicle.id, { ...vehicle, picture });
  } else {
    return add(vehiclesCollection, { ...vehicle, picture });
  }
}

export function deleteVehicle(vehicle: Vehicle) {
  if (vehicle.id) {
    return remove(vehiclesCollection, vehicle.id);
  }
}
