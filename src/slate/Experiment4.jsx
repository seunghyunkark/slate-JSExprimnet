import { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { deserialize, serializePlain } from './utils/serialize';

function Experiment4() {
  const [editor] = useState(() => withReact(createEditor()));
  const [HTMLtext, setHTMLText] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [
        {
          text: `<p>An opening paragraph with a <a href="https://example.com">link</a> in it.</p>
          <blockquote><p>A wise quote.</p></blockquote>
          <p>A closing paragraph!</p>`,
        },
      ],
    },
  ];

  const htmlStringToValue = (str) => {
    //HTML str -> HTML node
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    //HTML node -> slate value
    let value = deserialize(doc.body);
    console.log('Exp 4 :', value);
  };

  return (
    <>
      <h2>Experiment 4 : Deserializing(HTML)</h2>
      <p>
        <a href='https://docs.slatejs.org/concepts/10-serializing#deserializing'>
          참고
        </a>
      </p>
      <p>
        Need :{' '}
        <a href='https://www.npmjs.com/package/slate-hyperscript'>
          slate-hyperscript
        </a>
      </p>
      <a></a>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          const content = serializePlain(value);
          setHTMLText(content);
        }}
      >
        <Editable className={styles.editor} />
      </Slate>
      <div>
        <strong>HTML :</strong>
        {HTMLtext}
      </div>
      <div>
        <strong>Deserialize : See the console</strong>{' '}
        {htmlStringToValue(HTMLtext)}
      </div>
    </>
  );
}

export default Experiment4;
