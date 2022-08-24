import React, { useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

const Value = styled.div`
  font-size: 16px;
  color: gray;
`;

const ValueTitle = styled.span`
  color: lightgrey;
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
  const [textArr, setTextArr] = useState([]);
  const [idx, setIdx] = useState(0);
  const [textId, setTextId] = useState(0);

  const postSelectedText = () => {
    axios
      .post('http://pcanpi.iptime.org:9999/simple_token', {
        text: textArr[textId],
      })
      .then((res) => {
        const resData = res.data.join(' ');
        textArr[textId] = resData;
        const newTextArr = textArr.map((item) => `<p>${item}</p>`);
        setValue(newTextArr.join(''));
      });
  };

  const onChange = (content, delta, source, editor) => {
    setValue(editor.getHTML());
  };

  const onChangeSelection = (range, source, editor) => {
    let htmlText = value;
    //HTML str -> HTML node
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlText, 'text/html');
    //Extract all P texts
    const textArray = [];
    for (let i = 0; i < doc.body.children.length; i++) {
      textArray.push(doc.body.children[i]?.innerHTML);
    }
    const idxArray = [0];
    for (let i = 0; i < textArray.length - 1; i++) {
      idxArray.push(idxArray[i] + textArray[i].length + 1);
    }
    setTextArr(textArray);
    //let selectedNode = getSelection()?.focusNode?.nodeValue;
    let pointId = idxArray.findIndex((item) => item > range?.index);
    setIdx(range?.index);
    if (pointId === -1) {
      setTextId(idxArray.length - 1);
    } else {
      setTextId(pointId - 1);
    }
  };

  const setMultiline = () => {
    setValue('<p>hi</p><p><br></p><p>1</p>');
  };

  return (
    <>
      <ButtonDiv>
        <StyledButton onClick={postSelectedText}>Send!</StyledButton>
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
      <Value>
        <ValueTitle>HTML text : </ValueTitle>
        {value}
      </Value>
      <Value>
        <ValueTitle>Range Index : </ValueTitle>
        {idx}
      </Value>
      <Value>
        <ValueTitle>Selected Text : </ValueTitle>
        {textArr[textId]}
      </Value>
      <Value>
        <ValueTitle>Selected Text Index : </ValueTitle>
        {textId}
      </Value>
    </>
  );
}
