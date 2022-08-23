import { Text, Node } from 'slate';
import escapeHtml from 'escape-html';
import { jsx } from 'slate-hyperscript';

export const serializePlain = (nodes) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};

export const serializeHTML = (node) => {
  let nodeText = escapeHtml(node.text);
  if (Text.isText(node)) {
    if (node['bold']) {
      nodeText = `<strong>` + nodeText + `</strong>`;
    }
    if (node['code']) {
      nodeText = `<code>` + nodeText + `</code>`;
    }
    if (node['italic']) {
      nodeText = `<em>` + nodeText + `</em>`;
    }

    if (node['underline']) {
      nodeText = `<u>` + nodeText + `</u>`;
    }

    if (node['custom']) {
      nodeText = `<span style="color:green">` + nodeText + `</span>`;
    }

    if (node['blue']) {
      nodeText = `<span style="color:blue">` + nodeText + `</span>`;
    }

    if (node['red']) {
      nodeText = `<span style="color:red">` + nodeText + `</span>`;
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
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`;
    case 'heading-one':
      return `<h1>${children}</h1>`;
    case 'heading-two':
      return `<h2>${children}</h2>`;
    case 'list':
      return `<li>${children}</li>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'correct':
      return `<Orange>${children}</Orange>`;
    case 'change':
      return `<p><Strike>${children}</Strike></p>`;
    case 'empty':
      return `<br />`;
    default:
      return `<span>${children}</span>`;
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
      nodeAttributes.bold = true;
      break;
    case 'CODE':
      nodeAttributes.code = true;
      break;
    case 'EM':
      nodeAttributes.italic = true;
      break;
    case 'U':
      nodeAttributes.underline = true;
      break;
  }

  //element의 스타일에 따른 정의
  const nodeStyle = el.style;
  const color = nodeStyle.color;
  switch (color) {
    //green
    case 'green':
      nodeAttributes.custom = true;
      break;
    //blue
    case 'blue':
      nodeAttributes.blue = true;
      break;
    //red
    case 'red':
      nodeAttributes.red = true;
      break;
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
    // case 'BR':
    //   return '\n';
    case 'BLOCKQUOTE':
      return jsx('element', { type: 'block-quote' }, children);
    case 'H1':
      return jsx('element', { type: 'heading-one' }, children);
    case 'H2':
      return jsx('element', { type: 'heading-two' }, children);
    case 'LI':
      return jsx('element', { type: 'heading-two' }, children);
    case 'P':
      return jsx('element', { type: 'paragraph' }, children);
    case 'A':
      return jsx(
        'element',
        { type: 'link', url: el.getAttribute('href') },
        children
      );
    // Customized
    case 'BR':
      return jsx('element', { type: 'empty' }, children);
    default:
      return children;
  }
};
