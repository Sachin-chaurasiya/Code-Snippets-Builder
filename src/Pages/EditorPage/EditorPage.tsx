import { Box } from '@chakra-ui/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  Connection,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ToolBar from '../../components/ToolBar/ToolBar';
import { uniqueId } from 'lodash';
import EditorNode from '../../components/CustomNodes/EditorNode';
import { CUSTOM_NODES, INITIAL_NODES } from '../../constants';
import TextNode from '../../components/CustomNodes/TextNode';

const EditorPage = () => {
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
      });
      const newNode = {
        id: uniqueId('dragged'),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode as Node));
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
    }),
    []
  );

  return (
    <>
      <ToolBar />
      <ReactFlowProvider>
        <Box
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
              background:
                'linear-gradient(337deg, rgb(101, 78, 163), rgb(218, 152, 180))',
            }}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        </Box>
      </ReactFlowProvider>
    </>
  );
};

export default EditorPage;
