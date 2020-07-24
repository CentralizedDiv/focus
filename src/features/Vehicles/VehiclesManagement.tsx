import './VehiclesManagement.scss';

import { saveVehicle } from 'api/Vehicle';
import { Button, Drawer, Table } from 'components/shared';
import { Vehicle } from 'entities/Vehicle/models';
import {
    $currentVehicle, $forceDrawer, $isCreating, $isDrawerOpen, $isEditing, $searchQuery, useVehicles
} from 'features/Vehicles/store';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaChevronRight } from 'react-icons/fa';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { formatCurrency, formatDate, formatLicensePlate } from 'utils/functions/formatters';

import VehicleEdit from './components/VehicleEdit/VehicleEdit';
import VehicleView, { VehicleViewHeader } from './components/VehicleView/VehicleView';

export default function VehiclesManagement() {
  const filteredVehicleList = useVehicles();
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
          sale: { ...currentVehicle.sale, date: formatDate(currentVehicle.sale?.date) },
        } as any);
      } else {
        reset({ costs: [] });
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
          return <span>{formatDate(v?.purchase.date)}</span>;
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

  const resetState = useCallback(() => {
    forceDrawer(false);
    setTimeout(() => {
      setIsCreating(false);
      setIsEditing(false);
      setCurrentVehicle(null);
      forceDrawer(undefined);
    }, 200);
  }, [forceDrawer, setIsCreating, setIsEditing, setCurrentVehicle]);

  const handleDrawerClose = useCallback(() => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      resetState();
    }
  }, [isEditing, setIsEditing, resetState]);

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
                saveVehicle(vehicle);
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
          resetState();
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
