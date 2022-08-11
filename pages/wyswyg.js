import dynamic from 'next/dynamic';

const CKEditor = dynamic(() => import('../src/CKEditorPage'), {
  ssr: false,
});
const QuillEditor = dynamic(() => import('../src/QuillEditorPage'), {
  ssr: false,
});

export default function Wyswig() {
  return (
    <>
      <h3>See Wysiwyg Editors Below</h3>
      <CKEditor />
      <QuillEditor />
    </>
  );
}
