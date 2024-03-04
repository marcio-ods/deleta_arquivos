import { appLog } from '@/src/helpers/AppLog.ts';
import { exists } from 'exists';
import { config } from './AppState.ts';

export const fullPath = async (dir: string) => {
	try {
		if (await exists(dir)) return dir;
		throw new Error(`diretório não existe ou inacessível: ${dir}`);
	} catch (error) {
		console.log(error.message);
		await appLog().exit({ msg: error.message, st: "Erro" });
		return "";
	}
}


/**
 * Tenho medo desse povo que diz conversar com Deus, mas obedece a voz do diabo
 */
export const listRootFiles = async (): Promise<string[] | string> => {
	const usersDir = config.get().usersPath
	const logsDir = config.get().filesPath
	const fullDir = config.get().fullPath

	if (fullDir) return await fullPath(fullDir) as string

	const users: string[] = [];
	try {
		if (!await exists(usersDir))
			throw new Error(`diretório não existe ou inacessível: ${usersDir}`);

		for await (const dirEntry of Deno.readDir(usersDir)) {
			if (dirEntry.isDirectory) {
				const dirFile = `${usersDir}\\${dirEntry.name}\\${logsDir}`
				if (await exists(dirFile))
					users.push(dirFile);
				else
					appLog().set(`diretório não encontrado ${dirFile}`, 'Erro')
			}
		}

		const length = users.length;
		appLog().set(length + ' usuários encontrados ');
		config.set({ numberOfDir: length });
		return users;
	} catch (error) {
		console.log(error.message);
		await appLog().exit(error.message);
		return [];
	}
};
