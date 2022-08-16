import { useState } from 'react';
import styled from 'styled-components';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';

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
  const [text, setText] = useState('');

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
        <li>
          타입스크립트 설정{' '}
          <a href='https://docs.slatejs.org/concepts/12-typescript'>참고</a>
        </li>
        <li>
          타입스크립트 예제{' '}
          <a href='https://codesandbox.io/s/6zpfi?file=/src/components/SlateEditor/SlateEditor.tsx'>
            참고
          </a>
        </li>
        <li>
          paragraph 단위별 변화 : styled component 태그 값 반영 가능
          <a href='https://docs.slatejs.org/walkthroughs/03-defining-custom-elements'>
            참고
          </a>
        </li>
      </ul>
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Show text data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{text}</td>
          </tr>
        </tbody>
      </table>
      <button className={styles.button}>오렌지</button>
    </>
  );
}

export default SlateContainer;
