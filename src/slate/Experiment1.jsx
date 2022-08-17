import { useCallback, useState } from 'react';
import axios from 'axios';
import { Node, createEditor } from 'slate';
import {
  Slate,
  Scrubber,
  Text,
  Editor,
  Editable,
  withReact,
} from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { CustomEditor } from './CustomEditor';
import styled from 'styled-components';

function Experiment1() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Click the button ...' }],
    },
  ];

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'change':
        return <ChangeLine {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props) => {
    return <ChangeMark {...props} />;
  }, []);

  return (
    <>
      <h2>Experiment 1 : Insert Data</h2>
      <p> POST : http://pcanpi.iptime.org:9999/simple_color</p>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          const content = value.map((n) => Node.string(n)).join('\n');
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
            onClick={() => {
              editor.getFragment;
              axios
                .post('http://pcanpi.iptime.org:9999/simple_color', {
                  text: text,
                })
                .then((res) => {
                  console.log('responsive : ', res);
                  console.log('first data : ', res.data[0]);
                  CustomEditor.addData(editor, res.data[0]);
                })
                .catch((err) => console.log(err));
            }}
          >
            POST
          </button>
        </div>
      </Slate>
    </>
  );
}

const Strike = styled.span`
  text-decoration: line-through;
`;

const ChangeLine = (props) => {
  return (
    <p>
      <Strike>{props.children}</Strike>
    </p>
  );
};
const ChangeMark = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.custom ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

const DefaultElement = (props) => {
  return <p>{props.children}</p>;
};

export default Experiment1;
