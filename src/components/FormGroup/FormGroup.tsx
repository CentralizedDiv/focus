import './FormGroup.scss';

import React, { BaseHTMLAttributes } from 'react';

export default function FormGroup({ title, children }: FormGroupProps) {
  return (
    <div className="Form-group">
      <h4 className="Form-groupTitle">{title}</h4>
      {children}
    </div>
  );
}

interface FormGroupProps extends BaseHTMLAttributes<HTMLDivElement> {
  title: string;
}
