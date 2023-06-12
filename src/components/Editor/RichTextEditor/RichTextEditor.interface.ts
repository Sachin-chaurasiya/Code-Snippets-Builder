export interface RichtextEditorProps {
  width: number;
  height: number;
  onUpdate: (text: string) => void;
  text: string;
}
