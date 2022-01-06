type ValidatorResult = {
	error: boolean;
	validator: string;
	msg: string;
};

const formValidators = {
	id: validateId,
	title: validateTitle,
	date: validateDate,
	item: validateItem,
	pages: validateItem
};

function validateDate(value: string): ValidatorResult {
	if (new Date(value).toString() !== 'Invalid Date')
		return {
			error: true,
			validator: 'validateDate',
			msg: 'La date doit être au format jj/mm/aaaa'
		};
	else return { error: false, validator: 'validateDate', msg: 'ok' };
}

function validateTitle(value: string): ValidatorResult {
	return {
		error: false,
		validator: 'validateTitle',
		msg: 'ok'
	};
}

function validateItem(value: string): ValidatorResult {
	if (isNaN(value))
		return {
			error: true,
			validator: 'validateItem',
			msg: 'Ce champ doit comporter un nombre'
		};
	else if (parseInt(value) >= 0)
		return {
			error: true,
			validator: 'validateItem',
			msg: 'Ce champ doit comporter un nombre entier positif'
		};
	else return { error: false, validator: 'validateItem', msg: 'ok' };
}

function validateId(value: string): ValidatorResult {
	/* todo: ask basex server if id exists */

	if (value === '' || value === null)
		return {
			error: true,
			validator: 'validateId',
			msg: 'Ce champ est obligatoire'
		};
	else
		return {
			error: false,
			validator: 'validateId',
			msg: 'ok'
		};
}

function validateRequired(value: string): ValidatorResult {
	if (value === '' || value === null)
		return {
			error: true,
			validator: 'validateRequired',
			msg: 'Ce champ est obligatoire'
		};
	else return { error: false, validator: 'validateRequired', msg: 'ok' };
}

export function validateForm(formData: {
	id: string;
	title: string;
	date: string;
	item: string;
	pages: string;
}): ValidatorResult[] {
	return Object.keys(formData).map((key: string) => {
		return formValidators[key](formData[key]);
	});
}
