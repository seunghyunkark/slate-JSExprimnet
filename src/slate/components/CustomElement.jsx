import styled from 'styled-components';
const Strike = styled.span`
  text-decoration: line-through;
`;

export const Element = ({ attribute, children, element }) => {
  switch (element.type) {
    case 'change':
      return <ChangeLine {...attribute}>{children}</ChangeLine>;
    default:
      return <DefaultElement {...attribute}>{children}</DefaultElement>;
  }
};

const ChangeLine = (props) => {
  return (
    <p>
      <Strike>{props.children}</Strike>
    </p>
  );
};

const DefaultElement = (props) => {
  return <p>{props.children}</p>;
};
