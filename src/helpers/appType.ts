export type CONFIG_ARGS = {
	//userName: string;//all todos usuários  ?
	usersPath: string;//c\\users
	filesPath: string;//""
	fullPath: string;//""
	days: string;
	sleep: string;
	date?: string; //use in test
};

export type CONFIG = {
	//userName: string;
	usersPath: string;
	filesPath: string;
	fullPath: string;
	days: number;
	sleep: number;
	numberOfDir: number;
	numberOfDeletedFiles: number;
	appTest?: boolean;
};
