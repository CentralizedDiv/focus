import './VehicleView.scss';

import cn from 'classnames';
import { Button, Card, Tag } from 'components/shared';
import { Vehicle } from 'entities/Vehicle/models';
import React, { useMemo, useState } from 'react';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import {
    createDate, formatCurrency, formatDate, formatLicensePlate
} from 'utils/functions/formatters';
import { subtractDates } from 'utils/functions/utils';

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
  const [loadingImage, setLoadingImage] = useState(true);

  const totalCosts = useMemo(() => {
    return Object.values(props.vehicle.costs).reduce(
      (total, cost) => total + Number(cost.value),
      Number(props.vehicle.purchase.price)
    );
  }, [props.vehicle.costs, props.vehicle.purchase.price]);

  return (
    <div className="VehicleView">
      <div className="VehicleView-tags">
        {props.vehicle.sale?.date && props.vehicle.sale?.price ? (
          <>
            <Tag type="success">VENDIDO - {formatDate(props.vehicle.sale.date)}</Tag>
            <Tag type="success">LUCRO LIQUÍDO: {formatCurrency(Number(props.vehicle.sale.price) - totalCosts)}</Tag>
          </>
        ) : (
          <Tag type="warning">{subtractDates(new Date(), createDate(props.vehicle.purchase.date))} DIAS EM ESTOQUE</Tag>
        )}
        <Tag type="success">DOCUMENTAÇÃO: {props.vehicle.docStatus}</Tag>
      </div>
      {props.vehicle.picture && (
        <div className="VehicleView-imageContainer" style={{ backgroundImage: `url(${props.vehicle.picture})` }}>
          {loadingImage && <span className="VehicleView-imageLoading">Carregando imagem...</span>}
          <img
            className="VehicleView-image"
            onLoad={() => {
              setLoadingImage(false);
            }}
            src={props.vehicle.picture}
            alt="Foto do Carro"
          />
        </div>
      )}
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
          {
            label: "Data da Compra",
            value: props.vehicle.purchase.date,
          },
        ]}
      />
      {props.vehicle.sale?.price && props.vehicle.sale?.date && (
        <Table
          title="Venda"
          result={true}
          rows={[
            {
              label: "Data da Venda",
              value: props.vehicle.sale.date,
            },
            {
              label: "Preço da Venda",
              value: formatCurrency(props.vehicle.sale.price),
            },
            {
              label: "Nome do Comprador",
              value: props.vehicle.sale.buyer?.name as string,
            },
            {
              label: "Lucro Líquido",
              result: true,
              value: formatCurrency(Number(props.vehicle.sale.price) - totalCosts),
            },
          ]}
        />
      )}
      <Table
        title="Custos"
        result={true}
        rows={[{ label: "Valor da Compra", value: formatCurrency(props.vehicle.purchase.price) } as any].concat([
          ...Object.values(props.vehicle.costs)
            .map<{ label: string; value: string | number; result?: boolean }>(({ label, value }) => ({
              label,
              value: formatCurrency(value),
            }))
            .concat({
              label: "Total",
              value: formatCurrency(totalCosts),
              result: true,
            }),
        ])}
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
          <>
            <Button onClick={props.onEdit} icon={<FaEdit />} inverse={true}>
              Editar
            </Button>
            <Button onClick={props.onDelete} icon={<FaTrash />} />
          </>
        )}
      </div>
    </div>
  );
}

export interface VehicleViewHeaderProps {
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
  enableSaveButton: boolean;
  label: string;
}

export interface VehicleViewProps {
  vehicle: Vehicle;
}
