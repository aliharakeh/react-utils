import Editor from './Editor/Editor';
import {ContainerAxisType, EditorType} from './Editor/models';
import {useRef, useState} from 'react';


function generateEditor() {
	return [
		{
			id: crypto.randomUUID(),
			type: ContainerAxisType.HORIZONTAL,
			children: [
				{
					id: crypto.randomUUID(),
					name: 'CharacterCard',
					props: {
						name: 'first',
						tags: [],
						gender: 'M'
					}
				}
			]
		},
		{
			id: crypto.randomUUID(),
			type: ContainerAxisType.HORIZONTAL,
			children: [
				{
					id: crypto.randomUUID(),
					name: 'CharacterCard',
					props: {
						name: 'first',
						tags: [],
						gender: 'M'
					}
				}
			]
		}
	];
}

function ComponentsEditor() {
	const [editor, setEditor] = useState<EditorType>(generateEditor());
	const editorDataRef = useRef<EditorType>(generateEditor());

	function handleReset() {
		setEditor(generateEditor());
		editorDataRef.current = generateEditor();
	}

	function handleSave() {
		console.log(editorDataRef.current);
	}

	function updateData(editorData: EditorType) {
		editorDataRef.current = editorData;
	}

	return (
		<div className="">
			<div className="">
				<Editor
					key={crypto.randomUUID()}
					editor={editor}
					onUpdate={updateData}
					onReset={handleReset}
					onSave={handleSave}
				/>
			</div>
		</div>
	);
}

export default ComponentsEditor;
