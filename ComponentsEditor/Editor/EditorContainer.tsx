import {ContainerAxisType, ContainerChildrenType, EditorComponentType, EditorContainerType} from './models';
import {useEffect, useRef, useState} from 'react';
import EditorComponent from './EditorComponent';
import EditorControls from './EditorControls';
import EditorComponentsDialog from './EditorComponentsDialog';

type Props = {
	container: EditorContainerType;
	onRemove: () => void;
	updateParentData: (childOrChildren: ContainerChildrenType) => void;
};

function getContainerCss(type) {
	let css = 'relative min-h-[50px] pr-8 flex gap-8 ';
	if (type === ContainerAxisType.HORIZONTAL) {
		css += 'flex-row flex-wrap';
	}
	else {
		css += 'flex-col';
	}
	return css;
}

function EditorContainer(props: Props) {
	const [children, setChildren] = useState<ContainerChildrenType>(props.container.children);
	const dataRef = useRef<ContainerChildrenType>(props.container.children);
	const [isModalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		dataRef.current = children;
		props.updateParentData(children);
	}, [children]);

	function updateData(index: number, childOrChildren: any) {
		if (dataRef.current[index]) {
			Array.isArray(childOrChildren) ?
				(dataRef.current[index] as EditorContainerType).children = childOrChildren :
				(dataRef.current[index] as EditorComponentType).props = childOrChildren;
		}
	}

	function addChild() {
		setModalOpen(true);
	}

	function onDialogClose(child: any) {
		setChildren(children => children.concat(child));
	}

	function removeChild(id: string) {
		setChildren(children => children.filter(c => c.id !== id));
	}

	return (
		<div className={getContainerCss(props.container.type)}>
			<EditorControls onComponentAdd={addChild} onChildRemove={props.onRemove}/>
			{
				children.map((child, i) => 'children' in child ?
					<EditorContainer
						key={child.id}
						container={child}
						updateParentData={(children) => updateData(i, children)}
						onRemove={() => removeChild(child.id)}
					/> :
					<EditorComponent
						key={child.id}
						component={child}
						updateParentData={(child) => updateData(i, child)}
						onRemove={() => removeChild(child.id)}
					/>
				)
			}
			{(
				isModalOpen &&
                <EditorComponentsDialog
                  setIsOpen={setModalOpen}
                  onClose={e => onDialogClose(e)}
                />
			)}
		</div>
	);
}

export default EditorContainer;
