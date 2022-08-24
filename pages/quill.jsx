import dynamic from 'next/dynamic';

const Quill = dynamic(() => import('../src/editors/QuillPage'), {
  ssr: false,
});

const QuillDetail = dynamic(() => import('../src/quill/Detail'), {
  ssr: false,
});

export default function QuillTest() {
  return (
    <>
      <h1>🧶 Using Quill</h1>
      <QuillDetail />
      <Quill />
    </>
  );
}
