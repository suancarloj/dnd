import Draggable, { onTreeDrop } from './Draggable';
import { ItemMap } from './ItemMap';

export interface RecusiveRenderingProps {
  onTreeDrop: onTreeDrop;
  path: string;
  tree: any;
}

export function RecursiveRendering(props: RecusiveRenderingProps) {
  return (
    <>
      {Array.isArray(props.tree.children)
        ? props.tree.children.map((node: any, key: number) => {
            return (
              <Draggable
                component={ItemMap[node.tag]}
                componentProps={node.props}
                disableDrag
                key={key}
                index={key}
                path={`${props.path}.${key}`}
                parentPath={props.path}
                onTreeDrop={props.onTreeDrop}
              >
                {node.children?.length ? (
                  <RecursiveRendering
                    tree={node}
                    path={`${props.path}.${key}.children`}
                    onTreeDrop={props.onTreeDrop}
                  />
                ) : null}
              </Draggable>
            );
          })
        : props.tree.children}
    </>
  );
}
