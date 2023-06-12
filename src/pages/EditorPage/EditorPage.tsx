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
  NodeChange,
  ReactFlowInstance,
  XYPosition,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ToolBar from 'components/Editor/ToolBar/ToolBar';
import EditorNode from 'components/Editor/CustomNodes/EditorNode';
import { CUSTOM_NODES, INITIAL_NODES } from 'constants/editor';
import TextNode from 'components/Editor/CustomNodes/TextNode';
import ImageNode from 'components/Editor/CustomNodes/ImageNode';
import { useAppProvider } from 'AppProvider';
import EditorSidebar from 'components/Editor/EditorSidebar/EditorSidebar';
import EditorControls from 'components/Editor/EditorControls/EditorControls';
import {
  getDragHandleByNodeType,
  getInitialNodeDataByType,
  getUniqueId,
} from 'utils/EditorUtils';

import WatermarkPanel from 'components/Editor/Panels/WatermarkPanel';
import ProfilePanel from 'components/Editor/Panels/ProfilePanel';
import { find, map } from 'lodash';
import { NodeData } from 'interfaces/Editor.interface';

const EditorPage = () => {
  // nodes ref to store the nodes data for passing in callback function
  const nodesRef = useRef<Array<Node<NodeData>>>([]);

  const { background, onUpdateSelectedNode } = useAppProvider();

  const [nodes, setNodes, onNodesChange] =
    useNodesState<NodeData>(INITIAL_NODES);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * update the node data of given nodeId
   * @param nodeId node ID
   * @param partialData data record of the node
   */
  const handleUpdateNodeData: NodeData['onUpdate'] = useCallback(
    (nodeId, partialData) => {
      const existingNodes = nodesRef.current;
      const updatedNodes = map(existingNodes, (node) => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: { ...node.data, ...partialData },
          };

          // set the updated selected node
          if (updatedNode.selected) {
            onUpdateSelectedNode(updatedNode);
          }

          return updatedNode;
        }

        return node;
      });

      setNodes(updatedNodes);
    },
    [nodesRef, setNodes]
  );

  /**
   * set the instance of reactFlow and attach the handleUpdateNodeData on every node
   */
  const handleOnInit = useCallback(
    (instance: ReactFlowInstance) => {
      setReactFlowInstance(instance);
      const nodes = instance.getNodes();
      const updatedNodes = map(nodes, (node) => {
        return {
          ...node,
          data: {
            // on initialization add the initial data for node type
            ...getInitialNodeDataByType(node.type ?? ''),
            ...node.data,
            onUpdate: handleUpdateNodeData,
          },
        };
      });
      instance.setNodes(updatedNodes);
    },
    [setReactFlowInstance, handleUpdateNodeData]
  );

  /**
   * Handle node changes "select" | "add" | "dimensions" | "reset" | "remove" | "position"
   */
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      map(changes, (change) => {
        // if node is selected then updated the selected node
        if (change.type === 'select' && change.selected) {
          const selectedNode = find(
            nodesRef.current,
            (node: Node<NodeData>) => node.id === change.id
          );
          onUpdateSelectedNode(selectedNode);
        }
        // if node is not selected then set the selected node as undefined
        if (change.type === 'select' && !change.selected) {
          onUpdateSelectedNode(undefined);
        }
      });
    },
    [onNodesChange, nodesRef]
  );

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
      const newNode: Node<NodeData> = {
        id: getUniqueId(),
        type,
        position,
        data: {
          ...getInitialNodeDataByType(type),
          onUpdate: handleUpdateNodeData,
        },
        dragHandle: getDragHandleByNodeType(type),
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, handleUpdateNodeData]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
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
    nodesRef.current = nodes;
  }, [nodes]);

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
          ref={reactFlowWrapper}>
          <ReactFlow
            zoomOnDoubleClick={false}
            zoomOnScroll={false}
            nodesConnectable={false}
            nodeTypes={nodeTypes}
            onNodesChange={handleNodesChange}
            onEdgesChange={onEdgesChange}
            proOptions={{ hideAttribution: true }}
            nodes={nodes}
            edges={edges}
            style={{
              background,
              borderRadius: 6,
            }}
            onConnect={onConnect}
            onInit={handleOnInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            // this is to disable multi select
            multiSelectionKeyCode={null}>
            <WatermarkPanel />
            <ProfilePanel />
          </ReactFlow>
        </Box>
      </Box>
      <EditorSidebar />
    </Fragment>
  );
};

export default EditorPage;
