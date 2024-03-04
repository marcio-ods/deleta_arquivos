import { assertEquals } from 'assert';
import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from '../helpers/AppState.ts';
import { getTestArgs } from '@/src/tests/helperTest.ts';


Deno.test('initSetup days test', async () => {

    const dt = getTestArgs({ date: new Date('01/01/2000').toLocaleDateString('pt-BR') })

    assertEquals(config.get().days, 30);

    // await initSetup({ days: undefined })
    // // Fazer o calculo com a data atual
    // assertEquals(new Date(config.get().days).toLocaleDateString("pt-BR"), "01/04/2024");

    await initSetup(dt);

    assertEquals(
        new Date(config.get().days).toLocaleDateString('pt-BR'),
        '31/01/2000',
    );

    await initSetup({ ...dt, days: '20' });
    assertEquals(config.get().days, 948420000000);
    assertEquals(
        new Date(config.get().days).toLocaleDateString('pt-BR'),
        '21/01/2000',
    );

    await initSetup({ ...dt, days: '731' });
    assertEquals(
        new Date(config.get().days).toLocaleDateString('pt-BR'),
        '01/01/2002',
    );

    await initSetup(getTestArgs({ days: '365' }));
    // Fazer o calculo com a data atual
    assertEquals(
        new Date(config.get().days).toLocaleDateString('pt-BR'),
        '04/03/2025',
    );
});

Deno.test('initSetup usersPath test', async () => {
    assertEquals(config.get().usersPath, `c:\\Users`);

    await initSetup(getTestArgs({ usersPath: `` }));
    assertEquals(config.get().usersPath, `c:\\Users`);

    await initSetup(getTestArgs({ usersPath: undefined }));
    assertEquals(config.get().usersPath, `c:\\Users`);

    await initSetup(getTestArgs({ usersPath: `d:/Users` }));
    assertEquals(config.get().usersPath, `d:\\Users`);

    await initSetup(getTestArgs({ usersPath: `172.0.0.1\\d$/Users` }));
    assertEquals(config.get().usersPath, `\\\\172.0.0.1\\d$\\Users`);
});

Deno.test('initSetup filesPath test', async () => {
    assertEquals(config.get().filesPath, ``);
    await initSetup(getTestArgs({ filesPath: `` }));
    assertEquals(config.get().filesPath, ``);

    await initSetup(getTestArgs({ filesPath: `AppData\\Local/app\\Logs2` }));
    assertEquals(config.get().filesPath, `AppData\\Local\\app\\Logs2`);
});

Deno.test('initSetup sleep test', async () => {
    assertEquals(config.get().sleep, NaN);

    await initSetup(getTestArgs({ sleep: undefined }));
    assertEquals(config.get().sleep, NaN);

    await initSetup(getTestArgs({ sleep: '4d' }));
    assertEquals(config.get().sleep, NaN);
    // s|m|h|
    await initSetup(getTestArgs({ sleep: 's-10' }));
    assertEquals(config.get().sleep, (10 * 1000));

    await initSetup(getTestArgs({ sleep: 's-85' }));
    assertEquals(config.get().sleep, (85 * 1000));

    await initSetup(getTestArgs({ sleep: 'm-1' }));
    assertEquals(config.get().sleep, ((1 * 1000) * 60));

    await initSetup(getTestArgs({ sleep: 'h-85' }));
    assertEquals(config.get().sleep, 85 * 1000 * 60 * 60);
});

// Deno.test('initSetup fullPath test', async () => {
//     assertEquals(config.get().fullPath, "");

//     await initSetup({ fullPath: undefined });
//     assertEquals(config.get().fullPath, "");

//     await initSetup({ fullPath: 'C:\\dev\\deleta_arquivos\\dir_tests\\1' });
//     assertEquals(config.get().fullPath, 'C:\\dev\\deleta_arquivos\\dir_tests\\1');

//     await initSetup({ fullPath: '172.0.0.1\\d$\\dev\\deleta_arquivos\\dir_tests\\1' });
//     assertEquals(config.get().fullPath, '\\\\172.0.0.1\\d$\\dev\\deleta_arquivos\\dir_tests\\1');
// });
