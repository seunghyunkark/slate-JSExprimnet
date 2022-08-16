import dynamic from 'next/dynamic';

const Slate = dynamic(() => import('../src/editors/SlatePage'), {
  ssr: false,
});
const ColorChange = dynamic(() => import('../src/slate/ColorChange'), {
  ssr: false,
});
const AddingEventHandler = dynamic(
  () => import('../src/slate/AddingEventHandler'),
  {
    ssr: false,
  }
);
const CustomElement = dynamic(() => import('../src/slate/CustomElement'), {
  ssr: false,
});
const Experiments = dynamic(() => import('../src/slate/Experiments'), {
  ssr: false,
});

export default function SlateTest() {
  return (
    <>
      <h1>🏏 Using Slate</h1>
      <Experiments />
      <CustomElement />
      <AddingEventHandler />
      <ColorChange />
      <Slate />
    </>
  );
}
