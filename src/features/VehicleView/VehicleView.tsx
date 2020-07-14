import './VehicleView.scss';

import cn from 'classnames';
import React from 'react';

import Tag from '../../components/Tag/Tag';

function Table(props: { title: string; rows: { label: string; value: string; result?: boolean }[] }) {
  return (
    <div className="VehicleView-tableContainer">
      <h4>{props.title}</h4>
      <div className="VehicleView-table">
        {props.rows.map((row, index) => (
          <div className={cn("VehicleView-tableRow", { "VehicleView-tableRow--result": row.result })} key={index}>
            <span>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VehicleView(props: VehicleViewProps) {
  return (
    <div className="VehicleView">
      <h2>
        {props.make} {props.model} {props.year}
      </h2>
      <div className="VehicleView-tags">
        {props.saleDate ? (
          <>
            <Tag type="success">VENDIDO - {props.saleDate}</Tag>
            <Tag type="success">LUCRO LIQUÍDO: {props.salePrice}</Tag>
          </>
        ) : (
          <>
            <Tag type="success">DOCUMENTAÇÃO: OK</Tag>
            <Tag type="warning">10 DIAS EM ESTOQUE</Tag>
          </>
        )}
      </div>
      <div className="VehicleView-costs">
        <Table
          title="Custos"
          rows={[
            {
              label: "Valor de Compra",
              value: "19,000.00",
            },
            {
              label: "Documentação",
              value: "500.00",
            },
            {
              label: "Preparação",
              value: "200.00",
            },
            {
              label: "Lanternagem",
              value: "150.00",
            },
            {
              label: "Mecânica",
              value: "100.00",
            },
            {
              label: "Combustível",
              value: "50.00",
            },
            {
              label: "Total",
              value: "20,000.00",
              result: true,
            },
          ]}
        />
      </div>
    </div>
  );
}

export interface VehicleViewProps {
  make: string;
  model: string;
  year: string;
  purchaseDate: string;
  purchasePrice: string;
  isDocOk: boolean;
  saleDate: string;
  salePrice: string;
}
