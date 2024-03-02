import { assertEquals } from "assert";
import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from '@/src/helpers/SetupState.ts';

Deno.test("initSetup days AND addDays test", async () => {
    const dt = new Date("01/01/2000").toLocaleDateString("pt-BR")
    assertEquals(config.get().days, 30);

    await initSetup({ date: dt })
    assertEquals(new Date(config.get().days).toLocaleDateString("pt-BR"), "31/01/2000");

    await initSetup({ days: '20', date: dt })
    assertEquals(config.get().days, 948420000000);
    assertEquals(new Date(config.get().days).toLocaleDateString("pt-BR"), "21/01/2000");

    await initSetup({ days: '731', date: dt })
    assertEquals(new Date(config.get().days).toLocaleDateString("pt-BR"), "01/01/2002");

    await initSetup({ days: '365' })
    // Fazer o calculo com a data atual
    assertEquals(new Date(config.get().days).toLocaleDateString("pt-BR"), "02/03/2025");
    await initSetup({})
    // Fazer o calculo com a data atual
    assertEquals(new Date(config.get().days).toLocaleDateString("pt-BR"), "02/03/2025");
});

Deno.test("initSetup userName test", async () => {
    assertEquals(config.get().userName, "all");

    await initSetup({ userName: '' })
    assertEquals(config.get().userName, "all");

    await initSetup({ userName: 'marcio' })
    assertEquals(config.get().userName, "marcio");
});

Deno.test("initSetup usersPath test", async () => {

    assertEquals(config.get().usersPath, `c:\\Users`);
    await initSetup({ usersPath: `` })
    assertEquals(config.get().usersPath, `c:\\Users`);

    await initSetup({ usersPath: `d:/Users` })
    assertEquals(config.get().usersPath, `d:\\Users`);

    await initSetup({ usersPath: `172.31.165.46\\d$/Users` })
    assertEquals(config.get().usersPath, `\\\\172.31.165.46\\d$\\Users`);
});

Deno.test("initSetup logsPath test", async () => {
    assertEquals(config.get().logsPath, `AppData\\Local\\Regula\\Logs`);
    await initSetup({ logsPath: `` })
    assertEquals(config.get().logsPath, `AppData\\Local\\Regula\\Logs`);

    await initSetup({ logsPath: `AppData\\Local/Regula\\Logs2` })
    assertEquals(config.get().logsPath, `AppData\\Local\\Regula\\Logs2`);
});

Deno.test("initSetup sleep test", async () => {
    assertEquals(config.get().sleep, 0);

    await initSetup({ sleep: undefined })
    assertEquals(config.get().sleep, 0);

    await initSetup({ sleep: '4d' })
    assertEquals(config.get().sleep, 0);

    await initSetup({ sleep: '10' })
    assertEquals(config.get().sleep, 10);

    await initSetup({ sleep: '85' })
    assertEquals(config.get().sleep, 85);
});

