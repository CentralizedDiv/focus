import './Drawer.scss';

import cn from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { atom, useRecoilState } from 'recoil';

const drawerState = atom<{ content: null | React.ReactNode; header: null | string; isOpen: boolean }>({
  key: "drawerState",
  default: {
    content: null,
    header: null,
    isOpen: false,
  },
});

export default function Drawer() {
  const [{ isOpen, content, header }, setState] = useRecoilState(drawerState);

  return ReactDOM.createPortal(
    <div className={cn("Drawer", { "Drawer--open": isOpen })}>
      <div className="Drawer-mask" onClick={() => setState({ content, header, isOpen: false })} />
      <div className="Drawer-contentWrapper">
        {header && (
          <div className="Drawer-contentHeader">
            <FaArrowLeft onClick={() => setState({ content, header, isOpen: false })} />
            {header}
          </div>
        )}
        <div className="Drawer-content">{content}</div>
      </div>
    </div>,
    document.body
  );
}

export function useDrawer(baseContent?: React.ReactNode) {
  const [state, setState] = useRecoilState(drawerState);

  const show = (content?: React.ReactNode, header: string | null = null) => {
    setState({
      ...state,
      content: content || baseContent,
      header,
      isOpen: true,
    });
  };

  const hide = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return { show, hide };
}
