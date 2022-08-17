import { Transforms, Text, Editor } from 'slate';

export const CustomEditor = {
  isMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.custom === true,
      universal: true,
    });

    return !!match;
  },

  isBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'change',
    });

    return !!match;
  },

  toggleMark(editor) {
    const isActive = CustomEditor.isMarkActive(editor);
    Transforms.setNodes(
      editor,
      { custom: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleBlock(editor) {
    const isActive = CustomEditor.isBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'change' },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  addData(editor, data) {
    editor.insertText(data);
  },
};
