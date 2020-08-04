import './VehiclesManagement.scss';

import {
  $currentVehicle,
  $forceDrawer,
  $isCreating,
  $isDrawerOpen,
  $isEditing,
  $searchQuery,
  useVehicles,
} from 'features/Vehicles/store';
import { Button, Drawer, Table, Input } from 'components/shared';
import { FormProvider, useForm } from 'react-hook-form';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Vehicle, defaultVehicle } from 'entities/Vehicle/models';
import VehicleView, { VehicleViewHeader } from './components/VehicleView/VehicleView';
import { deleteVehicle, saveVehicle } from 'api/Vehicle';
import { formatCurrency, formatDate, formatLicensePlate } from 'utils/functions/formatters';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { FaChevronRight, FaSearch } from 'react-icons/fa';
import VehicleEdit from './components/VehicleEdit/VehicleEdit';

export default function VehiclesManagement() {
  const filteredVehicleList = useVehicles();
  const isDrawerOpen = useRecoilValue($isDrawerOpen);
  const [currentVehicle, setCurrentVehicle] = useRecoilState($currentVehicle);
  const forceDrawer = useSetRecoilState($forceDrawer);
  const [isCreating, setIsCreating] = useRecoilState($isCreating);
  const [isEditing, setIsEditing] = useRecoilState($isEditing);
  const setSearchQuery = useSetRecoilState($searchQuery);
  const { reset, ...methods } = useForm<Vehicle>({ defaultValues: defaultVehicle });

  useEffect(() => {
    if (currentVehicle) {
      reset(currentVehicle);
    } else {
      reset(defaultVehicle);
    }
  }, [currentVehicle, reset]);

  const columns = useMemo(
    () => [
      { id: 'make', label: 'Marca', sort: true },
      { id: 'model', label: 'Modelo' },
      { id: 'year', label: 'Ano' },
      {
        id: 'licensePlate',
        label: 'Placa',
        render: (v: Vehicle) => {
          return <span>{formatLicensePlate(v.licensePlate)}</span>;
        },
      },
      {
        id: 'purchase.price',
        label: 'Preço de Compra',
        render: (row: Vehicle) => {
          return <span>{formatCurrency(row.purchase.price)}</span>;
        },
      },
      {
        id: 'purchase.date',
        label: 'Data de Compra',
        render: (v: Vehicle) => {
          return <span>{formatDate(v?.purchase.date)}</span>;
        },
      },
      {
        id: 'actions',
        label: '',
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
        <Input
          name="search"
          label="Pesquisar (Marca, Modelo ou Placa)"
          icon={<FaSearch />}
          id="search"
          onChange={(ev) => setSearchQuery(ev.target.value)}
        />
      </div>
      <Table
        columns={columns}
        data={filteredVehicleList}
        defaultSort="make_up"
        mobile={{
          rotationLabel: 'Comparar',
          mainColumn: (row: any) => (
            <span>
              {row.make} {row.model}
            </span>
          ),
          secondaryColumn: 'year',
          defaultRotationColumn: 'purchase.price',
          hiddenColumns: ['make', 'model', 'actions'],
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
                saveVehicle(vehicle);
                setCurrentVehicle(vehicle);
                setIsEditing(false);
                setIsCreating(false);
              }
            }}
            onEdit={() => {
              setIsEditing(true);
            }}
            onDelete={() => {
              resetState();
              if (currentVehicle) {
                deleteVehicle(currentVehicle);
              }
            }}
            onCancel={() => {
              handleDrawerClose();
            }}
            enableSaveButton={isEditing || isCreating}
            label={
              isEditing ? 'Editar Veículo' : isCreating ? 'Cadastrar Veículo' : 'Visualizar Veículo'
            }
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
