import { Node } from 'reactflow';
import { NodeData } from './Editor.interface';

export interface EditorContextData {
  language: string;
  theme: string;
  fontSize: number;
}
export interface TextContextData {
  background: string;
  color: string;
  fontSize: number;
  borderRadius: string;
}
export interface ImageContextData {
  borderRadius: string;
}
export interface ProfileContextData {
  platform: string;
  username: string;
  isVisible: boolean;
}

export interface AppContextProps {
  background: string;
  profile: ProfileContextData;
  hideWaterMark: boolean;
  selectedNode?: Node<NodeData>;
  onUpdateProfileData: (value: ProfileContextData) => void;
  onUpdateBackground: (value: string) => void;
  onUpdateWaterMark: (value: boolean) => void;
  onUpdateSelectedNode: (selectedNode?: Node<NodeData>) => void;

  session: string | undefined;
  onUpdateSession: (session: string | undefined) => void;
}
