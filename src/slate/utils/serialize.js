import { Text, Node } from 'slate';
import escapeHtml from 'escape-html';
import { jsx } from 'slate-hyperscript';

export const serializePlain = (nodes) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};

export const serializeHTML = (node) => {
  let nodeText = escapeHtml(node.text);
  if (Text.isText(node)) {
    if (node['custom']) {
      nodeText = `<strong>` + nodeText + `</strong>`;
    }

    if (node['italic']) {
      nodeText = `<em>` + nodeText + `</em>`;
    }

    if (node['underlined']) {
      nodeText = `<u>` + nodeText + `</u>`;
    }
    // Other marks should go here like above

    return nodeText;
  }

  if (Array.isArray(node)) {
    return node.map((subNode) => serializeSubNode(subNode)).join('');
  }

  return serializeSubNode(node);
};

const serializeSubNode = (node) => {
  const children = node.children.map((n) => serializeHTML(n)).join('');
  switch (node.type) {
    case 'change':
      return `<p><Strike>${children}</Strike></p>`;
    default:
      return `<p>${children}</p>`;
  }
};

export const deserialize = (el, markAttributes = {}) => {
  // Node.TEXT_NODE(3)
  if (el.nodeType === 3) {
    return jsx('text', markAttributes, el.textContent);
    // Node.ELEMENT_NODE(1)
  } else if (el.nodeType !== 1) {
    return null;
  }

  const nodeAttributes = { ...markAttributes };

  // define attributes for text nodes
  switch (el.nodeName) {
    case 'STRONG':
      nodeAttributes.custom = true;
    case 'SPAN':
      nodeAttributes.color = true;
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
