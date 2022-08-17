import { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styles from '../../styles/Wyswyg.module.css';

function DraftjsContainer() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <>
      <h2>Draft.js</h2>
      <p>npm install draft-js @types/draft-js(타입스크립트 미지원 @types도 설치 필요)</p>
      <p>
        <a href='https://draftjs.org/docs/getting-started'>Usuage of Draft.js</a>
      </p>
      <div className={styles.editor}>
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </>
  );
}
export default DraftjsContainer;
