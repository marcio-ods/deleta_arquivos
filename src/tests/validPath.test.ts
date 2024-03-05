import { assertEquals } from 'assert';
import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from '../helpers/AppState.ts';
import { getTestArgs } from '@/src/tests/helperTest.ts';
import { validPath } from '@/src/helpers/validPath.ts';

Deno.test('validPath.test', async () => {

    await initSetup(getTestArgs({ fullPath: undefined, filesPath: "a\\a", usersPath: "c:\\x" }));
    await validPath()
    assertEquals(config.get().fullPath, "");
    assertEquals(config.get().filesPath, "a\\a");
    assertEquals(config.get().usersPath, "c:\\x");

    await initSetup(getTestArgs({ fullPath: "a:\\a\\a", filesPath: "a\\a", usersPath: "c:\\x" }));
    await validPath()
    assertEquals(config.get().fullPath, "a:\\a\\a");
    assertEquals(config.get().filesPath, "a\\a");
    assertEquals(config.get().usersPath, "c:\\x");

    await initSetup(getTestArgs({ fullPath: "a:\\a\\a", filesPath: "a\\a", usersPath: "" }));
    await validPath()
    assertEquals(config.get().fullPath, "a:\\a\\a");
    assertEquals(config.get().filesPath, "a\\a");
    assertEquals(config.get().usersPath, "c:\\Users");

    await initSetup(getTestArgs({ fullPath: "a:\\a\\a", filesPath: "", usersPath: "c:\\x" }));
    await validPath()
    assertEquals(config.get().fullPath, "a:\\a\\a");
    assertEquals(config.get().filesPath, "");
    assertEquals(config.get().usersPath, "c:\\x");

    await initSetup(getTestArgs({ fullPath: "a:\\a\\a", filesPath: "", usersPath: "" }));
    await validPath()
    assertEquals(config.get().fullPath, "a:\\a\\a");
    assertEquals(config.get().filesPath, "");
    assertEquals(config.get().usersPath, "c:\\Users");


});
