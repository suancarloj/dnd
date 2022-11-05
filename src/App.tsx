import * as React from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { get, has, set } from 'lodash';
import Draggable from './components/Draggable';
import RenderContent from './components/RenderContent';
import Card from './components/Card';
import Heading1 from './components/Heading1';

// {
//   tag: "parent",
//   props: [
//       {
//           name: "attr1",
//           value: "val1"
//       }
//   ],
//   children: [
//       {
//           tag: "child",
//           props: [
//               {
//                   name: "attr2",
//                   value: "val2"
//               }
//           ],
//           children: [
//               { tag: "grandchild" }
//           ]
//        }
//    ]
// }

const GridContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 250px;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: '. .';
  height: 100vh;
`;

const Toolbox = styled.aside``;

export default function App() {
  const [tree, setTree] = useState({
    tag: 'root',
    props: [],
    children: [],
  });

  function handleTreeDrop(path: string, index: number, node: any) {
    setTree((t) => {
      if (has(t, path)) {
        let arr = get(t, path);
        if (Array.isArray(arr)) {
          arr.push(node);
        } else {
          set(t, path, [node]);
        }
      }
      return t;
    });
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <GridContainer>
        <RenderContent path="" tree={tree} onTreeDrop={handleTreeDrop} />
        <Toolbox className="bg-gray-100">
          <Draggable text="hello" disableDrop component={Card}>
            Card
          </Draggable>
          <Draggable text="hello" disableDrop component={Heading1}>
            Title 1
          </Draggable>
        </Toolbox>
      </GridContainer>
      <pre>{JSON.stringify(tree, null, 2)}</pre>
    </DndProvider>
  );
}
