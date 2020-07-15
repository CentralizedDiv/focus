import './VehicleEdit.scss';

import React, { useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { FaCheck, FaPlusCircle, FaTimes } from 'react-icons/fa';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';

function AddCostForm(props: AddCostFormProps) {
  const { register, trigger, getValues, errors } = useForm<{ name: string; value: string }>();
  return (
    <div className="VehicleEdit-addCostForm">
      <Card>
        <FormGroup title="Novo Custo">
          <Input id="name" label="Custo" register={register} required={true} error={errors.name} />
          <Input id="value" label="Valor" register={register} required={true} error={errors.value} />
          <div className="VehicleEdit-addCostFormButtons">
            <Button
              icon={<FaCheck />}
              onClick={async () => {
                const valid = await trigger();
                if (valid) {
                  props.onOk(getValues());
                }
              }}
            >
              Confirmar
            </Button>
            <Button onClick={props.onCancel} inverse={true}>
              <FaTimes />
            </Button>
          </div>
        </FormGroup>
      </Card>
    </div>
  );
}

interface AddCostFormProps {
  onOk: ({ name, value }: { name: string; value: string }) => void;
  onCancel: () => void;
}

export default function VehicleEdit(props: VehicleEditProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { register, control, errors } = useFormContext<VehicleEditProps>();

  const { fields, append } = useFieldArray({
    control,
    name: "costs",
  });

  return (
    <div className="VehicleEdit">
      <form>
        <FormGroup title="Identificação">
          <Input
            id="make"
            label="Marca"
            register={register}
            required={true}
            defaultValue={props.make}
            error={errors.make}
          />
          <Input id="model" label="Modelo" register={register} required={true} defaultValue={props.model} />
          <Input id="year" label="Ano" register={register} required={true} defaultValue={props.year} />
          <Input
            id="licensePlate"
            label="Placa"
            register={register}
            required={true}
            defaultValue={props.licensePlate}
          />
        </FormGroup>
        <FormGroup title="Custos">
          {fields.map((cost) => (
            <Input key={cost.id} id={cost.value} label={cost.value} register={register} required={true} />
          ))}
          {isAdding ? (
            <AddCostForm
              onCancel={() => setIsAdding(false)}
              onOk={(newCost) => {
                append({ value: newCost.name });
                setIsAdding(false);
              }}
            />
          ) : (
            <Button
              className="VehicleEdit-addCost"
              icon={<FaPlusCircle />}
              onClick={() => {
                setIsAdding(true);
                setTimeout(() => {
                  const drawer = document.getElementsByClassName("Drawer-content")?.[0];
                  if (drawer) {
                    drawer.scrollTop = drawer.scrollHeight;
                  }
                });
              }}
              inverse={true}
            >
              Adicionar Custo
            </Button>
          )}
        </FormGroup>
      </form>
    </div>
  );
}

export interface VehicleEditProps {
  make: string;
  model: string;
  licensePlate: string;
  year: string;
  purchaseDate: string;
  purchasePrice: string;
  isDocOk: boolean;
  saleDate: string;
  salePrice: string;
}
