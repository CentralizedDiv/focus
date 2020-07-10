import './VehicleView.scss';

import React from 'react';

import Tag from '../../components/Tag/Tag';

export default function VehicleView(props: VehicleViewProps) {
  return (
    <div className="VehicleView">
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
