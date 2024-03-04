import { listRootFiles } from '@/src/helpers/listRootFiles.ts';
import { assertEquals } from 'assert';
import { config } from '../helpers/AppState.ts';
import { CONFIG } from '@/src/helpers/appType.ts';
import { makeFakeDir } from '@/src/tests/helperTest.ts';
// import { validPath } from '@/src/helpers/validPath.ts';

// const DATA: CONFIG = { days: "", fullPath: "", filesPath: "", sleep: "", userName: "c:\\Users", usersPath: "" }
const DATA: CONFIG = { days: 0, fullPath: "", filesPath: "", sleep: 0, usersPath: "c:\\Users", numberOfDeletedFiles: 0, numberOfDir: 0, appTest: true }

// const setConfig = (att: Partial<CONFIG_ARGS>) =>  config.set({ ...DATA, ...att }) 
const setConfig = (att: Partial<CONFIG>) => {
	config.set({ ...DATA, ...att })
	// validPath()
}

Deno.test('listRootFiles. test', async () => {
	const mk = await makeFakeDir();
	// {
	// 	userDir: "C:\\dev\\deleta_arquivos\\fake_user",
	// 	filesDir: "\\logs",
	// 	users: [ "us1", "us2", "us3", "dir_tests" ]
	//   }

	setConfig({ fullPath: "c:\\dev" })
	assertEquals(await listRootFiles(), "c:\\dev");

	setConfig({ fullPath: "kkk" })
	assertEquals(await listRootFiles(), "");

	// config.set({ fullPath: "", userName: mk.users[0], usersPath: mk.userDir })
	setConfig({ fullPath: "C:\\dev\\deleta_arquivos\\fake_user\\us1\\logs" })
	assertEquals(await listRootFiles(), "C:\\dev\\deleta_arquivos\\fake_user\\us1\\logs");

	config.set({ fullPath: "C:\\dev\\deleta_arquivos\\fake_user\\us3\\logs" })
	assertEquals(await listRootFiles(), `${mk.userDir}\\${mk.users[2]}\\${mk.filesDir}`);

	setConfig({ usersPath: "all", filesPath: mk.filesDir })
	assertEquals(await listRootFiles(), []);

	setConfig({ usersPath: mk.userDir, filesPath: mk.filesDir })
	assertEquals(await listRootFiles(), [
		"C:\\dev\\deleta_arquivos\\fake_user\\dir_tests\\logs",
		"C:\\dev\\deleta_arquivos\\fake_user\\us1\\logs",
		"C:\\dev\\deleta_arquivos\\fake_user\\us2\\logs",
		"C:\\dev\\deleta_arquivos\\fake_user\\us3\\logs",
	]);


});
