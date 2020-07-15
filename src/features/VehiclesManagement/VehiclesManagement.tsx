import './VehiclesManagement.scss';

import React, { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaChevronRight } from 'react-icons/fa';

import Button from '../../components/Button/Button';
import Drawer from '../../components/Drawer/Drawer';
import Table from '../../components/Table/Table';
import VehicleEdit from '../VehicleEdit/VehicleEdit';
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
    model: "Siena",
    year: "2011",
    licensePlate: "HSV-1987",
    purchasePrice: "R$ 20.000,00",
    purchaseDate: "01/01/2020",
  },
  {
    make: "Fiat",
    model: "Argo",
    year: "2011",
    licensePlate: "HSV-1987",
    purchasePrice: "R$ 20.000,00",
    purchaseDate: "01/01/2020",
  },
  {
    make: "Fiat",
    model: "Punto",
    year: "2011",
    licensePlate: "HSV-1987",
    purchasePrice: "R$ 20.000,00",
    purchaseDate: "01/01/2020",
  },
];

export default function VehiclesManagement() {
  const methods = useForm({
    defaultValues: {
      costs: ["Valor de Compra", "Documentação", "Preparação", "Lanternagem", "Mecânica", "Combustível"],
    },
  });
  const [currentVehicle, setCurrentVehicle] = useState<{}>();
  const [filteredData, setFilteredData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const updateFiltered = useCallback((search) => {
    setFilteredData(data.filter((v) => v.model.toLowerCase().indexOf(search.toLowerCase()) > -1));
  }, []);

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
          <Button
            onClick={() => {
              setCurrentVehicle({});
            }}
          >
            <FaChevronRight />
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <div className="VehiclesManagement">
      <div className="VehiclesManagement-header">
        <h2>Gerenciamento de Veículos</h2>
        <label htmlFor="search">
          Pesquisar
          <input id="search" placeholder="Celta 2010" onChange={(ev) => updateFiltered(ev.target.value)} />
        </label>
      </div>
      <Table
        columns={columns}
        data={filteredData}
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
            onSave={async () => {
              const valid = await methods.trigger();
              if (valid) {
                setIsEditing(false);
              }
            }}
            onEdit={() => {
              setIsEditing(true);
            }}
            onCancel={() => {
              setIsEditing(false);
            }}
            isEditing={isEditing}
          />
        }
        onClose={() => setCurrentVehicle(undefined)}
        onClickArrowLeft={isEditing ? () => setIsEditing(false) : undefined}
      >
        {isEditing ? (
          <FormProvider {...methods}>
            <VehicleEdit
              make="FIAT"
              model="UNO"
              year="2011"
              licensePlate="HSV-1987"
              purchaseDate="20/01/2020"
              purchasePrice="R$ 20.000,00"
              isDocOk={true}
              saleDate="25/02/2020"
              salePrice="R$ 23.000,00"
            />
          </FormProvider>
        ) : (
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
        )}
      </Drawer>
    </div>
  );
}
