import { useState, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { CustomEditor } from './utils/CustomEditor';
import axios from 'axios';
import { deserialize, serializePlain } from './utils/serialize';
import { Element } from './components/RenderElement';
import { Leaf } from './components/RenderLeaf';

function Experiment8() {
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
      <h2>Experiment 8 : Moifying Current Node and Making Sentence Nodes</h2>
      <p> POST : http://pcanpi.iptime.org:9999/simple_color</p>
      <p>
        <li>
          Transforms.insertNodes, removeNodes를 이용해서 줄바꿈이 이상해지는 일
          없이 노드를 수정할 수 있다{' '}
          <a href='https://docs.slatejs.org/api/transforms#transforms.insertnodes-editor-editor-nodes-node-or-node-options'>
            참고
          </a>
        </li>
        <li>
          onKeyDown 이벤트를 통해 특정 키를 눌렀을 때 (예: 마침표, 물음표,
          느낌표 등) 새로운 노드를 삽입할 수 있다.
        </li>
        <li>
          노드 단위별로 텍스트 데이터를 내보내고 이를 오버라이딩 할 수 있다.
        </li>
        <li>
          노드가 끊어질 때, 실제 텍스트는 없지만 새롭게 삽입된 노드가 있을 경우
          해당 노드를 삭제하기 위해 delete 버튼을 눌러야한다. 이 경우 두 번
          delete 키를 눌러야 공백이 지워지는 경우가 발생한다.(눈에 보이는 공백
          지우기 위해 한 번, 눈에 보이지 않는 노드를 지우기 위해 한 번 입력해서
          총 두 번)
        </li>
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
        </div>
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

export default Experiment8;
