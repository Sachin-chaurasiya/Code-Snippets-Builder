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
}

export interface AppContextProps {
  background: string;
  editor: EditorContextData;
  text: TextContextData;
  image: ImageContextData;
  profile: ProfileContextData;
  onUpdateEditorData: (value: EditorContextData) => void;
  onUpdateTextData: (value: TextContextData) => void;
  onUpdateImageData: (value: ImageContextData) => void;
  onUpdateProfileData: (value: ProfileContextData) => void;
  onUpdateBackground: (value: string) => void;
}
