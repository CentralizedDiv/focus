import './VehiclesManagement.scss';

import React, { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';

import Button from '../../components/Button/Button';
import { useDrawer } from '../../components/Drawer/Drawer';
import Table from '../../components/Table/Table';
import VehicleView from '../VehicleView/VehicleView';

export default function VehiclesManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const { show } = useDrawer();

  useEffect(() => {
    editVehicle({ name: "Fiat Uno 2011" });
  }, [isEditing]);

  const columns = [
    { id: "make", label: "Marca" },
    { id: "model", label: "Modelo" },
    { id: "year", label: "Ano" },
    { id: "licensePlate", label: "Placa" },
    { id: "purchasePrice", label: "Preço de Compra" },
    { id: "purchaseDate", label: "Data de Compra" },
    {
      id: "actions",
      label: "",
      render: () => <Button onClick={() => editVehicle({ name: "Fiat Uno 2011" })}>Editar</Button>,
    },
  ];
  const data = [
    {
      make: "Fiat",
      model: "Uno",
      year: "2011",
      licensePlate: "HSV-1987",
      purchasePrice: "R$ 20.000,00",
      purchaseDate: "01/01/2020",
    },
    {
      make: "Fiat",
      model: "Uno",
      year: "2011",
      licensePlate: "HSV-1987",
      purchasePrice: "R$ 20.000,00",
      purchaseDate: "01/01/2020",
    },
    {
      make: "Fiat",
      model: "Uno",
      year: "2011",
      licensePlate: "HSV-1987",
      purchasePrice: "R$ 20.000,00",
      purchaseDate: "01/01/2020",
    },
    {
      make: "Fiat",
      model: "Uno",
      year: "2011",
      licensePlate: "HSV-1987",
      purchasePrice: "R$ 20.000,00",
      purchaseDate: "01/01/2020",
    },
  ];

  const editVehicle = (vehicle: any) => {
    show(
      <VehicleView
        {...{
          make: "FIAT",
          model: "UNO",
          year: "2011",
          purchaseDate: "20/01/2020",
          purchasePrice: "R$ 20.000,00",
          isDocOk: true,
          saleDate: "",
          salePrice: "R$ 23.000,00",
        }}
      />,
      <div className="VehiclesManagement-header">
        <span>{vehicle.name}</span>
        <div className="VehiclesManagement-headerIcons">
          {isEditing ? (
            <>
              <FaTimes onClick={() => setIsEditing(false)} />
              <FaCheck onClick={() => setIsEditing(false)} />
            </>
          ) : (
            <FaEdit onClick={() => setIsEditing(true)} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="VehiclesManagement">
      <h2>Gerenciamento de Veículos</h2>
      <Table
        columns={columns}
        data={data}
        mobile={{
          rotationLabel: "Comparar",
          mainColumn: (row: any) => (
            <span>
              {row.make} {row.model}
            </span>
          ),
          secondaryColumn: "year",
          defaultRotationColumn: "purchasePrice",
          hiddenColumns: ["make", "model", "actions"],
          onClickRow: () => editVehicle({ name: "Fiat Uno 2011" }),
        }}
      />
    </div>
  );
}
