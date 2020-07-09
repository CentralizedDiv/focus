import './Table.scss';

import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import useMediaQuery from '../../utils/hooks/useMediaQuery';
import Select, { Option } from '../Select/Select';

export default function Table(props: TableProps) {
  const [rotationColumn, setRotationColumn] = useState(props.mobile.defaultRotationColumn);
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className="Table">
      {isMobile && (
        <>
          <div className="Table-mobileDropdown">
            <label htmlFor="rotation">
              {props.mobile.rotationLabel}
              <Select
                id="rotation"
                defaultValue={props.mobile.defaultRotationColumn}
                onChange={(ev) => setRotationColumn(ev.target.value)}
              >
                {props.columns
                  .filter(
                    ({ id }) =>
                      props.mobile.hiddenColumns.includes(id) === false &&
                      id !== props.mobile.mainColumn &&
                      id !== props.mobile.secondaryColumn
                  )
                  .map(({ id, label }) => (
                    <Option value={id} key={id}>
                      {label}
                    </Option>
                  ))}
              </Select>
            </label>
          </div>
          <div className="Table-mobileBody">
            {props.data.map((row, index) => (
              <div key={index} className="Table-mobileRow" onClick={props.mobile.onClickRow || props.onClickRow}>
                <h3>
                  {typeof props.mobile.mainColumn === "function"
                    ? props.mobile.mainColumn(row)
                    : row[props.mobile.mainColumn]}
                </h3>
                <p>
                  {typeof props.mobile.secondaryColumn === "function"
                    ? props.mobile.secondaryColumn(row)
                    : row[props.mobile.secondaryColumn]}
                </p>
                <p>{row[rotationColumn]}</p>
                <FaChevronRight className="Table-mobileRowCTA" />
              </div>
            ))}
          </div>
        </>
      )}
      {!isMobile && (
        <>
          <div className="Table-header">
            {props.columns.map(({ id, label }) => (
              <div key={id} className="Table-headerCell">
                {label}
              </div>
            ))}
          </div>
          <div className="Table-body">
            {props.data.map((row, index) => (
              <div key={index} className="Table-row" onClick={props.onClickRow}>
                {props.columns.map(({ id, render }) => (
                  <div key={id} className="Table-cell">
                    {typeof render === "function" ? render(row) : row[id]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export interface TableColumn {
  id: string;
  label: string;
  render?: (row: any) => JSX.Element;
}

export interface TableMobileOptions {
  rotationLabel: string;
  mainColumn: ((row: any) => JSX.Element) | string;
  secondaryColumn: ((row: any) => JSX.Element) | string;
  defaultRotationColumn: string;
  hiddenColumns: string[];
  onClickRow?: (...args: any) => void;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  mobile: TableMobileOptions;
  onClickRow?: (...args: any) => void;
}
