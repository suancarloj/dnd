import { useDrop } from 'react-dnd';
import { NodePath, onTreeDrop } from './Draggable';
import { ItemTypes } from './ItemTypes';
import { RecursiveRendering } from './RecursiveRendering';

interface RenderContentProps {
  tree: any;
  path: NodePath;
  onTreeDrop: onTreeDrop;
}

function RenderContent(props: RenderContentProps) {
  const greedy = false;
  const dropPath = props.path ? `${props.path}.children` : 'children';

  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: Object.keys(ItemTypes),
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop && !greedy) {
        return;
      }
      const { type, children, ...restItem } = item as any;
      console.log('item', item, children);
      if (props.onTreeDrop && !restItem.props.id) {
        props.onTreeDrop(dropPath, 1, {
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

  let outline;

  if (isOverCurrent || isOver) {
    outline = '1px solid red';
  }

  return (
    <div ref={drop} style={{ outline, outlineOffset: '4px', margin: '1px' }}>
      <RecursiveRendering
        tree={props.tree}
        path={dropPath}
        onTreeDrop={props.onTreeDrop}
      />
    </div>
  );
}

export default RenderContent;
