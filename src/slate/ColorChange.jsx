import { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { createEditor, Transforms, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';

const Orange = styled.span`
  color: salmon;
`;

function ColorChange() {
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
      .post('http://pcanpi.iptime.org:9999/simple_color', {
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
      <div>{text}</div>
      <button className={styles.button} onClick={handlePost}>
        Change Color
      </button>
    </>
  );
}

export default ColorChange;
