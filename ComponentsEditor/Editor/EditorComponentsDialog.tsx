import {useState} from 'react';
import {COMPONENTS, generateComponent, getChild} from './ComponentsDict';

type Props = {
	setIsOpen: any;
	onClose: any;
};

function EditorComponentsDialog(props: Props) {
	const [component, setComponent] = useState<any>(getChild(COMPONENTS[0]));

	function handleAdd() {
		props.onClose(component);
		props.setIsOpen(false);
	}

	function handleSelectChange(e) {
		const component = COMPONENTS.find(c => c.name === e.target.value);
		setComponent(getChild(component));
	}

	return (
		<dialog open={true} >

			<div className="flex flex-col gap-y-4 relative">

				<select defaultValue={component.name} onChange={handleSelectChange}>
					{COMPONENTS.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
				</select>

				<div className="px-2">
					<div className="p-4 bg-dark border-4 border-dashed">
						{generateComponent(component)}
					</div>
				</div>

				<div className="flex items-center justify-end">
					<button
						className="px-4 py-2 text-white bg-red-500 rounded-full mx-2"
						onClick={() => props.setIsOpen(false)}
					>close
					</button>
					<button
						className="px-4 py-2 text-white bg-indigo-500 rounded-full mx-2"
						onClick={handleAdd}
					>Add
					</button>
				</div>

			</div>

		</dialog>
	);
}

export default EditorComponentsDialog;
