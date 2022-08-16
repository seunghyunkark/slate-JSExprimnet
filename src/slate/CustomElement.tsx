import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { createEditor, Transforms, Descendant, Editor } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';

const Orange = styled.span`
  color: salmon;
`;

function CustomElement() {
  const [editor] = useState(() => withReact(createEditor()));
  const [text, setText] = useState('');
  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'Press ` key ...' }],
    },
  ];

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'li':
        return <Li {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // export const MarkButton = ({ format}) => {
  //   const editor = useSlate();
  //   return (
  //     <Button
  //       active={isMarkActive(editor, format)}
  //       onMouseDown={event => {
  //         event.preventDefault();
  //         toggleMark(editor, format);
  //       }}
  //     >
  //     </Button>
  //   );
  // };
  // export const isMarkActive = (editor, format) => {
  //   const marks = Editor.marks(editor);
  //   return marks ? marks[format] === true : false;
  // };
  // export const toggleMark = (editor, format) => {
  //   const isActive = isMarkActive(editor, format);

  //   if (isActive) {
  //     Editor.removeMark(editor, format);
  //   } else {
  //     Editor.addMark(editor, format, true);
  //   }
  // };

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
                  match: (n) => n.type === 'li',
                });
                // Toggle the block type depending on whether there's already a match.
                Transforms.setNodes(
                  editor,
                  { type: match ? 'paragraph' : 'li' },
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

const Li = (props) => {
  return <li>{props.children}</li>;
};
const DefaultElement = (props) => {
  return <p>{props.children}</p>;
};

export default CustomElement;
