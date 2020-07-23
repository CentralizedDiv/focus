import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import FormGroupComponent from '../FormGroup/FormGroup';
import Input from '../Input/Input';
import Photo from '../Photo/Photo';

export default function Form({ groups, ...props }: FormProps) {
  const { register, errors } = useFormContext();

  const renderField = useCallback(
    (fieldOrGroup: Field | FormGroup | Custom, key: number) => {
      const field = { type: "input", ...fieldOrGroup } as Field;
      const group = fieldOrGroup as FormGroup;
      const custom = fieldOrGroup as Custom;
      if (group.title) {
        return (
          <FormGroupComponent key={key} title={group.title}>
            {group.fields.map((childField, index) => renderField(childField, index))}
          </FormGroupComponent>
        );
      } else if (field.type === "photo") {
        return <Photo key={key} register={register} {...field} error={errors[field.name]} />;
      } else if (field.type === "input") {
        return <Input key={key} register={register} {...field} error={errors[field.name]} />;
      } else if (custom.render) {
        return <div key={key}>{custom.render(register, errors)}</div>;
      }
    },
    [register, errors]
  );

  return (
    <div className="Form">
      {groups.map((group, index) => (
        <FormGroupComponent title={group.title} key={index}>
          {group.fields.map((field, index) => renderField(field, index))}
        </FormGroupComponent>
      ))}
    </div>
  );
}

export type FieldType = "input" | "photo" | "custom";
export interface Field {
  type?: FieldType;
  name: string;
  label: string;
  required?: boolean;
}

export interface Custom {
  type: "custom";
  render?: (register: any, errors: any) => React.ReactNode;
}

export interface FormGroup {
  title: string;
  fields: Array<Field | FormGroup | Custom>;
}

export interface FormProps {
  groups: FormGroup[];
}
