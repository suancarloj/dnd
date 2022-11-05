import React from 'react';
import styled from 'styled-components';
import { ItemTypes } from './ItemTypes';

const Heading1Styled = styled.h1`
  color: #000;
  font-weight: 700;
`;

function Heading1(props: React.PropsWithChildren<void>) {
  return <Heading1Styled>{props.children}</Heading1Styled>;
}

Heading1.type = ItemTypes.HEADING1;

export default Heading1;
