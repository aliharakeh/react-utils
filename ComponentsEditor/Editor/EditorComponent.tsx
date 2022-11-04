import {EditorComponentType} from './models';
import EditorControls from './EditorControls';
import {generateComponent} from './ComponentsDict';

type Props = {
	component: EditorComponentType;
	onRemove: () => void;
	updateParentData: (data: any) => void;
};


function EditorComponent(props: Props) {
	return generateComponent(
		props.component,
		props.updateParentData,
		<EditorControls onChildRemove={props.onRemove}/>
	);
}

export default EditorComponent;
