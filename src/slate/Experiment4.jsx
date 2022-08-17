import { useState } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import styles from '../../styles/Wyswyg.module.css';
import { jsx } from 'slate-hyperscript';

function Experiment4() {
  const [editor] = useState(() => withReact(createEditor()));
  const [HTMLtext, setHTMLText] = useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [
        {
          text: `<p>An opening paragraph with a <a href="https://example.com">link</a> in it.</p>
      <blockquote><p>A wise quote.</p></blockquote>
      <p>A closing paragraph!</p>`,
        },
      ],
    },
  ];

  const serialize = (nodes) => {
    return nodes.map((n) => Node.string(n)).join('\n');
  };

  const deserialize = (el, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
      return jsx('text', markAttributes, el.textContent);
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const nodeAttributes = { ...markAttributes };

    // define attributes for text nodes
    switch (el.nodeName) {
      case 'strong':
        nodeAttributes.bold = true;
    }

    const children = Array.from(el.childNodes)
      .map((node) => deserialize(node, nodeAttributes))
      .flat();

    if (children.length === 0) {
      children.push(jsx('text', nodeAttributes, ''));
    }

    switch (el.nodeName) {
      case 'BODY':
        return jsx('fragment', {}, children);
      case 'BR':
        return '\n';
      case 'BLOCKQUOTE':
        return jsx('element', { type: 'quote' }, children);
      case 'P':
        return jsx('element', { type: 'paragraph' }, children);
      case 'A':
        return jsx(
          'element',
          { type: 'link', url: el.getAttribute('href') },
          children
        );
      default:
        return children;
    }
  };
  return (
    <>
      <h2>Experiment 4 : Deserializing(HTML)</h2>
      <p>
        <a href='https://docs.slatejs.org/concepts/10-serializing#deserializing'>
          참고
        </a>
      </p>
      <p>
        Need :{' '}
        <a href='https://www.npmjs.com/package/slate-hyperscript'>
          slate-hyperscript
        </a>
      </p>
      <a></a>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          const content = serialize(value);
          setHTMLText(content);
        }}
      >
        <Editable className={styles.editor} />
      </Slate>
      <div>
        <strong>HTML :</strong>
        {HTMLtext}
      </div>
      <div>
        <strong>Deserialize :</strong> {JSON.stringify(deserialize(HTMLtext))}
      </div>
    </>
  );
}

export default Experiment4;
