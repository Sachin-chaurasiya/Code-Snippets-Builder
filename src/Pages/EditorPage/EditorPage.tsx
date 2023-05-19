import { Box } from '@chakra-ui/react';
import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  Connection,
  Controls,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  XYPosition,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ToolBar from 'components/ToolBar/ToolBar';
import { uniqueId } from 'lodash';
import EditorNode from 'components/CustomNodes/EditorNode';
import { CUSTOM_NODES, INITIAL_NODES } from 'constant';
import TextNode from 'components/CustomNodes/TextNode';
import ImageNode from 'components/CustomNodes/ImageNode';
import { useAppProvider } from 'AppProvider';
import EditorSidebar from 'components/Sidebar/EditorSidebar';

const EditorPage = () => {
  const { background } = useAppProvider();
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - (reactFlowBounds?.left ?? 0),
        y: event.clientY - (reactFlowBounds?.top ?? 0),
      }) as XYPosition;
      const newNode: Node = {
        id: uniqueId('dragged'),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(
    () => ({
      [CUSTOM_NODES.EDITOR_NODE]: EditorNode,
      [CUSTOM_NODES.TEXT_NODE]: TextNode,
      [CUSTOM_NODES.IMAGE_NODE]: ImageNode,
    }),
    []
  );

  return (
    <Fragment>
      <Box mr={80}>
        <ToolBar />

        <ReactFlowProvider>
          <Box
            borderRadius={4}
            style={{
              height: '80vh',
            }}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              proOptions={{ hideAttribution: true }}
              nodes={nodes}
              edges={edges}
              style={{
                background,
                borderRadius: 6,
              }}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <Controls className="editor-controls" position="bottom-right" />
            </ReactFlow>
          </Box>
        </ReactFlowProvider>
      </Box>
      <EditorSidebar />
    </Fragment>
  );
};

export default EditorPage;
