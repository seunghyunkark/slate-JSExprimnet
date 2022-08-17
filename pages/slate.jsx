import dynamic from 'next/dynamic';

const Slate = dynamic(() => import('../src/editors/SlatePage'), {
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
const CustomFormatting = dynamic(
  () => import('../src/slate/CustomFormatting'),
  {
    ssr: false,
  }
);
const ExecutingCommand = dynamic(
  () => import('../src/slate/ExecutingCommand'),
  {
    ssr: false,
  }
);
const Experiment = dynamic(() => import('../src/slate/Experiment'), {
  ssr: false,
});
const HTMLContent = dynamic(() => import('../src/slate/HTMLContent'), {
  ssr: false,
});

export default function SlateTest() {
  return (
    <>
      <h1>🏏 Using Slate</h1>
      {/* <HTMLContent /> */}
      <Experiment />
      <ExecutingCommand />
      <CustomFormatting />
      <CustomElement />
      <AddingEventHandler />
      <Slate />
    </>
  );
}
