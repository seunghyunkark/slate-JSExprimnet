import { useCallback, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { CustomEditor } from './utils/CustomEditor';
import styled from 'styled-components';

function ExecutingCommand() {
  const [editor] = useState(() => withReact(createEditor()));
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
      <h2>Executing Command</h2>
      <Slate editor={editor} value={initialValue}>
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
              CustomEditor.toggleBlock(editor, 'change');
            }}
          >
            Change Line
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

export default ExecutingCommand;
