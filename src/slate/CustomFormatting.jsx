import { useCallback, useState } from 'react';
import { createEditor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';

function CustomFormatting() {
  const [editor] = useState(() => withReact(createEditor()));
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Mark contents and press ` key ...' }],
    },
  ];

  const renderLeaf = useCallback((props) => {
    return <Change {...props} />;
  }, []);

  return (
    <>
      <h2>Applying Custom Formatting</h2>
      <div className={styles.editor}>
        <Slate editor={editor} value={initialValue}>
          <Editable
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (event.key === '`') {
                event.preventDefault();
                Transforms.setNodes(
                  editor,
                  { custom: true },
                  { match: (n) => Text.isText(n), split: true }
                );
              }
            }}
          />
        </Slate>
      </div>
    </>
  );
}

const Change = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.custom ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

export default CustomFormatting;
