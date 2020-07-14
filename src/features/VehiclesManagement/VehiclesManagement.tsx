import './VehiclesManagement.scss';

import React, { useState } from 'react';
import { FaCheck, FaChevronRight, FaEdit, FaTimes } from 'react-icons/fa';

import Button from '../../components/Button/Button';
import { useDrawer } from '../../components/Drawer/Drawer';
import Table from '../../components/Table/Table';
import VehicleView from '../VehicleView/VehicleView';

function VehicleViewHeader(props: { vehicle: { name: string } }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="VehiclesManagement-header">
      <span>Visualizar veículo</span>
      <div className="VehiclesManagement-headerIcons">
        {isEditing ? (
          <>
            <Button onClick={() => setIsEditing(false)} icon={<FaCheck />} inverse={true}>
              Salvar
            </Button>
            <Button onClick={() => setIsEditing(false)}>
              <FaTimes />
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} icon={<FaEdit />} inverse={true}>
            Editar
          </Button>
        )}
      </div>
    </div>
  );
}

export default function VehiclesManagement() {
  const { show } = useDrawer();

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
      render: () => (
        <Button onClick={() => editVehicle({ name: "Fiat Uno 2011" })}>
          <FaChevronRight />
        </Button>
      ),
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
          saleDate: "25/02/2020",
          salePrice: "R$ 23.000,00",
        }}
      />,
      <VehicleViewHeader vehicle={vehicle} />
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
