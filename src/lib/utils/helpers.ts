export const uid = (prefix: string) => {
	return prefix + crypto.randomUUID().substring(0, 5);
};
