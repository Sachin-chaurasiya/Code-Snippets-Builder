import { FORMAT_OPTIONS, MODULES } from 'constants/rich-text-editor';
import React, { FC, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import './rich-text-editor.css';
import { RichtextEditorProps } from './RichTextEditor.interface';

const RichTextEditor: FC<RichtextEditorProps> = ({
  width,
  height,
  onUpdate,
  text: updatedText,
  background,
  borderRadius,
  fontSize,
}) => {
  const editorRef = useRef<ReactQuill>(null);

  const [value, setValue] = useState(updatedText);

  useEffect(() => {
    const element = document.querySelector('[contenteditable="true"]');
    element?.setAttribute('data-gramm', 'false');
    element?.setAttribute('data-gramm_editor', 'false');
    element?.setAttribute('data-enable-grammarly', 'false');
  }, []);

  return (
    <ReactQuill
      placeholder="Write something awesome..."
      ref={editorRef}
      style={{
        background,
        borderRadius,
        width: `${width}px`,
        minHeight: `${height}px`,
        fontSize,
      }}
      formats={FORMAT_OPTIONS}
      modules={MODULES}
      theme="bubble"
      value={value}
      onChange={(value) => {
        setValue(value);
        onUpdate(value);
      }}
    />
  );
};

export default RichTextEditor;
