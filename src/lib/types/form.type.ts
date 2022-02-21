export type formType = {
	[inputName: string]: {
		type: string;
		pattern: string;
		disabled: boolean;
		required: boolean;
		validityMessage: string;
	};
};
