import styled from 'styled-components';

const Orange = styled.p`
  color: orange;
`;

export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    case 'correct':
      return <Orange {...attributes}>{children}</Orange>;
    case 'sentence':
      return <span {...attributes}>{children}</span>;
    case 'empty':
      return <br />;
    default:
      return <span {...attributes}>{children}</span>;
  }
};
