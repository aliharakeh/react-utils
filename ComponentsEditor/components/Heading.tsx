import {useEffect, useState} from 'react';
import RippleEffect from '../../ui/RippleEffect/RippleEffect';

type Props = {
	controls?: JSX.Element | JSX.Element[];
	updateParentData: (data: any) => void;
	level: number;
	text: string;
	color: string;
};

function Heading(props: Props) {
	const [text, setText] = useState(props.text);
	const [level, setLevel] = useState(props.level);
	const color = props.color || 'white';

	useEffect(() => {
		if (props.updateParentData) {
			props.updateParentData({ text, level });
		}
	}, [text, level]);

	function handleLevelChange(operation: 'asc' | 'desc') {
		if (operation === 'asc' && level - 1 >= 1) {
			setLevel(l => l - 1);
		}
		else if (operation === 'desc' && level + 1 <= 6) {
			setLevel(l => l + 1);
		}
	}

	let headerLevel;
	switch (level) {
		case 1:
			headerLevel = 'text-7xl';
			break;
		case 2:
			headerLevel = 'text-6xl';
			break;
		case 3:
			headerLevel = 'text-5xl';
			break;
		case 4:
			headerLevel = 'text-4xl';
			break;
		case 5:
			headerLevel = 'text-3xl';
			break;
		case 6:
			headerLevel = 'text-2xl';
			break;
		default:
			headerLevel = 'text-5xl';
			break;
	}

	return (
		<div className="relative flex-grow">
			{props.controls}
			<div className="flex items-end">
				<input
					className={`flex-grow bg-transparent outline-none font-bold ${headerLevel} text-${color}`}
					defaultValue={text}
					onChange={e => setText(e.target.value)}
				/>
				<div className="flex flex-col items-center">
					<RippleEffect onClick={() => handleLevelChange('asc')}>
						<button className="rotate-180 w-4 h-4 rounded-full">v</button>
					</RippleEffect>
					<div>{level}</div>
					<RippleEffect onClick={() => handleLevelChange('desc')}>
						<button className="w-4 h-4 rounded-full">v</button>
					</RippleEffect>
				</div>
			</div>

			<hr className="mt-4 bg-white h-1 rounded-full"/>
		</div>
	);
}

export default Heading;
