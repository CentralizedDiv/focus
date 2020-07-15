import './Input.scss';

import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { Message, ValidationRule } from 'react-hook-form/dist/types/form';

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: FieldError;
  register?: ({ required }: { required?: Message | ValidationRule<boolean> }) => RefReturn;
}

export default function Input({ id, label, register, required, error, ...props }: InputProps) {
  return (
    <label htmlFor={id} className={cn("Input", { "Input--error": error })}>
      <div className="Input-labelContainer">
        <span className="Input-label">{label}</span>{" "}
        {required && <span className="Input-labelRequired">Obrigatório</span>}
      </div>
      <input name={id} id={id} ref={register?.({ required })} {...props} />
    </label>
  );
}
