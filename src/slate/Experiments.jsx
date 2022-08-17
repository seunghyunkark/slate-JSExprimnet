import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { createEditor, Transforms, Descendant, Editor } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';

const Orange = styled.span`
  color: salmon;
`;

function Experiments() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Experiments ...' }],
    },
  ];

  return (
    <>
      <h2>Experiments</h2>
      <div className={styles.editor}>
        <Slate editor={editor} value={initialValue}>
          <BlockButton format='orange' />
          <Editable />
        </Slate>
      </div>
    </>
  );
}

const BlockButton = ({ format }) => {
  const editor = useSlate();
  const isBlockActive = (editor, format) => {
    const match = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });
    return !!match;
  };
  const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);

    Transforms.unwrapNodes(editor, {
      match: (n) => n.type === format,
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : format,
    });

    if (!isActive) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };
  return (
    <button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {format}
    </button>
  );
};

export default Experiments;
