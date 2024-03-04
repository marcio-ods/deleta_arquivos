import { listRootFiles } from '@/src/helpers/listRootFiles.ts';
import { listAndDeleteFiles } from '@/src/helpers/listAndDeleteFiles.ts';
import { assertEquals } from 'assert';
import { makeFakeDir, setTestSetup } from '@/src/tests/helperTest.ts';
import { appLog } from '@/src/helpers/AppLog.ts';
import { addDays, subtractDay } from '@/src/helpers/date.ts';
import { sleep } from '@/src/helpers/sleep.ts';

Deno.test('listAndDeleteFiles.test', async () => {
	const now = Date.now()
	let mk = await makeFakeDir("rootFakeDelete");

	await sleep(100)

	setTestSetup({ usersPath: mk.userDir, filesPath: mk.filesDir, days: subtractDay(1, now) })

	let listTemp = await listRootFiles();
	let listRoot = Array.isArray(listTemp) ? listTemp : [listTemp]
	assertEquals(listRoot.length, 4);
	assertEquals(await listAndDeleteFiles(listRoot), 50);

	mk = await makeFakeDir("rootFakeDelete", 1000);

	assertEquals(addDays(0, now) === now, true);
	assertEquals(addDays(1, now) > now, true);

	const date2000 = new Date('01/01/2000').getTime()
	assertEquals(addDays(1, date2000) > now, false);
	assertEquals(addDays(1, date2000) < now, true);

	assertEquals(new Date(date2000).toLocaleDateString('pt-BR'), '01/01/2000');
	assertEquals(new Date(addDays(1, date2000)).toLocaleDateString('pt-BR'), '02/01/2000');

	setTestSetup({ usersPath: mk.userDir, filesPath: mk.filesDir, days: addDays(1, date2000) })

	listTemp = await listRootFiles();
	listRoot = Array.isArray(listTemp) ? listTemp : [listTemp]
	assertEquals(Array.isArray(listRoot), true);
	assertEquals(listRoot.length, 4);
	assertEquals(await listAndDeleteFiles(listRoot), 50);


	await appLog().exit({ msg: 'listAndDeleteFiles.test', st: "Alerta" })

});
