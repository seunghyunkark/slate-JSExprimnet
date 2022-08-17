import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { createEditor, Transforms, Descendant, Editor } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';

function CustomElement() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Press ` key ...' }],
    },
  ];

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'change':
        return <Change {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <>
      <h2>Defining Custom Elements</h2>
      <div className={styles.editor}>
        <Slate editor={editor} value={initialValue}>
          <Editable
            renderElement={renderElement}
            onKeyDown={(event) => {
              if (event.key === '`') {
                event.preventDefault();
                // Determine whether any of the currently selected blocks are code blocks.
                const [match] = Editor.nodes(editor, {
                  match: (n) => n.type === 'change',
                });
                // Toggle the block type depending on whether there's already a match.
                Transforms.setNodes(
                  editor,
                  { type: match ? 'paragraph' : 'change' },
                  { match: (n) => Editor.isBlock(editor, n) }
                );
              }
            }}
          />
        </Slate>
      </div>
    </>
  );
}

const Orange = styled.span`
  color: salmon;
  text-decoration-line: line-through;
`;

const Change = (props) => {
  return <Orange>{props.children}</Orange>;
};
const DefaultElement = (props) => {
  return <p>{props.children}</p>;
};

export default CustomElement;
