import { useCallback, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { CustomEditor } from './components/CustomEditor';
import axios from 'axios';
import { deserialize, serializePlain } from './utils/serialize';
import { Element } from './components/CustomElement';
import { Leaf } from './components/CustomFormatting';

function Experiment5() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const [nodeData, setNodeData] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'First ...' }],
    },
  ];
  const [editorValue, setEditorValue] = useState(initialValue);
  const htmlStringToValue = (str) => {
    //HTML str -> HTML node
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    //HTML node -> slate value
    return deserialize(doc.body);
  };

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <>
      <h2>Experiment 5 : Color Change</h2>
      <p> POST : http://pcanpi.iptime.org:9999/simple_color</p>
      <Slate
        editor={editor}
        value={editorValue}
        onChange={(value) => {
          //node data
          setNodeData(JSON.stringify(value));
          //plain text data
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
          <button
            onClick={() => {
              axios
                .post('http://pcanpi.iptime.org:9999/simple_color', {
                  text: text,
                })
                .then((res) => {
                  //응답 데이터
                  // console.log('response : ', res.data);
                  //node 세팅
                  const insertData = { type: 'paragraph', children: [] };
                  res.data.forEach((item) => {
                    //각각 [] 안에 있는 node들 벗기기
                    const [node] = htmlStringToValue(item);
                    //node들 한 객체(insertData)의 children에 몰아넣기
                    insertData.children.push(node);
                  });
                  CustomEditor.addFragment(editor, [insertData]);
                })
                .catch((err) => console.log(err));
            }}
          >
            POST
          </button>
        </div>
      </Slate>
      <strong>Send : </strong> {text}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Show text data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{nodeData}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Experiment5;
