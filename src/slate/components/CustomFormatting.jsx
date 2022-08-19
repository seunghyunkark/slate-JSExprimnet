import styled from 'styled-components';

const Blue = styled.span`
  color: blue;
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
  if (leaf.custom) {
    children = <strong>{children}</strong>;
  }
  if (leaf.color) {
    children = <Blue>{children}</Blue>;
  }
  return <span {...attributes}>{children}</span>;
};
