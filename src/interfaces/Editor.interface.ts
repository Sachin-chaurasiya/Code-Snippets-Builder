export type NodeDataStore = Record<string, string | number | unknown>;

export type NodeData = {
  onUpdate: (nodeId: string, partialData: NodeDataStore) => void;
  code?: string;
  imageSource?: string;
  text?: string;
} & NodeDataStore;
