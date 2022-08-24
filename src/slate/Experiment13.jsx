import { useState, useCallback, useEffect } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import styles from "../../styles/Wyswyg.module.css";
import { CustomEditor } from "./utils/CustomEditor";
import axios from "axios";
import { deserialize, serializeHTML, serializePlain } from "./utils/serialize";
import { Element } from "./components/RenderElement";
import { Leaf } from "./components/RenderLeaf";
import { LeafButton, ElementButton } from "./components/Button";

function Experiment13() {
	const [editor] = useState(() => withReact(createEditor()));
	const [text, setText] = useState("");
	const [nodeData, setNodeData] = useState("");
	const initialValue = [
		{
			type: "sentence",
			children: [{ text: "" }],
		},
	];
	const htmlStringToValue = (str) => {
		//HTML str -> HTML node
		let parser = new DOMParser();
		let doc = parser.parseFromString(str, "text/html");
		//HTML node -> slate value
		return deserialize(doc.body);
	};
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

	const onChange = (value) => {
		//마우스 커서가 있는 곳의 데이터만 보내도록 함
		const selection = CustomEditor.isSelect(editor);
		const path = selection?.focus.path[0] || 0;
		const selectedNode = [value[path]];
		const htmlText = serializeHTML(selectedNode);
		//HTML str -> HTML node
		let parser = new DOMParser();
		let doc = parser.parseFromString(htmlText, "text/html");
		const sendingText = doc.body.children[0].innerHTML;
		setText(sendingText);
		//현재 slate 노드 데이터들 확인
		setNodeData(JSON.stringify(value));
	};

	useEffect(() => {
		let parser = new DOMParser();
		let hi = parser.parseFromString(
			"<u>hi!</u><span>hihi!</span>",
			"text/html"
		);
		console.log(hi);
	}, []);

	return (
		<>
			<h2>Experiment 13 : Slate History</h2>
			<p> POST : http://pcanpi.iptime.org:9999/simple_token</p>
			<p>
				<li>
					Need :{" "}
					<a href="https://www.npmjs.com/package/slate-history">
						slate-history
					</a>
				</li>
				<li>이전에 클릭했던 객체를 기억할 수 있나?</li>
			</p>
			<Slate editor={editor} value={initialValue} onChange={onChange}>
				<Editable
					className={styles.editor}
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onKeyDown={(event) => {
						CustomEditor.createParagraph(event, editor);
					}}
				/>
				<div>
					<div>
						<li>Mark </li>
						<LeafButton editor={editor} format="bold" />
						<LeafButton editor={editor} format="code" />
						<LeafButton editor={editor} format="italic" />
						<LeafButton editor={editor} format="underline" />
						<LeafButton editor={editor} format="custom" />
						<LeafButton editor={editor} format="blue" />
						<LeafButton editor={editor} format="red" />
					</div>
					<div>
						<li>Block </li>
						<ElementButton editor={editor} format="block-quote" />
						<ElementButton editor={editor} format="heading-one" />
						<ElementButton editor={editor} format="heading-two" />
						<ElementButton editor={editor} format="list" />
						<ElementButton editor={editor} format="paragraph" />
						<ElementButton editor={editor} format="correct" />
						<ElementButton editor={editor} format="sentence" />
						<ElementButton editor={editor} format="empty" />
					</div>
					<button
						onClick={() => {
							axios
								.post("http://pcanpi.iptime.org:9999/simple_token", {
									text: text,
								})
								.then((res) => {
									//응답 데이터
									console.log("response : ", res.data);
									//node 세팅. 받은 데이터를 correct 등 다른 type으로 지정할 수 있음
									const insertData = { type: "sentence", children: [] };
									const resData = res.data.join(" ");
									const node = htmlStringToValue(resData);
									console.log(node);
									node.forEach((item) => insertData.children.push(item));
									const selection = CustomEditor.isSelect(editor);
									const path = selection?.focus.path[0] || 0;
									// changeNode가 제대로 먹히나 default로 path가 어디인지 알아야할듯
									// 이전에 클릭했던 곳을 기억할 수 있나?
									CustomEditor.changeNode(editor, insertData, path);
								})
								.catch((err) => console.log(err));
						}}
					>
						POST
					</button>
					<strong> Send : </strong> {text}
				</div>
			</Slate>

			<table className={styles.table}>
				<thead>
					<tr>
						<th>Show text data</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{nodeData}</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default Experiment13;
