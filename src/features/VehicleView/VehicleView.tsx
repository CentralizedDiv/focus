import './VehicleView.scss';

import cn from 'classnames';
import React, { useMemo } from 'react';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';

import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Tag from '../../components/Tag/Tag';
import { Vehicle } from '../../store/Vehicle/model';
import {
    formatCurrency, formatLicensePlate, formatTimestamp
} from '../../utils/functions/formatters';
import { subtractDates } from '../../utils/functions/utils';

function Table(props: {
  title: string;
  rows: { label: string; value: string | number; result?: boolean }[];
  result?: boolean;
}) {
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
  const totalCosts = useMemo(() => {
    return Object.values(props.vehicle.costs).reduce((total, cost) => total + cost.value, 0);
  }, [props.vehicle.costs]);
  return (
    <div className="VehicleView">
      <div className="VehicleView-tags">
        {props.vehicle.sale ? (
          <>
            <Tag type="success">VENDIDO - {formatTimestamp(props.vehicle.sale.date)}</Tag>
            <Tag type="success">LUCRO LIQUÍDO: {formatCurrency(props.vehicle.sale.price - totalCosts)}</Tag>
          </>
        ) : (
          <Tag type="danger">{subtractDates(new Date().getTime(), props.vehicle.purchase.date)} DIAS EM ESTOQUE</Tag>
        )}
        <Tag type="success">DOCUMENTAÇÃO: {props.vehicle.docStatus}</Tag>
      </div>
      <Table
        title="Identificação"
        result={false}
        rows={[
          {
            label: "Marca",
            value: props.vehicle.make,
          },
          {
            label: "Modelo",
            value: props.vehicle.model,
          },
          {
            label: "Ano",
            value: props.vehicle.year,
          },
          {
            label: "Placa",
            value: formatLicensePlate(props.vehicle.licensePlate),
          },
        ]}
      />
      <Table
        title="Custos"
        result={true}
        rows={Object.values(props.vehicle.costs)
          .map<{ label: string; value: string | number; result?: boolean }>(({ label, value }) => ({
            label,
            value: formatCurrency(value),
          }))
          .concat({
            label: "Total",
            value: formatCurrency(totalCosts),
            result: true,
          })}
      />
    </div>
  );
}

export function VehicleViewHeader(props: VehicleViewHeaderProps) {
  return (
    <div className="VehicleView-header">
      <span>{props.label}</span>
      <div className="VehicleView-headerIcons">
        {props.enableSaveButton ? (
          <>
            <Button onClick={props.onSave} icon={<FaCheck />} inverse={true}>
              Salvar
            </Button>
            <Button onClick={props.onCancel}>
              <FaTimes />
            </Button>
          </>
        ) : (
          <Button onClick={props.onEdit} icon={<FaEdit />} inverse={true}>
            Editar
          </Button>
        )}
      </div>
    </div>
  );
}

export interface VehicleViewHeaderProps {
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  enableSaveButton: boolean;
  label: string;
}

export interface VehicleViewProps {
  vehicle: Vehicle;
}
