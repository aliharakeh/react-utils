import {createContext, Dispatch, SetStateAction, useState} from 'react';

export type EditContextType = {
	editMode: boolean;
	setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const EditModeContext = createContext<EditContextType>({
	editMode: true,
	setEditMode: () => {}
});

function EditModeContextProvider({ children }) {
	const [editMode, setEditMode] = useState(true);

	return (
		<EditModeContext.Provider value={{ editMode, setEditMode }}>
			{children}
		</EditModeContext.Provider>
	);
}

export default EditModeContextProvider;
