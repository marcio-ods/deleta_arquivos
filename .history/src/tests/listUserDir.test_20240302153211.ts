import { listUserDir } from '@/src/helpers/listUserDir.ts';
import { assertEquals } from 'assert';
import { exists } from 'exists';
import { makeFiles } from '@/src/tests/mekeFiles.ts';
import { reassemblePath } from '@/src/helpers/reassemblePath.ts';

Deno.test("listUserDir test", async () => {

    const dir = `${Deno.cwd()}/dir_tests`

    for await (const it of [1, 2, 3, 5]) {
        const dirIt = `${dir}\\${it}`
        if (!await exists(dirIt, { isDirectory: true }))
            await Deno.mkdir(dirIt)
        await makeFiles(dirIt)
        console.log();
    }

    const specificUser = await listUserDir(dir, '2')
    assertEquals(specificUser.length, 1)
    assertEquals(reassemblePath(specificUser[0]), "C:\\dev\\deleta_arquivos\\dir_tests\\2")


    const allUsers = await listUserDir(dir)
    console.log(allUsers);

    assertEquals(allUsers.length, 5)
    // assertEquals(reassemblePath(allUsers[0]), "C:\\dev\\deleta_arquivos\\dir_tests\\1")
})