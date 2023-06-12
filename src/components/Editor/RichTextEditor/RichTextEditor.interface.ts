export interface RichtextEditorProps {
  width: number;
  height: number;
  onUpdate: (text: string) => void;
  text: string;
  background: string;
  borderRadius: string;
  fontSize: number;
}
