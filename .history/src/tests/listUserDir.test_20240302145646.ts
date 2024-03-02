import { listUserDir } from '@/src/helpers/listUserDir.ts';
import { assertEquals } from 'assert';
import { exists } from 'exists';
import { makeFiles } from '@/src/tests/mekeFiles.ts';

Deno.test("listUserDir test", async () => {

    const dir = `${Deno.cwd()}/dir_tests`


    const files = []

    for await (const it of [1, 2, 3]) {
        if (!await exists(dir, { isDirectory: true })) {
            await Deno.mkdir(`${dir}\\it`)
            await makeFiles(`${dir}\\${it}`)
        }
    }
    const u = await listUserDir(dir, '1')
    assertEquals(u, ['1'])
})