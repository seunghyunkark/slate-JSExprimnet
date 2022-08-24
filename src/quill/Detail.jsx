import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

const Value = styled.div`
  font-size: 16px;
  color: gray;
`;

const RestyledReactQuill = styled(ReactQuill)`
  .ql-container {
    height: 400px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const StyledButton = styled.button`
  padding: 8px 14px;
  background-color: orange;
  margin: 0 4px 8px 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function QuillEditor() {
  const [value, setValue] = useState('');
  const [sendingFirstText, setSendingFirstText] = useState('');
  const textArray = [];
  const idxArray = [0];
  const [idx, setIdx] = useState(0);
  const [textId, setTextId] = useState(0);

  const handleFirstText = () => {
    axios
      .post('http://pcanpi.iptime.org:9999/simple_token', {
        text: sendingFirstText,
      })
      .then((res) => {
        const resData = res.data.join(' ');
        setValue(`<p>${resData}</p>`);
      });
  };
  // 몇 번째 문장을 보냈는 지 알 수 있을 경우 해당 인덱스 값을 보내기
  const handleSelectedText = () => {};

  const onChange = (content, delta, source, editor) => {
    setValue(editor.getHTML());

    let htmlText = value;
    //HTML str -> HTML node
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlText, 'text/html');
    //Extract first P text
    setSendingFirstText(doc.body.children[0]?.innerHTML);
    //Extract all P texts
    for (let i = 0; i < doc.body.children.length; i++) {
      textArray.push(doc.body.children[i]?.innerHTML);
    }
    for (let i = 0; i < textArray.length - 1; i++) {
      idxArray.push(idxArray[i] + textArray[i].length + 1);
    }
    console.log('textArray : ', textArray);
    console.log('idx Array: ', idxArray);
  };

  const onChangeSelection = (range, source, editor) => {
    let selectedNode = getSelection()?.focusNode?.nodeValue;
    setIdx(range.index);
    //range : 전체 문자의 index를 나타냄. length는 줄을 바꾸었든 아니든 0
    //source : user 라고 나옴
    //editor: getHTML, getLength, getText 등의 함수들 정의
  };

  const setMultiline = () => {
    setValue('<p>hi</p><p><br></p><p>1</p>');
  };

  return (
    <>
      <ButtonDiv>
        <StyledButton onClick={handleFirstText}>Send!</StyledButton>
        <StyledButton onClick={setMultiline}>Set!</StyledButton>
      </ButtonDiv>
      <p>
        <li>
          참고자료 :{' '}
          <a href='https://github.com/seunghyunkark/quill-test'>
            https://github.com/seunghyunkark/quill-test
          </a>
        </li>
        <li>
          응답으로 붙어오는 태그를 quill이 알아서 해석해 오버라이딩 할 수 있다.
          즉 html 덮어쓰기가 가능하다.
        </li>
        <li>
          u, b 등의 태그 설정이 적용될 경우 그 단위를 중심으로 노드가 끊어진다.
        </li>
        <li>
          onChangeSelection의 range 인자를 이용해 선택한 텍스트의 인덱스를 알 수
          있다.
        </li>
        <li>
          onChangeSelection에서 getSelection 메서드를 이용해 선택한 노드가
          무엇인지 알 수 있다. 그러나 u, b 태그 등이 적용된 경우는 노드가
          끊어지므로 원하는 특정 노드를 보내는 데에는 어려움이 있다.
        </li>
        <li>
          선택한 영역 앞 부분, 뒷부분을 구분하여 텍스트를 보내고 부분을
          overriding 할 수 있는지 알아봐야할 듯 하다. 이 경우 선택한 부분을 매번
          저장해 놓는 방식이 필요하다.
        </li>
      </p>
      <RestyledReactQuill
        theme='snow'
        value={value}
        onChange={onChange}
        onChangeSelection={onChangeSelection}
      />
      <Value>{value}</Value>
      <Value>{sendingFirstText}</Value>
      <Value>{idx}</Value>
      <Value>{textId}</Value>
    </>
  );
}
