export const getDeliberationTitle = (deliberation: any) => {
	if (deliberation.title !== '' && deliberation.title !== null) return deliberation.title;
	else {
		let title = deliberation.types.join('/');
		title += ' de ' + deliberation.localisation.commune;
		return title;
	}
};
