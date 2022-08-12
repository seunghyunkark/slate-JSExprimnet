import { useState } from 'react';
import styled from 'styled-components';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';

const Orange = styled.span`
  color: salmon;
`;

function SlateContainer() {
  const [editor] = useState(() => withReact(createEditor()));
  const [textData, setTextData] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Hello World' }],
    },
  ];
  return (
    <>
      <h2>Color Change</h2>
      <p> POST : http://pcanpi.iptime.org:9999/simple_color</p>
      <div className={styles.editor}>
        <Slate
          editor={editor}
          value={initialValue}
          onChange={(e) => {
            console.log('[Slate]onChange: ', e);
            console.log('[Slate]textValue: ', e[0].children[0].text);
            setTextData(e[0].children[0].text);
          }}
        >
          <Editable
            onKeyDown={(event) => {
              if (event.key === '&') {
                // Prevent the ampersand character from being inserted.
                console.log('Slate: You have just pressed a & key');
                event.preventDefault();
                // Execute the `insertText` method when the event occurs.
                editor.insertText('and');
              }
            }}
          />
        </Slate>
      </div>
    </>
  );
}

export default SlateContainer;
