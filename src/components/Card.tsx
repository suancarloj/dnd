import React from 'react';
import styled from 'styled-components';
import { DropableItem } from './Draggable';
import { ItemTypes } from './ItemTypes';

const CardStyled = styled.div`
  background-color: #fff;
  padding: 20px;
  max-width: 200px;
  margin: 20px auto;
`;

export interface CardProps extends DropableItem {
  text?: any;
}

function Card(props: React.PropsWithChildren<CardProps>) {
  return <CardStyled>{props.children}</CardStyled>;
}

Card.type = ItemTypes.CARD;

export default Card;
