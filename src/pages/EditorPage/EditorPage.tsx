import { Box, useToast } from '@chakra-ui/react';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactFlow, {
  Node,
  NodeChange,
  ReactFlowInstance,
  XYPosition,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ToolBar from 'components/Editor/ToolBar/ToolBar';
import { NODE_TYPES, UPDATE_SNIPPET_TIME } from 'constants/editor';
import { useAppProvider } from 'AppProvider';
import EditorSidebar from 'components/Editor/EditorSidebar/EditorSidebar';
import EditorControls from 'components/Editor/EditorControls/EditorControls';
import {
  getDragHandleByNodeType,
  getInitialNodeDataByType,
  getParsedValue,
  getStringifiedValue,
  getUniqueId,
} from 'utils/EditorUtils';

import WatermarkPanel from 'components/Editor/Panels/WatermarkPanel';
import ProfilePanel from 'components/Editor/Panels/ProfilePanel';
import { find, map, toNumber } from 'lodash';
import { NodeData } from 'interfaces/Editor.interface';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BORDER_RADIUS_LARGE,
  BUCKET_ID,
  COLLECTION_ID,
  DATABASE_ID,
  INITIAL_CONTEXT_DATA,
  ROUTES,
} from 'constants/common';
import Loader from 'components/Common/Loader/Loader';
import { AppwriteException } from 'appwrite';
import { API_CLIENT } from 'api';
import {
  ProfileData,
  Snippet,
  SnippetData,
} from 'interfaces/AppProvider.interface';
import { toBlob } from 'html-to-image';

const EditorPage = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { onUpdateSelectedNode } = useAppProvider();

  // snippet background states
  const [hideWaterMark, setIsWaterMarkVisible] = useState<boolean>(
    INITIAL_CONTEXT_DATA.hideWaterMark
  );
  const [profileData, setProfileData] = useState<ProfileData>(
    INITIAL_CONTEXT_DATA.profile
  );
  const [background, setBackground] = useState<string>('');

  // nodes ref to store the nodes data for passing in callback function
  const nodesRef = useRef<Array<Node<NodeData>>>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isNeedUpdate, setIsNeedUpdate] = useState<boolean>(false);

  const [snippetData, setSnippetData] = useState<SnippetData>();

  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const [timeoutId, setTimeoutId] = useState<number>();

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

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

      setIsNeedUpdate(true);
      setNodes(updatedNodes);
    },
    [nodesRef, setNodes]
  );

  const handleSnippetDataInit = (data: SnippetData) => {
    setSnippetData(data);
    setBackground(data.background);
    setProfileData(getParsedValue(data.profileInfo));
    setIsWaterMarkVisible(data.hideWaterMark);
    const nodesList = getParsedValue(data.nodes) as Array<Node<NodeData>>;
    const nodesWithUpdateHandler = map(nodesList, (node) => ({
      ...node,
      data: { ...node.data, onUpdate: handleUpdateNodeData },
    }));

    setNodes(nodesWithUpdateHandler);
  };

  const handleUpdateSnippetSnapshot = async (
    snippetId: string,
    existingSnapShotId: string
  ) => {
    try {
      const newSnapshotId = getUniqueId();
      const blob = await toBlob(
        document.querySelector('.react-flow') as HTMLElement,
        {
          filter: (node) => {
            // we don't want to add the minimap and the controls to the image
            if (
              node?.classList?.contains('react-flow__minimap') ||
              node?.classList?.contains('react-flow__controls')
            ) {
              return false;
            }

            return true;
          },
          quality: 1,
        }
      );
      const file = new File([blob as Blob], newSnapshotId, {
        type: 'image/png',
      });

      // delete the existing file
      await API_CLIENT.storage.deleteFile(BUCKET_ID, existingSnapShotId);

      await API_CLIENT.storage.createFile(BUCKET_ID, newSnapshotId, file);
      await API_CLIENT.database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        snippetId,
        { snapshot: newSnapshotId }
      );
    } catch (error) {
      const exception = error as AppwriteException;
      toast({
        description: exception.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const fetchSnippetData = async (snippetId: string) => {
    try {
      const data = await API_CLIENT.database.getDocument<SnippetData>(
        DATABASE_ID,
        COLLECTION_ID,
        snippetId
      );

      handleSnippetDataInit(data);
      setIsLoading(false);

      await handleUpdateSnippetSnapshot(data.$id, data.snapshot);
    } catch (error) {
      const exception = error as AppwriteException;
      toast({
        description: exception.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      navigate(ROUTES.DASHBOARD);
    }
  };

  const updateSnippetData = async (updatedData: Partial<Snippet>) => {
    if (snippetData?.$id) {
      try {
        setIsUpdating(true);
        await API_CLIENT.database.updateDocument<SnippetData>(
          DATABASE_ID,
          COLLECTION_ID,
          snippetData.$id,
          updatedData
        );

        setIsNeedUpdate(false);
      } catch (error) {
        const exception = error as AppwriteException;
        toast({
          description: exception.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleUpdateProfileData = (updatedData: ProfileData) => {
    updateSnippetData({ profileInfo: getStringifiedValue(updatedData) });
    setProfileData(updatedData);
  };

  const handleUpdateBackground = (updatedData: string) => {
    updateSnippetData({ background: updatedData });
    setBackground(updatedData);
  };
  const handleUpdateWaterMark = (updatedData: boolean) => {
    updateSnippetData({ hideWaterMark: updatedData });
    setIsWaterMarkVisible(updatedData);
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

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
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

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
      const id = setTimeout(() => {
        setIsNeedUpdate(true);
        setTimeoutId(toNumber(id));
      }, UPDATE_SNIPPET_TIME);
    },
    [onNodesChange, nodesRef, timeoutId]
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

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
      // No ID found in the search parameters, redirect to another page
      navigate(ROUTES.DASHBOARD);
    } else {
      // fetch the snippet data
      fetchSnippetData(id);
    }
  }, [location.search]);

  useEffect(() => {
    if (isNeedUpdate) {
      updateSnippetData({ nodes: getStringifiedValue(nodes) });
    }
  }, [isNeedUpdate, nodes]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      if (isNeedUpdate) {
        event.returnValue = 'You have unfinished change!';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isNeedUpdate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Box mr={80}>
        <ToolBar />
        <EditorControls isUpdating={isUpdating} />
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
            nodeTypes={NODE_TYPES}
            onNodesChange={handleNodesChange}
            proOptions={{ hideAttribution: true }}
            nodes={nodes}
            style={{
              background,
              borderRadius: BORDER_RADIUS_LARGE,
            }}
            onInit={handleOnInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            // this is to disable multi select
            multiSelectionKeyCode={null}>
            <WatermarkPanel hideWaterMark={hideWaterMark} />
            <ProfilePanel profile={profileData} />
          </ReactFlow>
        </Box>
      </Box>
      <EditorSidebar
        background={background}
        hideWaterMark={hideWaterMark}
        profile={profileData}
        onUpdateBackground={handleUpdateBackground}
        onUpdateProfileData={handleUpdateProfileData}
        onUpdateWaterMark={handleUpdateWaterMark}
      />
    </Fragment>
  );
};

export default EditorPage;
