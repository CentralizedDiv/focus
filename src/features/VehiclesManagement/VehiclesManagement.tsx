import './VehiclesManagement.scss';

import React, { useMemo, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import Button from '../../components/Button/Button';
import Drawer from '../../components/Drawer/Drawer';
import Table from '../../components/Table/Table';
import VehicleView, { VehicleViewHeader } from '../VehicleView/VehicleView';

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

export default function VehiclesManagement() {
  const [currentVehicle, setCurrentVehicle] = useState<{}>();

  const columns = useMemo(
    () => [
      { id: "make", label: "Marca" },
      { id: "model", label: "Modelo" },
      { id: "year", label: "Ano" },
      { id: "licensePlate", label: "Placa" },
      { id: "purchasePrice", label: "Preço de Compra" },
      { id: "purchaseDate", label: "Data de Compra" },
      {
        id: "actions",
        label: "",
        render: () => (
          <Button onClick={() => setCurrentVehicle({})}>
            <FaChevronRight />
          </Button>
        ),
      },
    ],
    []
  );

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
          onClickRow: () => setCurrentVehicle({}),
        }}
      />
      <Drawer
        isOpen={currentVehicle !== undefined}
        header={
          <VehicleViewHeader
            onSave={() => console.log("save")}
            onEdit={() => console.log("edit")}
            onCancel={() => console.log("cancel")}
          />
        }
      >
        <VehicleView
          make="FIAT"
          model="UNO"
          year="2011"
          purchaseDate="20/01/2020"
          purchasePrice="R$ 20.000,00"
          isDocOk={true}
          saleDate="25/02/2020"
          salePrice="R$ 23.000,00"
        />
      </Drawer>
    </div>
  );
}
