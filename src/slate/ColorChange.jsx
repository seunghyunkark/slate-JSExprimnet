import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';

const Orange = styled.span`
  color: salmon;
`;

function SlateContainer() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Hello World' }],
    },
  ];
  const handlePost = async () => {
    axios
      .post('192.168.0.63:9999/simple_color', {
        text: 'Hello World',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.warn(err));
  };
  return (
    <>
      <h2>Color Change</h2>
      <p> POST : http://pcanpi.iptime.org:9999/simple_color</p>
      <div className={styles.editor}>
        <Slate editor={editor} value={initialValue}>
          <Editable
            onKeyDown={(event) => {
              if (!event.ctrlKey) {
                return;
              }

              switch (event.key) {
                // When "`" is pressed, keep our existing code block logic.
                case '`': {
                  event.preventDefault();
                  const [match] = Editor.nodes(editor, {
                    match: (n) => n.type === 'code',
                  });
                  Transforms.setNodes(
                    editor,
                    { type: match ? 'paragraph' : 'code' },
                    { match: (n) => Editor.isBlock(editor, n) }
                  );
                  break;
                }

                // When "B" is pressed, bold the text in the selection.
                case 'b': {
                  event.preventDefault();
                  Transforms.setNodes(
                    editor,
                    { bold: true },
                    // Apply it to text nodes, and split the text node up if the
                    // selection is overlapping only part of it.
                    { match: (n) => Text.isText(n), split: true }
                  );
                  break;
                }
              }
            }}
          />
        </Slate>
      </div>

      <button className={styles.button} onClick={handlePost}>
        Change Color
      </button>
    </>
  );
}

export default SlateContainer;
