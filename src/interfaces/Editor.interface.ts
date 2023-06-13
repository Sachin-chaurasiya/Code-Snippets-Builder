import { ProfileData } from './AppProvider.interface';

export type NodeDataStore = CodeEditorNodeData & ImageNodeData & TextNodeData;

export interface CommonNodeData {
  fontSize?: number;
  borderRadius?: string;
}

export type CodeEditorNodeData = {
  code?: string;
  language?: string;
  theme?: string;
  snippetName?: string;
  isSnippetNameVisible?: boolean;
} & CommonNodeData;

export type ImageNodeData = {
  imageSource?: string;
} & CommonNodeData;

export type TextNodeData = {
  text?: string;
  background?: string;
} & CommonNodeData;

export type NodeData = {
  onUpdate: (nodeId: string, partialData: NodeDataStore) => void;
} & NodeDataStore;

export interface EditorSidebarProps {
  background: string;
  profile: ProfileData;
  hideWaterMark: boolean;
  onUpdateProfileData: (value: ProfileData) => void;
  onUpdateBackground: (value: string) => void;
  onUpdateWaterMark: (value: boolean) => void;
}
