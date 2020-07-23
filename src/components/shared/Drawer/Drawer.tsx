import './Drawer.scss';

import cn from 'classnames';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function Drawer(props: DrawerProps) {
  const { header } = props;
  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return ReactDOM.createPortal(
    <div className={cn("Drawer", { "Drawer--open": isOpen })}>
      <div
        className="Drawer-mask"
        onClick={() => {
          setIsOpen(false);
          props.onClose?.();
        }}
      />
      <div className="Drawer-contentWrapper">
        {header && (
          <div className="Drawer-contentHeader">
            <FaArrowLeft
              onClick={() => {
                if (props.onClickArrowLeft) {
                  props.onClickArrowLeft();
                  return;
                }
                setIsOpen(false);
                props.onClose?.();
              }}
            />
            {typeof header === "function" ? header() : header}
          </div>
        )}
        <div className="Drawer-content">{props.children}</div>
      </div>
    </div>,
    document.body
  );
}

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  header?: null | string | React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  onClickArrowLeft?: () => void;
}
