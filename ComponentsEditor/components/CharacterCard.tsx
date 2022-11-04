import {useEffect, useRef, useState} from 'react';

type Props = {
	controls?: JSX.Element | JSX.Element[];
	updateParentData: (data: any) => void;
	name: string;
	tags: string[];
	gender: 'M' | 'F';
}

function CharacterCard(props: Props) {
	const [name, setName] = useState(props.name || '');
	const [tags, setTags] = useState(props.tags || []);
	const [gender, setGender] = useState(props.gender || 'M');
	const tagInput = useRef<HTMLDivElement>(null);

	const genderCSS = gender === 'M' ? 'bg-blue-600' : 'bg-pink-600';

	useEffect(() => {
		if (props.updateParentData) {
			props.updateParentData({ name, tags, gender });
		}
	}, [name, tags, gender]);


	function handleNewTag(e) {
		if (e.key === 'Enter') {
			if (e.target.textContent) {
				setTags(tags => tags.concat(e.target.textContent));
			}
			setTimeout(() => (tagInput.current!.innerHTML = ''), 0);
		}
	}

	function handleNameEdit(e) {
		setName(e.target.value);
	}

	function handleGenderChange() {
		setGender(g => g === 'M' ? 'F' : 'M');
	}

	return (
		<div className="relative flex flex-col shadow rounded-lg p-4 bg-white w-[300px]">
			{props.controls}
			<div className="flex gap-x-2 items-center text-gray-800 font-bold text-xl">
				<button className={`py-1 rounded-lg text-white w-9 ${genderCSS}`} onClick={handleGenderChange}>
					{gender}
				</button>
				<div className="flex-grow">
					<input className="w-full outline-none" defaultValue={name} onChange={handleNameEdit}/>
				</div>
			</div>
			<div className="h-1 rounded-full bg-indigo-500 mt-2 mb-3"></div>
			<div className="flex flex-row flex-wrap items-center gap-y-2" onClick={e => tagInput.current!.focus()}>
				{
					tags.map(tag => (
						<span
							key={tag}
							className="rounded-full px-3 py-1 bg-purple-600 mr-1 text-white font-semibold"
							onClick={e => e.stopPropagation()}
						>{tag}</span>
					))
				}
				<div
					ref={tagInput}
					className="outline-none text-black min-w-[1px]"
					contentEditable
					onKeyDown={handleNewTag}
				/>
			</div>
		</div>
	);
}

export default CharacterCard;
