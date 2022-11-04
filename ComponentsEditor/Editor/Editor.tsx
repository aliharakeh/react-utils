import {Key, useEffect, useRef, useState} from 'react';
import {ContainerAxisType, EditorContainerType, EditorType} from './models';
import EditorContainer from './EditorContainer';
import EditorControls from './EditorControls';
import EditModeContextProvider from './context/EditModeContextProvider';

type Props = {
	// require key prop to tell react to update state when the props change
	// use crypto.randomUUID() or any random number/string generator
	key: Key;
	editor: EditorType;
	onUpdate: (editorData: EditorType) => void;
	onReset: () => void;
	onSave: () => void;
}

function Editor(props: Props) {
	const [children, setChildren] = useState<EditorType>(props.editor);
	const dataRef = useRef<EditorType>(props.editor);

	useEffect(() => {
		dataRef.current = children;
		props.onUpdate(children);
	}, [children]);

	function updateData(index: number, children: any) {
		if (dataRef.current[index]) {
			dataRef.current[index].children = children;
		}
	}

	function addContainer() {
		const container: EditorContainerType = {
			id: crypto.randomUUID(),
			type: ContainerAxisType.HORIZONTAL,
			children: []
		};
		setChildren(children => children.concat(container));
	}

	function removeContainer(id: string) {
		setChildren(children => children.filter(c => c.id !== id));
	}

	return (
		<EditModeContextProvider>
			<div className="relative">
				<EditorControls
					onContainerAdd={addContainer}
					onReset={props.onReset}
					onSave={props.onSave}
				/>
				<div className="pt-14 flex flex-col gap-y-10">
					{
						children.map((container, i) => (
							<EditorContainer
								key={container.id}
								container={container}
								updateParentData={(children) => updateData(i, children)}
								onRemove={() => removeContainer(container.id)}
							/>
						))
					}
				</div>
			</div>
		</EditModeContextProvider>
	);
}

export default Editor;
