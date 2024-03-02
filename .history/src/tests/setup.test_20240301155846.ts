import { assertEquals } from "assert";
import { initSetup, setup } from '@/src/helpers/setup.ts';

// Deno.test("url test", () => {
//     const url = new URL("./foo.js", "https://deno.land/");
//     assertEquals(url.href, "https://deno.land/foo.js");
// });

Deno.test("initSetup test", async () => {
    assertEquals(setup.logsPath, `AppData\\Local\\Regula\\Logs`);
    await initSetup({ logsPath: `AppData\\Local/Regula\\Logs2` })
    assertEquals(setup.logsPath, `AppData\\Local\\Regula\\Logs2`);

    // \\172.31.165.46\c$\Suporte
    // 'c:\\Users'
    assertEquals(setup.usersPath, `c:\\Users`);
    await initSetup({ usersPath: `d:/Users` })
    assertEquals(setup.usersPath, `d:\\Users`);
    await initSetup({ usersPath: `172.31.165.46\\d$/Users` })
    assertEquals(setup.usersPath, `\\\\172.31.165.46\\d$\\Users`);

    // assertEquals(setup.days, 12779329655726380052388638230n);
    // await initSetup({ days: '1' })
    // // assertEquals(setup.days, 12779329101393373956497363972n);
    // await initSetup({ days: '52' })
    // assertEquals(setup.days, 12779329250035659196894183884n);

    assertEquals(setup.sleep, 0);
    await initSetup({ sleep: '1' })
    assertEquals(setup.sleep, 1);

    assertEquals(setup.userName, "all");
    await initSetup({ userName: '_marcio' })
    assertEquals(setup.userName, "_marcio");
});
