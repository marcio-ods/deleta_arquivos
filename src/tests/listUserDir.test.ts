import { assertEquals } from 'assert';
import { config } from '../helpers/AppState.ts';
import { makeFakeDir } from '@/src/tests/helperTest.ts';
import { listRootFiles } from '@/src/helpers/listRootFiles.ts';
import { setTestSetup } from '@/src/tests/helperTest.ts';


Deno.test('listRootFiles.test', async () => {
	const mk = await makeFakeDir();
	// {
	// 	userDir: "C:\\dev\\deleta_arquivos\\fake_user",
	// 	filesDir: "\\logs",
	// 	users: [ "us1", "us2", "us3", "dir_tests" ]
	//   }

	setTestSetup({ fullPath: "c:\\dev" })
	// assertEquals( listRootFiles as string, "c:\\dev");
	assertEquals(await listRootFiles(), "c:\\dev");

	setTestSetup({ fullPath: "kkk" })
	assertEquals(await listRootFiles(), "");

	// config.set({ fullPath: "", userName: mk.users[0], usersPath: mk.userDir })
	setTestSetup({ fullPath: "C:\\dev\\deleta_arquivos\\fake_user\\us1\\logs" })
	assertEquals(await listRootFiles(), "C:\\dev\\deleta_arquivos\\fake_user\\us1\\logs");

	config.set({ fullPath: "C:\\dev\\deleta_arquivos\\fake_user\\us3\\logs" })
	assertEquals(await listRootFiles(), `${mk.userDir}\\${mk.users[2]}\\${mk.filesDir}`);

	setTestSetup({ usersPath: "all", filesPath: mk.filesDir })
	assertEquals(await listRootFiles(), []);

	setTestSetup({ usersPath: mk.userDir, filesPath: mk.filesDir })
	assertEquals(await listRootFiles(), [
		"C:\\dev\\deleta_arquivos\\fake_user\\dir_tests\\logs",
		"C:\\dev\\deleta_arquivos\\fake_user\\us1\\logs",
		"C:\\dev\\deleta_arquivos\\fake_user\\us2\\logs",
		"C:\\dev\\deleta_arquivos\\fake_user\\us3\\logs",
	]);

});
