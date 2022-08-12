import { useState } from 'react';
import styled from 'styled-components';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../styles/Wyswyg.module.css';

const Orange = styled.span`
  color: salmon;
`;

function SlateContainer() {
  const [editor] = useState(() => withReact(createEditor()));
  const [textData, setTextData] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];
  return (
    <>
      <h2>Slate</h2>
      <p>npm install slate slate-react</p>
      <p>
        <a href='https://docs.slatejs.org/'>Usuage of Slate</a>
      </p>
      <ul>
        <li>줄바꿈할 때마다 배열에 객체가 하나씩 추가됨(onChange의 이벤트)</li>
        <li>
          {`<Slate>에 적용되는 것(onChange)과 <Editable>에 적용되는 것(onKeyDown) 구분 필요`}
        </li>
      </ul>
      <div className={styles.editor}>
        <Slate
          editor={editor}
          value={textData}
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
      <table className={styles.table}>
        <tr>
          <th>Show text data</th>
        </tr>
        <tr>
          <td>{textData}</td>
        </tr>
      </table>
      <button
        className={styles.button}
        onClick={() => setTextData((cur) => <Orange>{cur}</Orange>)}
      >
        오렌지
      </button>
    </>
  );
}

export default SlateContainer;
