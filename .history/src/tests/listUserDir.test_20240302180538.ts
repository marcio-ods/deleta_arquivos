import { listUserDir } from '@/src/helpers/listUserDir.ts';
import { assertEquals } from 'assert';
import { makeFakeDir } from '@/src/tests/makeFakeDir.ts';

Deno.test("listUserDir test", async () => {

    const dir = await makeFakeDir()

    let specificUser = await listUserDir(dir, 'us2')
    assertEquals(specificUser.length, 1)
    assertEquals(specificUser[0], "us2")

    specificUser = await listUserDir(dir, 'notFoundUser')
    assertEquals(specificUser.length, 0)
    assertEquals(specificUser[0], undefined)

    const allUsers = await listUserDir(dir)
    // console.log(allUsers);

    assertEquals(allUsers.length, 4)
    assertEquals(allUsers[0], "dir_tests")
})