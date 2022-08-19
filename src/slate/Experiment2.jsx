import { useCallback, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { CustomEditor } from './components/CustomEditor';
import { serializePlain } from './utils/serialize';
import { Element } from './components/CustomElement';
import { Leaf } from './components/CustomFormatting';

function Experiment2() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Text something ...' }],
    },
  ];

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  return (
    <>
      <h2>Experiment 2 : Serializing(Plain Text)</h2>
      <p>
        <a href='https://docs.slatejs.org/concepts/10-serializing#deserializing'>
          참고
        </a>
      </p>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          const content = serializePlain(value);
          setText(content);
        }}
      >
        <Editable
          className={styles.editor}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
        <div>
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleMark(editor, 'custom');
            }}
          >
            Change Mark
          </button>{' '}
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleBlock(editor, 'correct');
            }}
          >
            Change Line
          </button>{' '}
        </div>
      </Slate>
      <strong>Serialize : </strong> {text}
    </>
  );
}

export default Experiment2;
