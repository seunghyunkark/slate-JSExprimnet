import { useState, useCallback } from 'react';
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { CustomEditor } from './components/CustomEditor';
import axios from 'axios';
import { deserialize, serializePlain } from './utils/serialize';
import { Element } from './components/CustomElement';
import { Leaf } from './components/CustomFormatting';

function Experiment9() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const [nodeData, setNodeData] = useState('');
  const initialValue = [
    {
      type: 'sentence',
      children: [{ text: '' }],
    },
  ];
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
      <h2>Experiment 9 : Styling Nodes</h2>
      <p> POST : http://pcanpi.iptime.org:9999/simple_color</p>
      <p>
        <li>renderLeaf(mark)가 renderElement(block)보다 우선적으로 렌더링됨</li>
      </p>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          //마우스 커서가 있는 곳의 데이터만 보내도록 함
          const selection = CustomEditor.isSelect(editor);
          const path = selection.focus.path[0];
          const selectedNode = [value[path]];
          const sendingText = serializePlain(selectedNode);
          setText(sendingText);
          //현재 slate 노드 데이터들 확인
          setNodeData(JSON.stringify(value));
        }}
      >
        <Editable
          className={styles.editor}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            CustomEditor.createSentence(event, editor);
            CustomEditor.createParagraph(event, editor);
          }}
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
                  console.log('response : ', res.data);
                  //node 세팅. 받은 데이터를 correct 등 다른 type으로 지정할 수 있음
                  const insertData = { type: 'sentence', children: [] };
                  res.data.forEach((item) => {
                    //각각 [] 안에 있는 node들 벗기기
                    const [node] = htmlStringToValue(item);
                    //node들 한 객체(insertData)의 children에 몰아넣기
                    insertData.children.push(node);
                  });
                  const selection = CustomEditor.isSelect(editor);
                  const path = selection.focus.path[0];
                  CustomEditor.changeNode(editor, insertData, path);
                  // CustomEditor.addNewNode(editor);
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

export default Experiment9;
