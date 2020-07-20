import './VehicleEdit.scss';

import React, { useState } from 'react';
import { FieldError, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { FaCheck, FaPlusCircle, FaTimes } from 'react-icons/fa';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import FormGroup from '../../components/FormGroup/FormGroup';
import Input from '../../components/Input/Input';
import { Vehicle } from '../../store/Vehicle/model';
import { deepReadObject } from '../../utils/functions/utils';

function AddCostForm(props: AddCostFormProps) {
  const { register, trigger, getValues, errors } = useForm<{ name: string; value: string }>();
  return (
    <div className="VehicleEdit-addCostForm">
      <Card>
        <FormGroup title="Novo Custo">
          <Input name="name" label="Custo" register={register} required={true} error={errors.name} />
          <Input name="value" label="Valor" register={register} required={true} error={errors.value} />
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
  const { register, errors } = useFormContext<VehicleEditProps & { [key: string]: string }>();

  const { fields, append, remove } = useFieldArray({
    name: "costs",
  });

  const vehicle: Vehicle = props.vehicle || {
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    docStatus: "OK",
    purchase: {
      price: 0,
      date: 0,
    },
    costs: [],
  };

  return (
    <div className="VehicleEdit">
      <form>
        <FormGroup title="Identificação">
          <Input
            name="make"
            label="Marca"
            register={register}
            required={true}
            defaultValue={vehicle.make}
            error={errors.make}
          />
          <Input name="model" label="Modelo" register={register} required={true} defaultValue={vehicle.model} />
          <Input name="year" label="Ano" register={register} required={true} defaultValue={vehicle.year} />
          <Input
            name="licensePlate"
            label="Placa"
            register={register}
            required={true}
            defaultValue={vehicle.licensePlate}
          />
        </FormGroup>
        <FormGroup title="Venda">
          <Input
            name="sale.price"
            label="Preço de Venda"
            register={register}
            required={true}
            defaultValue={vehicle.sale?.price}
            error={deepReadObject(errors, "sale.price")}
          />
          <Input
            name="sale.date"
            label="Data de Venda"
            register={register}
            required={true}
            defaultValue={vehicle.sale?.date}
            error={deepReadObject(errors, "sale.date")}
          />
        </FormGroup>
        <FormGroup title="Custos">
          {fields.map((cost, index) => {
            let _errors = errors.costs as Array<DeepMap<{ [key: string]: string }, FieldError>> | undefined;
            let error: FieldError | undefined;
            if (_errors) {
              error = _errors?.[index]?.[cost.label];
            }
            return (
              <div className="VehicleEdit-cost" key={cost.id}>
                <input
                  name={`costs[${index}].label`}
                  type="hidden"
                  ref={register()}
                  defaultValue={fields[index].label}
                />
                <input
                  name={`costs[${index}].undeleatable`}
                  type="hidden"
                  ref={register()}
                  defaultValue={fields[index].undeleatable}
                />
                <Input
                  name={`costs[${index}].value`}
                  type="number"
                  label={cost.label}
                  defaultValue={fields[index].value}
                  register={register}
                  required={true}
                  error={error}
                />
                {!cost.undeleatable && (
                  <Button inverse={true} onClick={() => remove(index)}>
                    <FaTimes />
                  </Button>
                )}
              </div>
            );
          })}
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
  vehicle: Vehicle | null;
}
