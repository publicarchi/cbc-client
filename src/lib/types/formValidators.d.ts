export interface ValidatorResult {
	[validatorName: string]: {
		error: boolean;
		message?: string;
	};
}

export type ValidatorFn = (value: string | number) => ValidatorResult;

function required(value: string | number): ValidatorResult {
	if (value === '' || value == null) {
		return { required: { error: true, message: 'Field is required' } };
	}
	return { required: { error: false } };
}

export const Validators = {
	required
};
