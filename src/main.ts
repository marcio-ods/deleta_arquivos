import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from './helpers/AppState.ts';
import { listUserDir } from '@/src/helpers/listUserDir.ts';
import { appLog } from '@/src/helpers/AppLog.ts';
import { deleteFiles } from './helpers/deleteFile.ts';
import { listFiles } from './helpers/listAndDeleteFiles.ts';
import { exists } from 'exists';
import { getFlags } from '@/src/helpers/getFlags.ts';
import { sleep } from '@/src/helpers/sleep.ts';
import { validPath } from '@/src/helpers/validPath.ts';

const main = async () => {
	await initSetup(getFlags());
	await sleep(config.get().sleep);
	await validPath()
	// console.log(config.get());

	// throw new Error("Falta altear o nome do log pra cada usuario")

	try {
		const users = await listUserDir();

		for await (const u of users) {
			const dir =
				`${config.get().usersPath}\\${u}\\${config.get().filesPath}`;
			if (await exists(dir)) {
				// console.log(dir);
				const listLogs = await listFiles(dir);
				// console.log(listLogs);
				await deleteFiles(dir, listLogs, u);
			}
		}
	} catch (error) {
		console.log(error.message);
		appLog().set(
			`total: usuários: ${config.get().numberOfDir} | Arquivos deletados: ${config.get().numberOfDeletedFiles}`,
		);
		await appLog().exit(error.message);
	}

	await appLog().exit(
		`total: usuários: ${config.get().numberOfDir} | Arquivos deletados: ${config.get().numberOfDeletedFiles}`,
	);
};

main();
