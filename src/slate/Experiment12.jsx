import { useState, useCallback } from 'react';
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { CustomEditor } from './utils/CustomEditor';
import axios from 'axios';
import { deserialize, serializeHTML, serializePlain } from './utils/serialize';
import { Element } from './components/RenderElement';
import { Leaf } from './components/RenderLeaf';
import { LeafButton, ElementButton } from './components/Button';

function Experiment12() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const [nodeData, setNodeData] = useState('');
  const initialValue = [
    {
      type: 'word',
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
      <h2>Experiment 12 : Word Variant</h2>
      <p> POST : http://pcanpi.iptime.org:9999/simple_color</p>
      <p>
        <li>Fix Errors: </li>
      </p>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          //마우스 커서가 있는 곳의 데이터만 보내도록 함
          const selection = CustomEditor.isSelect(editor);
          const path = selection?.focus.path[0] || 0;
          const selectedNode = [value[path]];
          const sendingText = serializeHTML(selectedNode);
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
            CustomEditor.createWordParagraph(event, editor);
            CustomEditor.createWord(event, editor);
          }}
        />
        <div>
          <div>
            <li>Mark </li>
            <LeafButton editor={editor} format='bold' />
            <LeafButton editor={editor} format='code' />
            <LeafButton editor={editor} format='italic' />
            <LeafButton editor={editor} format='underline' />
            <LeafButton editor={editor} format='custom' />
            <LeafButton editor={editor} format='blue' />
            <LeafButton editor={editor} format='red' />
          </div>
          <div>
            <li>Block </li>
            <ElementButton editor={editor} format='block-quote' />
            <ElementButton editor={editor} format='heading-one' />
            <ElementButton editor={editor} format='heading-two' />
            <ElementButton editor={editor} format='list' />
            <ElementButton editor={editor} format='paragraph' />
            <ElementButton editor={editor} format='correct' />
            <ElementButton editor={editor} format='sentence' />
            <ElementButton editor={editor} format='empty' />
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
                  const insertData = { type: 'response', children: [] };
                  res.data.forEach((item) => {
                    //각각 [] 안에 있는 node들 벗기기
                    const [node] = htmlStringToValue(item);
                    //node들 한 객체(insertData)의 children에 몰아넣기
                    insertData.children.push(node);
                  });
                  const selection = CustomEditor.isSelect(editor);
                  const path = selection?.focus.path[0] || 0;
                  CustomEditor.changeNode(editor, insertData, path);
                  // CustomEditor.addNewNode(editor);
                })
                .catch((err) => console.log(err));
            }}
          >
            POST
          </button>
          <strong> Send : </strong> {text}
        </div>
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

export default Experiment12;
