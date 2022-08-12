import dynamic from 'next/dynamic';
import styles from '../styles/Wyswyg.module.css';
import styled from 'styled-components';

const Quill = dynamic(() => import('../src/QuillPage'), {
  ssr: false,
});
const CKEditor = dynamic(() => import('../src/CKEditorPage'), {
  ssr: false,
});
const Draftjs = dynamic(() => import('../src/DraftjsPage'), {
  ssr: false,
});
const Slate = dynamic(() => import('../src/SlatePage'), {
  ssr: false,
});
const TinyMCE = dynamic(() => import('../src/TinyMCEPage'), {
  ssr: false,
});

const Line = styled.div`
  margin-top: 50px;
  height: 1px;
  background-color: black;
`;

export default function Wyswig() {
  return (
    <>
      <h3>👀 See Wysiwyg Editors Below</h3>
      <Slate />
      <Quill />
      <CKEditor />
      <Draftjs />
      <TinyMCE />
      <Line />
      <h3>✨ Refrences</h3>
      <ul className={styles.list}>
        <li>
          <a href='https://www.kindacode.com/article/popular-open-source-wysiwyg-editors-for-react/'>
            5 best open-source WYSIWYG editors for React (2022)
          </a>
        </li>
        <li>
          <a href='https://blog.dalgu.app/dev/2'>
            기술 블로그 위한 contentEditable WYSIWYG 에디터 제작기
          </a>
        </li>
      </ul>
    </>
  );
}
