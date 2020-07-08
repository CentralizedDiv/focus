import './Button.scss';

import React, { ButtonHTMLAttributes } from 'react';

export default function Button(props: ButtonProps) {
  return (
    <button {...props} className="Button">
      {props.children}
    </button>
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
