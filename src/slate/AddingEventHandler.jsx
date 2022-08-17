import { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { createEditor, Transforms, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';

const Orange = styled.span`
  color: salmon;
`;

function AddingEventHandler() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Type &' }],
    },
  ];

  return (
    <>
      <h2>Adding Event Handlers</h2>
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
          <Editable
            onKeyDown={(event) => {
              if (event.key === '&') {
                // Prevent the ampersand character from being inserted.
                event.preventDefault();
                // Execute the `insertText` method when the event occurs.
                editor.insertText('and');
              }
            }}
          />
        </Slate>
      </div>
      <div>{text}</div>
    </>
  );
}
export default AddingEventHandler;
