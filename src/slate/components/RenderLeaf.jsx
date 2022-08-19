import styled from 'styled-components';

const Blue = styled.span`
  color: blue;
`;
const Red = styled.span`
  color: red;
`;

const Green = styled.span`
  color: green;
`;

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  // Customized
  if (leaf.custom) {
    children = <Green>{children}</Green>;
  }
  if (leaf.blue) {
    children = <Blue>{children}</Blue>;
  }
  if (leaf.red) {
    children = <Red>{children}</Red>;
  }
  return <span {...attributes}>{children}</span>;
};
