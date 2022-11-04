export type EditorComponentType = {
	id: string;
	name: string;
	props: any;
}

export type ContainerChildType = EditorContainerType | EditorComponentType;

export type ContainerChildrenType = ContainerChildType[];

export enum ContainerAxisType {
	HORIZONTAL,
	VERTICAL
}

export type EditorContainerType = {
	id: string;
	type: ContainerAxisType;
	children: ContainerChildrenType;
}

export type EditorType = EditorContainerType[];
