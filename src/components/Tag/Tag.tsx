import './Tag.scss';

import cn from 'classnames';
import React, { HTMLAttributes } from 'react';

export default function Tag(props: TagProps) {
  return (
    <span
      {...props}
      className={cn("Tag", {
        "Tag-success": props.type === "success",
        "Tag-warning": props.type === "warning",
        "Tag-danger": props.type === "danger",
      })}
    >
      {props.children}
    </span>
  );
}

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  type: "success" | "warning" | "danger";
}
