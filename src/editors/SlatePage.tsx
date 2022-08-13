import { useState } from 'react';
import styled from 'styled-components';
import { createEditor, Descendant, BaseElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string; bold?: true };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
const Orange = styled.span`
  color: salmon;
`;

function SlateContainer() {
  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];

  const [editor] = useState(() => withReact(createEditor()));

  return (
    <>
      <h2>Slate</h2>
      <p>npm install slate slate-react</p>
      <p>
        <a href='https://docs.slatejs.org/'>Usuage of Slate</a>
      </p>
      <ul>
        <li>줄바꿈할 때마다 배열에 객체가 하나씩 추가됨(onChange의 이벤트)</li>
        <li>{`<Slate>에 적용되는 것(onChange)과 <Editable>에 적용되는 것(onKeyDown) 구분 필요`}</li>
      </ul>
      <div className={styles.editor}>
        <Slate editor={editor} value={initialValue}>
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Show text data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      <button className={styles.button}>오렌지</button>
    </>
  );
}

export default SlateContainer;
