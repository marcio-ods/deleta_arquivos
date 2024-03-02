import { listUserDir } from '@/src/helpers/listUserDir.ts';
import { assertEquals } from 'assert';

Deno.test("listUserDir test", async () => {
    const u = await listUserDir('c:\\users', 'marcio')
    assertEquals(u, 'u')
})