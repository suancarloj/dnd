import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';
import { ItemTypes } from './ItemTypes';
import { useHover } from '../hooks/useHover';

export type onTreeDrop = (path: string, index: number, node: any) => void;
export type NodePath = string;

const DeleteNodeButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  display: none;
`;
const DraggableContainer = styled.div`
  :hover ${DeleteNodeButton} {
    display: inline-block;
  }
`;

export interface DropableItem {
  component: React.ReactNode & {
    type: string;
  };
  componentProps?: Record<string, any>;
  index?: number;
  isDragging?: boolean;
  disableDrag?: boolean;
  disableDrop?: boolean;
  onTreeDrop?: onTreeDrop;
  path?: NodePath;
  parentPath: NodePath;
}

function Draggable<T>(properties: React.PropsWithChildren<DropableItem & T>) {
  const {
    component,
    disableDrop,
    disableDrag,
    isDragging,
    onTreeDrop,
    path,
    parentPath,
    children,
    ...props
  } = properties;
  const [dropped, setDropped] = useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const internalPath = path ? `${path}.children` : 'children';

  const [{ opacity }, dragRef] = useDrag({
    item: {
      type: component.type,
      path: internalPath,
      children,
      props: { ...props.componentProps, index: props.index },
    },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
  });

  const [{ isOver, isOverCurrent }, dropRef] = useDrop({
    accept: Object.keys(ItemTypes),
    drop(item, monitor) {
      const didDrop = monitor.didDrop();

      if (didDrop || disableDrop) {
        return;
      }

      const { type, children, ...restItem } = item as any;
      console.log('children', children);
      setDropped(true);
      if (onTreeDrop && !restItem.props.id) {
        onTreeDrop(internalPath, 1, {
          tag: item.type,
          props: {
            id: new Date().toISOString(),
            ...restItem.props,
          },
          children: children ?? [],
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  let backgroundColor = 'transparent';
  let outline;

  if ((isOverCurrent || isOver || isHovered) && !disableDrop) {
    outline = '1px solid red';
  }

  function attachRef(el: any) {
    dragRef(el);
    dropRef(el);
  }

  return (
    <DraggableContainer
      ref={attachRef}
      style={{ backgroundColor, opacity, outline, position: 'relative' }}
    >
      {props.componentProps?.id && (
        <DeleteNodeButton
          onClick={() => {
            console.log('delete', parentPath, props.index);
          }}
        >
          x
        </DeleteNodeButton>
      )}
      {React.createElement(
        component as any,
        { ...props.componentProps, index: props.index },
        children,
      )}
    </DraggableContainer>
  );
}

export default Draggable;
