import './VehicleEdit.scss';

import { Button, Card, Input } from 'components/shared';
import Form, { FormProps } from 'components/shared/Form/Form';
import { Vehicle } from 'entities/Vehicle/models';
import React, { useMemo, useState } from 'react';
import { FieldError, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { FaCheck, FaPlusCircle, FaTimes } from 'react-icons/fa';

function AddCostForm(props: AddCostFormProps) {
  const { trigger, getValues, ...methods } = useForm<{ label: string; value: string }>();
  return (
    <div className="VehicleEdit-addCostForm">
      <Card>
        <FormProvider {...{ ...methods, trigger, getValues }}>
          <Form
            groups={[
              {
                title: "Novo Custo",
                fields: [
                  { name: "label", label: "Custo", required: true },
                  { name: "value", label: "Valor", required: true, validation: "currency", type: "number" },
                ],
              },
            ]}
          />
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
        </FormProvider>
      </Card>
    </div>
  );
}

interface AddCostFormProps {
  onOk: ({ label, value }: { label: string; value: string }) => void;
  onCancel: () => void;
}

export default function VehicleEdit(props: VehicleEditProps) {
  const [isAdding, setIsAdding] = useState(props.vehicle?.costs?.length === 0 || !props.vehicle);

  const { fields, append, remove } = useFieldArray({
    name: "costs",
  });

  const formConfig: FormProps = useMemo(
    () => ({
      groups: [
        {
          title: "Identificação",
          fields: [
            { type: "photo", name: "picture", label: "Foto" },
            { name: "make", label: "Marca", required: true },
            { name: "model", label: "Modelo", required: true },
            { name: "year", label: "Ano", required: true, validation: "year", type: "number" },
            { name: "licensePlate", label: "Placa", required: true, validation: "licensePlate" },
          ],
        },
        {
          title: "Compra",
          fields: [
            {
              name: "purchase.price",
              label: "Valor de Compra",
              required: true,
              validation: "currency",
              type: "number",
            },
            { name: "purchase.date", label: "Data da Compra", required: true, validation: "date" },
          ],
        },
        {
          title: "Documentação",
          fields: [{ name: "docStatus", label: "Estado da documentação", required: true }],
        },
        {
          title: "Venda",
          fields: [
            { name: "sale.price", label: "Preço de Venda", validation: "currency", type: "number" },
            { name: "sale.date", label: "Data da Venda", validation: "date" },
            {
              title: "Comprador",
              fields: [
                { name: "sale.buyer.name", label: "Nome" },
                { name: "sale.buyer.phone", label: "Telefone" },
                { name: "sale.buyer.cpf", label: "CPF" },
                { name: "sale.buyer.email", label: "Email" },
              ],
            },
          ],
        },
        {
          title: "Custos",
          fields: [
            {
              type: "custom",
              render: (register, errors) => (
                <>
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
                          defaultValue={fields[index].label}
                          type="hidden"
                          ref={register()}
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
                        <Button
                          inverse={true}
                          onClick={() => {
                            remove(index);
                            if (fields.length === 1) {
                              setIsAdding(true);
                            }
                          }}
                        >
                          <FaTimes />
                        </Button>
                      </div>
                    );
                  })}
                  {isAdding ? (
                    <AddCostForm
                      onCancel={() => setIsAdding(false)}
                      onOk={({ label, value }) => {
                        append({ label, value });
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
                </>
              ),
            },
          ],
        },
      ],
    }),
    [append, fields, isAdding, remove]
  );

  return (
    <div className="VehicleEdit">
      <Form {...formConfig} />
    </div>
  );
}

export interface VehicleEditProps {
  vehicle: Vehicle | null;
}
