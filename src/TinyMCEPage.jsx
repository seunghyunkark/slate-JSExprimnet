import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from '../styles/Wyswyg.module.css';

function TinyMCEContainer() {
  const [textData, setTextData] = useState('');
  return (
    <>
      <h2>Tiny MCE</h2>
      <p>npm install @tinymce/tinymce-react</p>
      <p>
        <a href='https://www.tiny.cloud/docs/tinymce/6/'>Usuage of Tiny MCE</a>
      </p>
      <div className={styles.editor}>
        <Editor
          initialValue='<p>This is the initial content of the editor.</p>'
          init={{
            height: 200,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </div>
    </>
  );
}
export default TinyMCEContainer;
