import { Node } from 'reactflow';
import { NodeData } from './Editor.interface';
import { Models } from 'appwrite';

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
export interface ProfileData {
  platform: string;
  username: string;
  isVisible: boolean;
}

export interface AppContextProps {
  isFetchingUser: boolean;
  loggedInUser: Models.User<Models.Preferences> | undefined;
  selectedNode?: Node<NodeData>;
  onUpdateSelectedNode: (selectedNode?: Node<NodeData>) => void;

  session: string | undefined;
  onUpdateSession: (session: string | undefined) => void;
  onStartTour: () => void;
  handleUpdateLoggedInUser: (payload: Models.User<Models.Preferences>) => void;
}

export interface Snippet {
  background: string;
  hideWaterMark: boolean;
  profileInfo: string;
  nodes: string;
  creator: string;
  snapshot: string;
}

export type SnippetData = Models.Document & Snippet;
