export type AffaireType = {
	head: string;
	id: string;
	localisation: {
		commune: string;
		departementDecimal: string;
		departement: string;
		departementAncien: string;
		region: string;
	};
	types: string;
	deliberations: string[];
	meta: Meta[];
};

export type MetaType = {
	user: {
		id: string;
		name: string;
		email: string;
	};
	action: 'creation' | 'modification';
	date: string;
};
