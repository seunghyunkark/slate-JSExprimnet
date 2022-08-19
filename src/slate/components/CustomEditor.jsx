import { Transforms, Text, Editor } from 'slate';
import { ELEMENT_LIST } from './CustomElement';

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
      match: (n) => n.type === ELEMENT_LIST,
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
      { type: isActive ? null : 'li' },
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
    // editor.deleteBackward('block');
    editor.insertNode(node);
  },
  //마우스 커서가 있는 paragraph 중 커서 앞 부분 node에 덮어씌움
  //기존 node에 fragment만 추가 됨
  addFragment(editor, fragment) {
    editor.deleteBackward('block');
    editor.insertFragment(fragment);
  },
  //클릭한 노드를 인수로 넣은 node로 덮는다.(스타일 변화)
  wrapNode(editor, node) {
    Transforms.wrapNodes(editor, node, {
      split: false,
    });
  },
  //클릭한 부분(path)에 인수 node를 삽입, 해당 부분에 있던 노드 삭제
  changeNode(editor, node, path) {
    Transforms.removeNodes(editor);
    Transforms.insertNodes(editor, node, {
      at: [path],
    });
  },

  // . 키를 눌렀을 때 sentence 노드 생성하기
  createSentence(event, editor) {
    if (event.key === '.' || event.key === '?' || event.key === '!') {
      event.preventDefault();
      editor.insertText(event.key);
      // 또는
      Editor.insertBreak(editor);
      // const sentence = {
      //   type: 'sentence',
      //   children: [{ text: '' }],
      // };
      // Transforms.insertNodes(editor, sentence);
      // Transforms.move(editor);
    }
  },
  createParagraph(event, editor) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const empty = {
        type: 'empty',
        children: [{ text: '' }],
      };
      const sentence = {
        type: 'sentence',
        children: [{ text: '' }],
      };
      Transforms.insertNodes(editor, empty);
      Transforms.insertNodes(editor, sentence);
      Transforms.move(editor);
    }
  },
};
