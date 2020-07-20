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
  name: string;
  label: string;
  error?: FieldError;
  normalizer?: (value: string) => string;
  register?: ({ required }: { required?: Message | ValidationRule<boolean> }) => RefReturn;
}

export default function Input({ name, label, register, required, error, normalizer, ...props }: InputProps) {
  return (
    <label htmlFor={name} className={cn("Input", { "Input--error": error })}>
      <div className="Input-labelContainer">
        <span className="Input-label">{label}</span>{" "}
        {required && <span className="Input-labelRequired">Obrigatório</span>}
      </div>
      <input
        name={name}
        id={name}
        ref={register?.({ required })}
        onChange={(event) => {
          if (typeof normalizer === "function") {
            event.target.value = normalizer(event.target.value);
          }
        }}
        {...props}
      />
    </label>
  );
}
