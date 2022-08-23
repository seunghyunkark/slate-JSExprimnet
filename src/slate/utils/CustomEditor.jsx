import { Transforms, Editor } from 'slate';

export const CustomEditor = {
  isMarkActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n[format] === true,
      universal: true,
    });

    return !!match;
  },

  isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });

    return !!match;
  },

  toggleMark(editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      if (format === 'custom') {
        Editor.removeMark(editor, 'red');
        Editor.removeMark(editor, 'blue');
      }
      if (format === 'red') {
        Editor.removeMark(editor, 'custom');
        Editor.removeMark(editor, 'blue');
      }
      if (format === 'blue') {
        Editor.removeMark(editor, 'red');
        Editor.removeMark(editor, 'custom');
      }
      Editor.addMark(editor, format, true);
    }
  },

  toggleBlock(editor, format) {
    const isActive = CustomEditor.isBlockActive(editor, format);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : format },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  isSelect(editor) {
    return editor.selection;
  },
  //텍스트 데이터 추가, 제거 가능
  addText(editor, text) {
    //editor.deleteBackward('line');
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

  insertNode(editor, node, path) {
    Transforms.insertNodes(editor, node, { at: [path] });
  },
  //클릭한 부분(path)에 인수 node를 삽입, 해당 부분에 있던 노드 삭제, insertText(' ')
  changeWord(editor, node, path) {
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
      // 노드 생성해서 붙이기
      const sentence = {
        type: 'sentence',
        children: [{ text: '' }],
      };
      Transforms.insertNodes(editor, sentence);
      Transforms.move(editor);
      // 또는
      // Editor.insertBreak(editor);
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
  createWord(event, editor) {
    if (event.key === ' ') {
      event.preventDefault();
      editor.insertText(event.key);
      const word = {
        type: 'word',
        children: [{ text: '' }],
      };
      Transforms.insertNodes(editor, word);
      Transforms.move(editor);
    }
  },
  createWordParagraph(event, editor) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const empty = {
        type: 'empty',
        children: [{ text: '' }],
      };
      const word = {
        type: 'word',
        children: [{ text: '' }],
      };
      Transforms.insertNodes(editor, empty);
      Transforms.insertNodes(editor, word);
      Transforms.move(editor);
    }
  },
  addNewNode(editor) {
    const sentence = {
      type: 'sentence',
      children: [{ text: '' }],
    };
    Transforms.insertNodes(editor, sentence);
  },
};
