import {useContext} from 'react';
import {EditModeContext} from './context/EditModeContextProvider';
import {MdAdd, MdDelete, MdEdit, MdSave, MdUpdate} from 'react-icons/all';
import ButtonIcon from '../../ui/ButtonIcon';

type Props = {
	onContainerAdd?: () => void;
	onChildRemove?: () => void;
	onComponentAdd?: () => void;
	onReset?: () => void;
	onSave?: () => void;
};

function EditorControls(props: Props) {
	const { editMode, setEditMode } = useContext(EditModeContext);

	return (
		<div className="absolute -right-3 -top-6 flex flex-col gap-y-1">
			{(
				editMode && props.onChildRemove &&
                <ButtonIcon
                  className="rounded-full bg-red-500 text-white font-bold w-7 h-7 flex justify-center"
                  onClick={props.onChildRemove}
                >
                  <MdDelete className="text-white" size="1.5rem"/>
                </ButtonIcon>
			)}
			{(
				props.onContainerAdd &&
                <div className="flex gap-x-2">
                  <ButtonIcon
                    className="rounded-full bg-blue-600 text-white font-bold w-10 h-10 flex justify-center"
                    onClick={() => setEditMode(mode => !mode)}
                  >
                    <MdEdit className="text-white" size="1.5rem"/>
                  </ButtonIcon>
                  <ButtonIcon
                    className="rounded-full bg-purple-600 text-white font-bold w-10 h-10 flex justify-center"
                    onClick={props.onSave}
                  >
                    <MdSave className="text-white" size="1.5rem"/>
                  </ButtonIcon>
                  <ButtonIcon
                    className="rounded-full bg-red-500 text-white font-bold w-10 h-10 flex justify-center"
                    onClick={props.onReset}
                  >
                    <MdUpdate className="text-white" size="1.5rem"/>
                  </ButtonIcon>
					{(
						editMode &&
                        <ButtonIcon
                          className="rounded-full bg-green-500 text-white font-bold w-10 h-10 flex justify-center"
                          onClick={props.onContainerAdd}
                        >
                          <MdAdd className="text-white" size="1.5rem"/>
                        </ButtonIcon>
					)}
                </div>
			)}
			{(
				editMode && props.onComponentAdd &&
                <ButtonIcon
                  className="rounded-full bg-indigo-500 text-white font-bold w-7 h-7 flex justify-center"
                  onClick={props.onComponentAdd}
                >
                  <MdAdd className="text-white" size="1.5rem"/>
                </ButtonIcon>
			)}
		</div>
	);
}

export default EditorControls;
