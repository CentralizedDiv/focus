import './Table.scss';

import { FaChevronDown, FaChevronRight, FaChevronUp } from 'react-icons/fa';
import React, { useCallback, useEffect, useState } from 'react';
import Select, { Option } from 'components/shared/Select/Select';

import cn from 'classnames';
import { deepReadObject } from 'utils/functions/utils';
import useMediaQuery from 'utils/hooks/useMediaQuery';

export default function Table(props: TableProps) {
  const [rotationColumn, setRotationColumn] = useState(props.mobile.defaultRotationColumn);
  const [activeSort, setActiveSort] = useState<string | undefined>(props.defaultSort);
  const [sortedData, setSortedData] = useState(props.data);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (activeSort) {
      const [id, direction] = activeSort.split('_');
      const sort = (a: { [key: string]: string }, b: { [key: string]: string }) => {
        const order = a[id].localeCompare(b[id]);
        if (direction === 'down') {
          return order * -1;
        } else {
          return order;
        }
      };
      setSortedData([...props.data].sort(sort));
    } else {
      setSortedData([...props.data]);
    }
  }, [activeSort, props.data]);

  const findColumn = useCallback((id: string) => props.columns.find((col) => col.id === id), [
    props.columns,
  ]);
  const renderRotationColumn = useCallback(
    (row) => {
      const col = findColumn(rotationColumn);
      if (typeof col?.render === 'function') {
        return col.render(row);
      } else {
        return deepReadObject(row, rotationColumn);
      }
    },
    [findColumn, rotationColumn]
  );

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
                  .map((column) => (
                    <Option value={column.id} key={column.id}>
                      {column.label}
                    </Option>
                  ))}
              </Select>
            </label>
          </div>
          <div className="Table-mobileBody">
            {props.data.map((row, index) => (
              <div
                key={index}
                className="Table-mobileRow"
                onClick={
                  props.mobile.onClickRow?.bind(null, row) || props.onClickRow?.bind(null, row)
                }
              >
                <h3>
                  {typeof props.mobile.mainColumn === 'function'
                    ? props.mobile.mainColumn(row)
                    : deepReadObject(row, props.mobile.mainColumn)}
                </h3>
                <p>
                  {typeof props.mobile.secondaryColumn === 'function'
                    ? props.mobile.secondaryColumn(row)
                    : deepReadObject(row, props.mobile.secondaryColumn)}
                </p>
                <p>{renderRotationColumn(row)}</p>
                <FaChevronRight className="Table-mobileRowCTA" />
              </div>
            ))}
          </div>
        </>
      )}
      {!isMobile && (
        <>
          <div className="Table-header">
            {props.columns.map(({ id, label, sort }) => (
              <div key={id} className="Table-headerCell">
                {label}
                {sort && (
                  <div
                    className="Table-headerSort"
                    onClick={() => {
                      if (activeSort && activeSort.includes(id)) {
                        if (activeSort.includes('_up')) {
                          setActiveSort(id + '_down');
                        } else {
                          setActiveSort(props.defaultSort);
                        }
                      } else {
                        setActiveSort(id + '_up');
                      }
                    }}
                  >
                    <FaChevronDown className={cn({ isActive: activeSort === id + '_down' })} />
                    <FaChevronUp className={cn({ isActive: activeSort === id + '_up' })} />
                  </div>
                )}
                {/* {sort && (
                  <div className="Table-headerSort">
                    {activeSort === id + '_custom' ? (
                      <FaTimes
                        className="isActive"
                        onClick={() => setActiveSort(props.defaultSort)}
                      />
                    ) : (
                      <FaFilter onClick={() => setActiveSort(id + '_custom')} />
                    )}
                  </div>
                )} */}
              </div>
            ))}
          </div>
          <div className="Table-body">
            {sortedData.map((row, index) => (
              <div key={index} className="Table-row" onClick={props.onClickRow?.bind(null, row)}>
                {props.columns.map(({ id, render }) => (
                  <div key={id} className="Table-cell">
                    {typeof render === 'function' ? render(row) : deepReadObject(row, id)}
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
  sort?: boolean;
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
  defaultSort?: string;
  mobile: TableMobileOptions;
  onClickRow?: (...args: any) => void;
}
