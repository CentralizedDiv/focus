import './Card.scss';

import React, { HTMLAttributes } from 'react';

export default function Card(props: CardProps) {
  return (
    <div {...props} className={`Card ${props.className}`}>
      {props.children}
    </div>
  );
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}
