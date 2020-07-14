import './VehicleView.scss';

import cn from 'classnames';
import React from 'react';

import Card from '../../components/Card/Card';
import Tag from '../../components/Tag/Tag';

function Table(props: { title: string; rows: { label: string; value: string; result?: boolean }[]; result?: boolean }) {
  return (
    <Card className="VehicleView-tableContainer">
      <h4>{props.title}</h4>
      <div className={cn("VehicleView-table", { "VehicleView-table--result": props.result })}>
        {props.rows.map((row, index) => (
          <div className={cn("VehicleView-tableRow", { "VehicleView-tableRow--result": row.result })} key={index}>
            <span>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function VehicleView(props: VehicleViewProps) {
  return (
    <div className="VehicleView">
      <div className="VehicleView-tags">
        {/* {props.saleDate ? ( */}
        <>
          <Tag type="success">VENDIDO - {props.saleDate}</Tag>
          <Tag type="success">LUCRO LIQUÍDO: {props.salePrice}</Tag>
          {/* </>
        ) : (
          <> */}
          <Tag type="success">DOCUMENTAÇÃO: OK</Tag>
          <Tag type="danger">10 DIAS EM ESTOQUE</Tag>
          <Tag type="warning">ALGUMA OUTRA INFO IMPORTANTE</Tag>
        </>
        {/* )} */}
      </div>
      <Table
        title="Identificação"
        result={false}
        rows={[
          {
            label: "Marca",
            value: "Fiat",
          },
          {
            label: "Modelo",
            value: "Uno",
          },
          {
            label: "Ano",
            value: "2011",
          },
          {
            label: "Placa",
            value: "HSV-1987",
          },
        ]}
      />
      <Table
        title="Custos"
        result={true}
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
