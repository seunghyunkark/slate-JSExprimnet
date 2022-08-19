import styled from 'styled-components';

export const ELEMENT_LIST = 'li' || 'correct';

const Orange = styled.p`
  color: orange;
`;

export const Element = ({ attribute, children, element }) => {
  switch (element.type) {
    case 'li':
      return <li {...attribute}>{children}</li>;
    case 'correct':
      return <Orange {...attribute}>{children}</Orange>;
    case 'sentence':
      return <span {...attribute}>{children}</span>;
    case 'empty':
      return <br />;
    case 'paragraph':
      return <p {...attribute}>{children}</p>;
    default:
      return <span {...attribute}>{children}</span>;
  }
};
