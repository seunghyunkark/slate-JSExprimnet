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
const Experiment1 = dynamic(() => import('../src/slate/Experiment1'), {
  ssr: false,
});

const Experiment2 = dynamic(() => import('../src/slate/Experiment2'), {
  ssr: false,
});

const Experiment3 = dynamic(() => import('../src/slate/Experiment3'), {
  ssr: false,
});

const Experiment4 = dynamic(() => import('../src/slate/Experiment4'), {
  ssr: false,
});

export default function SlateTest() {
  return (
    <>
      <h1>🏏 Using Slate</h1>
      <Experiment4 />
      <Experiment3 />
      <Experiment2 />
      <Experiment1 />
      <ExecutingCommand />
      <CustomFormatting />
      <CustomElement />
      <AddingEventHandler />
      <Slate />
    </>
  );
}
