import { deleteFile } from '@/src/helpers/deleteFile.ts';
import { appLog } from '@/src/helpers/AppLog.ts';

export const listAndDeleteFiles = async (listRoot: string[]) => {
	let count = 0
	try {
		for await (const root of listRoot)
			for await (const dirEntry of Deno.readDir(root)) {
				if (dirEntry.isFile) {
					const filename = `${root}\\${dirEntry.name}`
					await deleteFile(filename)
					++count
				}
			}
		return count;
	} catch (error) {
		console.log(error.message);
		appLog().set("listAndDeleteFiles: " + error.message, "Erro")
		return count;
	}
};
