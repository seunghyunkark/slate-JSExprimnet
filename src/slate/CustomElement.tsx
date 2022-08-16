import { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { createEditor, Transforms, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';

const Orange = styled.span`
  color: salmon;
`;

function CustomElement() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'Hello World' }],
    },
  ];

  return (
    <>
      <h2>Custom Elements</h2>
      <div className={styles.editor}>
        <Slate
          editor={editor}
          value={initialValue}
          onChange={(value) => {
            const isAstChange = editor.operations.some(
              (op) => 'set_selection' !== op.type
            );
            if (isAstChange) {
              const content = JSON.stringify(value);
              setText(content);
            }
          }}
        >
          <Editable />
        </Slate>
      </div>
    </>
  );
}

export default CustomElement;
