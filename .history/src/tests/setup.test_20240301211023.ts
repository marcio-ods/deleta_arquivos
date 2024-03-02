import { assertEquals } from "assert";
import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from '@/src/helpers/SetupState.ts';


// Deno.test("url test", () => {
//     const url = new URL("./foo.js", "https://deno.land/");
//     assertEquals(url.href, "https://deno.land/foo.js");
// });

Deno.test("initSetup userName test", async () => {
    assertEquals(config.get().userName, "all");

    await initSetup({ userName: '' })
    assertEquals(config.get().userName, "all");

    await initSetup({ userName: 'marcio' })
    assertEquals(config.get().userName, "marcio");
});

Deno.test("initSetup usersPath test", async () => {

    //     assertEquals(config.get().usersPath, `c:\\Users`);
    //     await initSetup({ usersPath: `d:/Users` })
    //     assertEquals(config.get().usersPath, `d:\\Users`);
    //     await initSetup({ usersPath: `172.31.165.46\\d$/Users` })
    //     assertEquals(config.get().usersPath, `\\\\172.31.165.46\\d$\\Users`);


});

// Deno.test("initSetup test", async () => {
//     assertEquals(config.get().logsPath, `AppData\\Local\\Regula\\Logs`);
//     await initSetup({ logsPath: `AppData\\Local/Regula\\Logs2` })
//     assertEquals(config.get().logsPath, `AppData\\Local\\Regula\\Logs2`);

//     // \\172.31.165.46\c$\Suporte
//     // 'c:\\Users'


//     // assertEquals(config.get().days, 12779329655726380052388638230n);
//     // await initSetup({ days: '1' })
//     // // assertEquals(config.get().days, 12779329101393373956497363972n);
//     // await initSetup({ days: '52' })
//     // assertEquals(config.get().days, 12779329250035659196894183884n);

//     assertEquals(config.get().sleep, 0);
//     await initSetup({ sleep: '1' })
//     assertEquals(config.get().sleep, 1);

//     assertEquals(config.get().userName, "all");
//     await initSetup({ userName: '_marcio' })
//     assertEquals(config.get().userName, "_marcio");
// });
