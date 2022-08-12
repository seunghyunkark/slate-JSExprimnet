import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { createEditor, Transforms, Text } from 'slate';
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
    // axios
    //   .post('192.168.0.63:9999/simple_color', {
    //     text: 'Hello World',
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.warn(err));
    console.log(Text);
  };
  return (
    <>
      <h2>Color Change</h2>
      <p> POST : http://pcanpi.iptime.org:9999/simple_color</p>
      <div className={styles.editor}>
        <Slate editor={editor} value={initialValue}>
          <Editable
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                editor.insertText('Enter');
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
