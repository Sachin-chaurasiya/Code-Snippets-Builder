import { Box } from '@chakra-ui/react';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactFlow, {
  Connection,
  Node,
  Panel,
  ReactFlowInstance,
  XYPosition,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ToolBar from 'components/Editor/ToolBar/ToolBar';
import { uniqueId } from 'lodash';
import EditorNode from 'components/Editor/CustomNodes/EditorNode';
import { CUSTOM_NODES, INITIAL_NODES } from 'constants/editor';
import TextNode from 'components/Editor/CustomNodes/TextNode';
import ImageNode from 'components/Editor/CustomNodes/ImageNode';
import { useAppProvider } from 'AppProvider';
import EditorSidebar from 'components/Editor/EditorSidebar/EditorSidebar';
import EditorControls from 'components/Editor/EditorControls/EditorControls';
import { getDragHandleByNodeType } from 'utils/EditorUtils';
import BrandLogo from 'components/Common/BrandLogo/BrandLogo';
import ProfileInfo from 'components/Editor/ProfileInfo/ProfileInfo';

const EditorPage = () => {
  const { background, hideWaterMark, profile } = useAppProvider();
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
      const type = event.dataTransfer.getData('application/SnippetBuilder');

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
        dragHandle: getDragHandleByNodeType(type),
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

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Fragment>
      <Box mr={80}>
        <ToolBar />
        <EditorControls />
        <Box
          borderRadius={4}
          style={{
            height: '80vh',
          }}
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodesConnectable={false}
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
            {!hideWaterMark ? (
              <Panel position="bottom-right">
                <BrandLogo
                  gap={4}
                  h="auto"
                  textColor="white"
                  logoType="light"
                  textBackgroundColor="transparent"
                  backgroundClip="inherit"
                  logoSize="x-small"
                  textFontSize="md"
                  textFontWeight="normal"
                />
              </Panel>
            ) : null}
            {profile.isVisible ? (
              <Panel position="bottom-left">
                <ProfileInfo />
              </Panel>
            ) : null}
          </ReactFlow>
        </Box>
      </Box>
      <EditorSidebar />
    </Fragment>
  );
};

export default EditorPage;
