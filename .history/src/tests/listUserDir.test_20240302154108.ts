import { listUserDir } from '@/src/helpers/listUserDir.ts';
import { assertEquals } from 'assert';
import { exists } from 'exists';
import { makeFiles } from '@/src/tests/mekeFiles.ts';

Deno.test("listUserDir test", async () => {

    const dir = `${Deno.cwd()}/dir_tests`

    for await (const it of [1, 2, 3, 4, 5]) {
        const dirIt = `${dir}\\${it}`
        if (!await exists(dirIt, { isDirectory: true }))
            await Deno.mkdir(dirIt)
        await makeFiles(dirIt)
        console.log();
    }

    let specificUser = await listUserDir(dir, '2')
    assertEquals(specificUser.length, 1)
    assertEquals(specificUser[0], "2")

    specificUser = await listUserDir(dir, '7')
    assertEquals(specificUser.length, 0)
    assertEquals(specificUser[0], undefined)

    const allUsers = await listUserDir(dir)
    console.log(allUsers);

    assertEquals(allUsers.length, 5)
    assertEquals(allUsers[0], "1")
})