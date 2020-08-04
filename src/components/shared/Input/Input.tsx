import './Input.scss';

import React, { InputHTMLAttributes } from 'react';
import { ValidationRule, ValidationValueMessage } from 'react-hook-form/dist/types/form';
import { FieldError } from 'react-hook-form';
import cn from 'classnames';

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

export type Validation = 'year' | 'licensePlate' | 'currency' | 'date';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: FieldError;
  validation?: Validation;
  icon?: React.ReactNode;
  register?: ({
    required,
    pattern,
  }: {
    required?: ValidationRule<boolean>;
    pattern?: ValidationValueMessage<RegExp>;
  }) => RefReturn;
}

export default function Input({
  validation,
  name,
  label,
  register,
  required,
  error,
  icon,
  ...props
}: InputProps) {
  const patterns = {
    year: {
      value: /^\d{4}([-]\d{4})?$/,
      message: 'Ano Inválido (Ex.: 2020 ou 2019-2020)',
    },
    licensePlate: {
      value: /^[a-zA-Z0-9-]*$/,
      message: 'Placa Inválida (Ex.: ABC-1234 ou ABC1A123 ou ABC1234)',
    },
    currency: {
      value: /^[0-9]*$/,
      message: 'Valor Inválido',
    },
    date: {
      value: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
      message: 'Data Inválida (Ex.: 25/02/2020)',
    },
  };
  const rule = validation ? patterns[validation] : undefined;

  return (
    <label
      htmlFor={name}
      className={cn('Input', { 'Input--error': error, 'Input--withIcon': icon })}
    >
      <div className="Input-labelContainer">
        <span className="Input-label">{label}</span>
        {required && <span className="Input-labelRequired">Obrigatório</span>}
        {error && error.message && <span className="Input-labelRequired">{error.message}</span>}
      </div>
      <input name={name} id={name} ref={register?.({ required, pattern: rule })} {...props} />
      {icon && <span className="Input-icon">{icon}</span>}
    </label>
  );
}
