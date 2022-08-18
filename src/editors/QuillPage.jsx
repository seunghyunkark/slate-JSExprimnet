import { useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../../styles/Wyswyg.module.css';
const Orange = styled.span`
  color: salmon;
`;

function QuillContainer() {
  const [textData, setTextData] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  return (
    <>
      <h2>Quill</h2>
      <p>npm install react-quill</p>
      <p>
        <a href='https://www.npmjs.com/package/react-quill#usage'>
          Usuage of Quill
        </a>
      </p>
      <ReactQuill
        modules={modules}
        className={styles.editor}
        theme='snow'
        value={textData}
        onChange={setTextData}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Show text data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{textData}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default QuillContainer;
