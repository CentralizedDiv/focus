import './VehiclesManagement.scss';

import React from 'react';

import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';

export default function VehiclesManagement() {
  const columns = [
    { id: "make", label: "Marca" },
    { id: "model", label: "Modelo" },
    { id: "purchasePrice", label: "Preço de Compra" },
    { id: "purchaseDate", label: "Data de Compra" },
    { id: "actions", label: "" },
  ];
  const data = [
    {
      make: "Fiat",
      model: "Uno",
      purchasePrice: "R$ 20.000,00",
      purchaseDate: "01/01/2020",
      actions: <Button>Editar</Button>,
    },
    {
      make: "Fiat",
      model: "Uno",
      purchasePrice: "R$ 20.000,00",
      purchaseDate: "01/01/2020",
      actions: <Button>Editar</Button>,
    },
    {
      make: "Fiat",
      model: "Uno",
      purchasePrice: "R$ 20.000,00",
      purchaseDate: "01/01/2020",
      actions: <Button>Editar</Button>,
    },
    {
      make: "Fiat",
      model: "Uno",
      purchasePrice: "R$ 20.000,00",
      purchaseDate: "01/01/2020",
      actions: <Button>Editar</Button>,
    },
  ];
  return (
    <div className="VehiclesManagement">
      <h2>Gerenciamento de Veículos</h2>
      <Table
        columns={columns}
        data={data}
        mobile={{
          mainColumn: "make",
          secondaryColumn: "model",
          defaultRotationColumn: "purchasePrice",
          hiddenColumns: ["actions"],
        }}
      />
    </div>
  );
}
