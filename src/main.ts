import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from "@/src/helpers/AppState.ts";
import { appLog } from '@/src/helpers/AppLog.ts';
import { getFlags } from '@/src/helpers/getFlags.ts';
import { sleep } from '@/src/helpers/sleep.ts';
import { validPath } from '@/src/helpers/validPath.ts';
import { listRootFiles } from '@/src/helpers/listRootFiles.ts';
import { listAndDeleteFiles } from '@/src/helpers/listAndDeleteFiles.ts';
// deno task start --users-path=C:\\dev\\deleta_arquivos\\fake_user  --files-path=logs   --sleep=s-0 --days=5 

// deno task start --users-path=C:\dev\deleta_arquivos  --files-path=fake_user  --full-path=C:\\dev\\deleta_arquivos\\fake_user  --sleep=s-0 --days=5 

// {
// fullPath: "C:\\dev\\deleta_arquivos\\fake_user\\us1\\logs" 
// 	userDir: "C:\\dev\\deleta_arquivos\\fake_user",
// 	filesDir: "\\logs",
// 	users: [ "us1", "us2", "us3", "dir_tests" ]
//   }


// deno task start --users-path=C:\\dev\\deleta_arquivos\\fake_user  --files-path=logs   --sleep=s-1 --days=-1
const main = async () => {
	await initSetup(getFlags());
	appLog().set(`atraso ${config.get().sleep}`)
	await sleep(config.get().sleep);
	appLog().set(`inicio`)
	console.log(config.get());
	await validPath()

	// throw new Error("Falta altear o nome do log pra cada usuario")

	try {
		let users = await listRootFiles();
		users = Array.isArray(users) ? users : [users]

		console.log(users);
		await listAndDeleteFiles(users)

	} catch (error) {
		console.log(error.message);
		appLog().set(
			`total: usuários: ${config.get().numberOfDir} | Arquivos deletados: ${config.get().numberOfDeletedFiles}`,
		);
		await appLog().exit({ msg: error.message, st: "Erro" });
	}

	await appLog().exit({
		msg: `total: usuários: ${config.get().numberOfDir} | Arquivos deletados: ${config.get().numberOfDeletedFiles}`
	});
};

main();
