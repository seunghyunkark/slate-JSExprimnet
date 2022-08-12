import dynamic from 'next/dynamic';
import styles from '../styles/Wyswyg.module.css';
import styled from 'styled-components';

const Slate = dynamic(() => import('../src/editors/SlatePage'), {
  ssr: false,
});
const ColorChange = dynamic(() => import('../src/slate/ColorChange'), {
  ssr: false,
});
export default function SlateTest() {
  return (
    <>
      <h1>🏏 Using Slate</h1>
      <ColorChange />
      <Slate />
    </>
  );
}
