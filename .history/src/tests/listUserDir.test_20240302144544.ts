import { listUserDir } from '@/src/helpers/listUserDir.ts';
import { assertEquals } from 'assert';

Deno.test("listUserDir test", async () => {

    const dir = `${Deno.cwd()}/dir_tests`
    const files = []
    const u = await listUserDir(dir, 'marcio')
    assertEquals(u, 'u')
})