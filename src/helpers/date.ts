export const addDays = (v: number, current = Date.now()): number => {
	const nextDate = new Date(current);
	nextDate.setDate(nextDate.getDate() + v);
	return nextDate.getTime();
};

export const subtractDay = (v: number, current = Date.now()): number => {
	const nextDate = new Date(current);
	nextDate.setDate(nextDate.getDate() - v);
	return nextDate.getTime();
};

