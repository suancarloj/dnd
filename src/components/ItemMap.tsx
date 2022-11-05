import { ItemTypes } from './ItemTypes';
import Card from './Card';
import Heading1 from './Heading1';

export const ItemMap = {
  [ItemTypes.CARD]: Card,
  [ItemTypes.HEADING1]: Heading1,
};
