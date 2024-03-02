import { listUserDir } from '@/src/helpers/listUserDir.ts';
import { assertEquals } from 'assert';
import { exists } from 'exists';
import { makeFiles } from '@/src/tests/mekeFiles.ts';

Deno.test("listUserDir test", async () => {

    const dir = `${Deno.cwd()}/dir_tests`

    for await (const it of [1, 2, 3]) {
        const dirIt = `${dir}\\${it}`
        if (!await exists(dirIt, { isDirectory: true }))
            await Deno.mkdir(dirIt)
        await makeFiles(dirIt)
        console.log();

    }
    const u = await listUserDir(dir, '1')
    assertEquals(u, ['1'])
})