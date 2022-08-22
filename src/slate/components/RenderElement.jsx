import styled from 'styled-components';

const Orange = styled.span`
  color: orange;
`;

const Strike = styled.span`
  text-decoration: line-through;
`;

export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    // case 'link':
    //   return (
    //     <a {...attributes} href={element.url}>
    //       {children}
    //     </a>
    //   );
    case 'list':
      return <li {...attributes}>{children}</li>;
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    // Customized
    case 'correct':
      return <Orange {...attributes}>{children}</Orange>;
    case 'change':
      return (
        <p>
          <Strike {...attributes}>{children}</Strike>
        </p>
      );
    case 'response':
      return <u {...attributes}>{children}</u>;
    case 'sentence':
      return <span {...attributes}>{children}</span>;
    case 'word':
      return <span {...attributes}>{children}</span>;
    case 'empty':
      return <br />;
    default:
      return <span {...attributes}>{children}</span>;
  }
};
