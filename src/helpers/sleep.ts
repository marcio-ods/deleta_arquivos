export const sleep = async (milliseconds = 0) =>
	await new Promise((fnc_resolve) => setTimeout(fnc_resolve, milliseconds));
