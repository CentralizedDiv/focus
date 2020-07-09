import './Select.scss';

import React, { OptionHTMLAttributes, SelectHTMLAttributes } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function Select(props: SelectProps) {
  return (
    <div className="Select">
      <select {...props}>{props.children}</select>
      <FaChevronDown className="Select-icon" />
    </div>
  );
}

export function Option(props: OptionHTMLAttributes<HTMLOptionElement>) {
  return <option {...props}>{props.children}</option>;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}
