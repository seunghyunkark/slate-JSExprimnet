import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillContainer() {
  const [textData, setTextData] = useState('');
  return (
    <>
      <h2>Quill</h2>
      <p>npm install react-quill --save</p>
      <p>
        <a href='https://www.npmjs.com/package/react-quill#usage'>
          Usuage of Quill
        </a>
      </p>
      <ReactQuill theme='snow' value={textData} onChange={setTextData} />
      <table>
        <tr>
          <th>Show text data</th>
        </tr>
        <tr>
          <td>{textData}</td>
        </tr>
      </table>
    </>
  );
}
export default QuillContainer;
