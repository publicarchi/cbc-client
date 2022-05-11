export interface IDeliberation {
	id: string
	meetingId: string
	affairId?: string
	title?: string
	altTitle?: string
	localisation?: {
		adress: string
		commune: string
		communeAncien: string
		departement: string
		departementDecimal: string
		departementAncien: string
		region: string
	}
	types?: string[]
	categories?: string[]
	report?: string
	recommandation?: string
	advice?: string
	meta: IMeta[]
}

export interface IAffaire {
	id: string
	title: string
	localisation: {
		commune: string
		departementDecimal: number
		departement: string
		departementAncien: string
		region: string
	};
	types: string[]
	deliberations: IDeliberation[]
	meta: IMeta[]
}

interface IMeta {
	who: string
	type: 'creation' | 'modification';
	when: string;
}
