import styled from 'styled-components';
import { createLanguageServiceSourceFile } from 'typescript';

const Blue = styled.span`
  color: blue;
`;

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.custom) {
    children = <strong>{children}</strong>;
  }
  if (leaf.color) {
    children = <Blue>{children}</Blue>;
  }
  return <span {...attributes}>{children}</span>;
};
