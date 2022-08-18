import escapeHtml from 'escape-html';
import { useCallback, useState } from 'react';
import { createEditor, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { CustomEditor } from './CustomEditor';
import styled from 'styled-components';
import { serializeHTML } from './serialize';
// import { serializeHTML } from './serialize';

function Experiment3() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Text something ...' }],
    },
  ];

  // const serialize = (node) => {
  //   let nodeText = escapeHtml(node.text);
  //   if (Text.isText(node)) {
  //     if (node['custom']) {
  //       nodeText = `<strong>` + nodeText + `</strong>`;
  //     }

  //     if (node['italic']) {
  //       nodeText = `<em>` + nodeText + `</em>`;
  //     }

  //     if (node['underlined']) {
  //       nodeText = `<u>` + nodeText + `</u>`;
  //     }
  //     // Other marks should go here like above

  //     return nodeText;
  //   }

  //   if (Array.isArray(node)) {
  //     return node.map((subNode) => serializeSubNode(subNode)).join('');
  //   }

  //   return serializeSubNode(node);
  // };

  // const serializeSubNode = (node) => {
  //   const children = node.children.map((n) => serialize(n)).join('');
  //   switch (node.type) {
  //     case 'change':
  //       return `<p><Strike>${children}</Strike></p>`;
  //     default:
  //       return `<p>${children}</p>`;
  //   }
  // };

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
      <h2>Experiment 3 : Serializing(HTML)</h2>
      <p>
        <a href='https://gist.github.com/abhishekbhardwaj/168c13869ac043f070e954e0057dcbd7'>
          참고
        </a>
      </p>
      <p>
        Need :{' '}
        <a href='https://www.npmjs.com/package/escape-html'>escape-html</a>
      </p>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          const content = serializeHTML(value);
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
              CustomEditor.toggleMark(editor);
            }}
          >
            Change Mark
          </button>{' '}
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleBlock(editor);
            }}
          >
            Change Line
          </button>{' '}
        </div>
      </Slate>
      <strong>Serialize : </strong>
      {text}
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

export default Experiment3;
