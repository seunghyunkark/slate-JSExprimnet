import { useState, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { CustomEditor } from './utils/CustomEditor';
import axios from 'axios';
import { deserialize, serializePlain } from './utils/serialize';
import { Element } from './components/RenderElement';
import { Leaf } from './components/RenderLeaf';

function Experiment7() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const [nodeData, setNodeData] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
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
      <h2>Experiment 7 : Look what Nodes are doing</h2>
      <p> POST : http://pcanpi.iptime.org:9999/simple_color</p>
      <p>
        <li>POST 보낼 경우 클릭한 노드 children의 text 값이 보내짐</li>
        <li>
          보낸 후 줄바꿈 또는 해당 노드의 커서가 클릭 된 것 앞부분까지 바뀌는
          현상(editor의 insertNode, insertFragment 메소드 작동 원리 파악하기)
        </li>
        <li>
          p 태그로 렌더링되든 그렇지 않든 editor.selection의 path 값은 노드
          배열의 순서를 기준으로 함
        </li>
        <li>
          anchor와 focus의 offset : 텍스트의 index. text 맨 앞이 0 (예) |text 일
          때 0
        </li>
        <li>
          anchor와 focus의 path : 맨 처음 숫자는 Node의 index. Array로 된 값으로
          [0, 0]이 맨 처음
        </li>
        <li>
          렌더링할 때 Element의 default 값을 span 단위로 나누면 p로 끊어지지
          않고 계속 붙음
        </li>
        <li>
          단, Enter를 누를 경우 기본적으로 node 객체가 새로 생성됨(이를 이용해
          .키를 누를 경우 node 객체를 새로 생성하도록 할 수 있지 않을까?
        </li>
      </p>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          //마우스 커서가 있는 곳의 데이터만 보내도록 함
          const selection = CustomEditor.isSelect(editor);
          console.log('selection :', selection);
          const path = selection.focus.path;
          const selectedNode = [value[path[0]]];
          console.log('selectdNode :', selectedNode);
          const sendingText = serializePlain(selectedNode);
          setText(sendingText);
          setNodeData(JSON.stringify(value));
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
        <button
          onClick={() => {
            axios
              .post('http://pcanpi.iptime.org:9999/simple_color', {
                text: text,
              })
              .then((res) => {
                //응답 데이터
                // console.log('response : ', res.data);
                //node 세팅. 받은 데이터를 correct 등 다른 type으로 지정할 수 있음
                const insertData = { type: 'correct', children: [] };
                res.data.forEach((item) => {
                  //각각 [] 안에 있는 node들 벗기기
                  const [node] = htmlStringToValue(item);
                  //node들 한 객체(insertData)의 children에 몰아넣기
                  insertData.children.push(node);
                });
                CustomEditor.addNode(editor, insertData);
              })
              .catch((err) => console.log(err));
          }}
        >
          POST
        </button>
        {text}
      </Slate>
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

export default Experiment7;
