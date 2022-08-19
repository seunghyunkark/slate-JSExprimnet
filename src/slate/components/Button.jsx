import { CustomEditor } from '../utils/CustomEditor';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  border-radius: 2px;
  background-color: salmon;
  color: white;
`;

export const LeafButton = ({ editor, format }) => {
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
    >
      {format}
    </Button>
  );
};

export const ElementButton = ({ editor, format }) => {
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleBlock(editor, format);
      }}
    >
      {format}
    </Button>
  );
};
