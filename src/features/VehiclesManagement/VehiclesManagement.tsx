import './VehiclesManagement.scss';

import React, { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaChevronRight } from 'react-icons/fa';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Button from '../../components/Button/Button';
import Drawer from '../../components/Drawer/Drawer';
import Table from '../../components/Table/Table';
import {
    $currentVehicle, $filteredVehicleList, $forceDrawer, $isCreating, $isDrawerOpen, $isEditing,
    $searchQuery
} from '../../store/Vehicle';
import { Vehicle } from '../../store/Vehicle/model';
import {
    formatCurrency, formatLicensePlate, formatTimestamp
} from '../../utils/functions/formatters';
import VehicleEdit from '../VehicleEdit/VehicleEdit';
import VehicleView, { VehicleViewHeader } from '../VehicleView/VehicleView';

export default function VehiclesManagement() {
  const filteredVehicleList = useRecoilValue($filteredVehicleList);
  const isDrawerOpen = useRecoilValue($isDrawerOpen);
  const [currentVehicle, setCurrentVehicle] = useRecoilState($currentVehicle);
  const forceDrawer = useSetRecoilState($forceDrawer);
  const [isCreating, setIsCreating] = useRecoilState($isCreating);
  const [isEditing, setIsEditing] = useRecoilState($isEditing);
  const setSearchQuery = useSetRecoilState($searchQuery);
  const { reset, ...methods } = useForm<Vehicle>();

  useEffect(() => {
    const callReset = async () => {
      if (currentVehicle) {
        reset({
          ...currentVehicle,
          sale: { ...currentVehicle.sale, date: formatTimestamp(Number(currentVehicle.sale?.date)) },
        } as any);
      } else {
        reset({});
      }
    };
    callReset();
  }, [currentVehicle, reset]);

  const columns = useMemo(
    () => [
      { id: "make", label: "Marca" },
      { id: "model", label: "Modelo" },
      { id: "year", label: "Ano" },
      {
        id: "licensePlate",
        label: "Placa",
        render: (v: Vehicle) => {
          return <span>{formatLicensePlate(v.licensePlate)}</span>;
        },
      },
      {
        id: "purchase.price",
        label: "Preço de Compra",
        render: (row: Vehicle) => {
          return <span>{formatCurrency(row.purchase.price)}</span>;
        },
      },
      {
        id: "purchase.date",
        label: "Data de Compra",
        render: (v: Vehicle) => {
          return <span>{formatTimestamp(v?.purchase.date)}</span>;
        },
      },
      {
        id: "actions",
        label: "",
        render: (v: Vehicle) => (
          <Button
            onClick={() => {
              setCurrentVehicle(v);
            }}
          >
            <FaChevronRight />
          </Button>
        ),
      },
    ],
    [setCurrentVehicle]
  );

  const handleDrawerClose = useCallback(() => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      forceDrawer(false);
      setTimeout(() => {
        setIsCreating(false);
        setCurrentVehicle(null);
        forceDrawer(undefined);
      }, 200);
    }
  }, [isEditing, setIsCreating, setIsEditing, forceDrawer, setCurrentVehicle]);

  return (
    <div className="VehiclesManagement">
      <div className="VehiclesManagement-header">
        <h2>Gerenciamento de Veículos</h2>
        <Button
          onClick={() => {
            setIsCreating(true);
          }}
        >
          Adicionar Veículo
        </Button>
        <label htmlFor="search">
          Pesquisar
          <input id="search" placeholder="Celta 2010" onChange={(ev) => setSearchQuery(ev.target.value)} />
        </label>
      </div>
      <Table
        columns={columns}
        data={filteredVehicleList}
        mobile={{
          rotationLabel: "Comparar",
          mainColumn: (row: any) => (
            <span>
              {row.make} {row.model}
            </span>
          ),
          secondaryColumn: "year",
          defaultRotationColumn: "purchase.price",
          hiddenColumns: ["make", "model", "actions"],
          onClickRow: (row: Vehicle) => setCurrentVehicle(row),
        }}
      />
      <Drawer
        isOpen={isDrawerOpen}
        header={
          <VehicleViewHeader
            onSave={async () => {
              const valid = await methods.trigger();
              if (valid) {
                const vehicle = methods.getValues();
                console.log(vehicle);
                setCurrentVehicle(vehicle);
                setIsEditing(false);
                setIsCreating(false);
              }
            }}
            onEdit={() => {
              setIsEditing(true);
            }}
            onCancel={() => {
              handleDrawerClose();
            }}
            enableSaveButton={isEditing || isCreating}
            label={isEditing ? "Editar Veículo" : isCreating ? "Cadastrar Veículo" : "Visualizar Veículo"}
          />
        }
        onClose={() => {
          handleDrawerClose();
        }}
        onClickArrowLeft={() => {
          handleDrawerClose();
        }}
      >
        {isEditing || isCreating ? (
          <FormProvider {...{ ...methods, reset }}>
            <VehicleEdit vehicle={currentVehicle} />
          </FormProvider>
        ) : (
          currentVehicle && <VehicleView vehicle={currentVehicle} />
        )}
      </Drawer>
    </div>
  );
}
