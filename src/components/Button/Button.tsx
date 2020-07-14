import './Button.scss';

import cn from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

export default function Button(_props: ButtonProps) {
  const { icon, inverse, ...props } = _props;
  return (
    <button
      {...props}
      className={cn("Button", props.className, { "Button--withIcon": icon, "Button--inverse": inverse })}
    >
      {icon}
      {props.children}
    </button>
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  inverse?: boolean;
}
