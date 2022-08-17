import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import styles from '../../styles/Wyswyg.module.css';

function CKEditorContainer() {
  const [textData, setTextData] = useState('');
  return (
    <>
      <h2>CKEditor</h2>
      <p>npm install --save @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic</p>
      <p>
        <a href='https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/quick-start.html'>
          Usuage of CKEditor
        </a>
      </p>
      <div className={styles.editor}>
        <CKEditor
          editor={ClassicEditor}
          data='<p>Hello from CKEditor 5!</p>'
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('CKEditor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setTextData(data);
          }}
          onBlur={(event, editor) => {
            console.log('CKEditor Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('CKEditor Focus.', editor);
          }}
        />
      </div>
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
export default CKEditorContainer;
