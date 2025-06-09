export interface File {
	title: string;
	idno: URL;
	id: string;
}

export interface Deliberation {
	meetingId: string;
	caseId: string;
	seance: Date | '';
	cote: string;
	title: string;
	altTitle: string;
	item: number;
	localisation: {
		commune: string;
		communeAncien: string;
		address: string;
		departementDecimal: string;
		departement: string;
		region: string;
	};
	buildingTypes: string[];
	projectGenres: string[];
	administrativeObjects: string[];
	report: string;
	recommandation: string;
	advice: string;
}

export interface Meeting {
	id: string;
	title: string;
	date: Date | '';
	cote: string;
	coteDev: string;
	pages: {
		label: 'pp.';
		pages: number;
	};
	projectTypes: string[];
	projectGenres: string[];
	deliberations: Deliberation[];
}

export interface Building {
	id: string;
	idno: URL;
	constructionDate: Date;
	designation: {
		title: '';
		type: '';
	};
	localisation: {
		commune: string;
		departement: string;
		communeAncien: string;
		adress: string;
		region: string;
	};
	images: URL[];
	buildingHistory: null;
	affectationHistory: null;
	patrimonial: {
		status: 'threatened' | 'protected' | 'unknown';
		reference: string;
		comment: string;
	};
}

export interface CbcMeta {
	title?: string;
	idno?: string;
	start?: number;
	count?: number;
	quantity?: number;
}
export interface CbcResponse {
	meta: CbcMeta;
	content: File[] | Deliberation[] | Meeting[] | string[];
}
