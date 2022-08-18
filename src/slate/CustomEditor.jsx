import { Node, Transforms, Text, Editor } from 'slate';

export const CustomEditor = {
  isSelect(editor) {
    return editor.selection;
  },

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

  //텍스트 데이터 추가, 제거 가능
  addText(editor, text) {
    editor.deleteBackward('line');
    editor.insertText(text);
  },
  //기존 node 뒤에 추가됨
  addNode(editor, node) {
    editor.deleteBackward('block');
    editor.insertNode(node);
  },
  //마우스 커서가 있는 paragraph 중 커서 앞 부분 node에 덮어씌움
  //기존 node에 fragment만 추가 됨
  addFragment(editor, fragment) {
    editor.deleteBackward('block');
    editor.insertFragment(fragment);
  },
  //클릭한 노드 자체를 바꾸는 방법?
};
