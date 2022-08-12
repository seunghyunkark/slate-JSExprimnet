import { useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../styles/Wyswyg.module.css';

const Orange = styled.span`
  color: salmon;
`;

function QuillContainer() {
  const [textData, setTextData] = useState('');
  return (
    <>
      <h2>Quill</h2>
      <p>npm install react-quill</p>
      <p>
        <a href='https://www.npmjs.com/package/react-quill#usage'>
          Usuage of Quill
        </a>
      </p>
      <p>
        {`"Quill은 기본적으로 문서 모델을 매우 단순하게 가져가고 있으며, 모델에
        대한 임의의 조작이 필요할 때는 Delta라는 개념을 이용하여 처리하고
        있습니다. 이는 쉽게 생각하면 에디터 내의 문서는 기본적으로 DOM 객체
        형태로 다루어지면서도 조작이 필요할 때는 각 글자의 인덱스를 기준으로
        글자를 추가하거나, 삭제하거나, 스타일을 변경하는 등의 동작을 수행하는
        것입니다. 이렇게 문서를 다루는 Quill의 API는 매우 깨끗하고 단순하게
        정리되어 있기 때문에 일반적인 용도에서 Quill을 텍스트 에디터로 활용하는
        것은 좋은 선택이 될 수 있습니다. 하지만 이러한 종류의 오픈소스들이
        그렇듯이, 단순하고 사용하기 쉬운 구조는 특정 목적을 위해 확장하기
        어렵다는 단점이 있었고, 저희가 추가하거나 개선하고 싶었던 기능들도 API가
        없어서 포기해야 하는 경우가 점점 생겨나기 시작했습니다."`}
        (참고자료 :{' '}
        <a href='https://jheo.io/blog/a-tales-of-two-editor/'>
          두 에디터 이야기
        </a>
        )
      </p>
      <ReactQuill
        className={styles.editor}
        theme='snow'
        value={textData}
        onChange={setTextData}
      />
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
export default QuillContainer;
