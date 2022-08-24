import { useState } from "react";
import axios from "axios";
import { Node, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import styles from "../../styles/Wyswyg.module.css";
import { CustomEditor } from "./utils/CustomEditor";
function Experiment1() {
	const [editor] = useState(() => withReact(createEditor()));
	const [text, setText] = useState("");
	const initialValue = [
		{
			type: "paragraph",
			children: [{ text: "Click the button ..." }],
		},
	];

	return (
		<>
			<h2>Experiment 1 : Insert Data</h2>
			<p> POST : http://pcanpi.iptime.org:9999/simple_color</p>
			<Slate
				editor={editor}
				value={initialValue}
				onChange={(value) => {
					const content = value.map((n) => Node.string(n)).join("\n");
					setText(content);
				}}
			>
				<Editable className={styles.editor} />
				<div>
					<button
						onClick={() => {
							editor.getFragment;
							axios
								.post("http://pcanpi.iptime.org:9999/simple_color", {
									text: text,
								})
								.then((res) => {
									console.log("responsive : ", res);
									console.log("first data : ", res.data[0]);
									CustomEditor.addText(editor, res.data);
								})
								.catch((err) => console.log(err));
						}}
					>
						POST
					</button>
					{text}
				</div>
			</Slate>
		</>
	);
}

export default Experiment1;
