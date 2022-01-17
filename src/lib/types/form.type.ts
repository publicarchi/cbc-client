import type { ValidatorFn, ValidatorResult } from './formValidators.type';

type errors = { validatorName: ValidatorResult };

export type formType = {
	[inputName: string]: {
		validators: [ValidatorFn] | [];
		type: string;
		validity: {
			typeMismatch: string;
			valueMissing: string;
			patternMismatch: string;
		};
		errors: errors[] | [];
		editable: boolean;
		required: boolean;
	};
};
