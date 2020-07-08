import './Select.scss';

import React, { OptionHTMLAttributes, SelectHTMLAttributes } from 'react';

export default function Select(props: SelectProps) {
  return (
    <select {...props} className="Select">
      {props.children}
    </select>
  );
}

export function Option(props: OptionHTMLAttributes<HTMLOptionElement>) {
  return <option {...props}>{props.children}</option>;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}
