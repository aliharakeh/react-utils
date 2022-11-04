import CharacterCard from '../components/CharacterCard';
import Heading from '../components/Heading';
import {ContainerAxisType} from './models';

export const COMPONENTS = [
	{ name: 'HorizonTalContainer', type: ContainerAxisType.HORIZONTAL, children: [] },
	{ name: 'VerticalContainer', type: ContainerAxisType.VERTICAL, children: [] },
	{ name: 'CharacterCard', props: { name: 'Sample Text', tags: [], gender: 'M' } },
	{ name: 'Heading', props: { text: 'Sample Heading 1', level: 2 } },
];

export function generateComponent({ id, name, props }, updateParentData: any = null, controls = <></>) {
	switch (name) {
		case 'CharacterCard':
			return <CharacterCard controls={controls} updateParentData={updateParentData} {...props}/>;
		case 'Heading':
			return <Heading controls={controls} updateParentData={updateParentData} {...props} />;
		default:
			return <div className="text-white">NO PREVIEW</div>;
	}
}

export function getChild(component: any) {
	const id = crypto.randomUUID();
	return 'children' in component ?
		{ id, type: component.type, children: component.children } :
		{ id, name: component.name, props: component.props };
}


