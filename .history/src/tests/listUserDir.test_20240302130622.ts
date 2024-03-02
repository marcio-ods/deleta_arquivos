import { listUserDir } from '@/src/helpers/listUserDir.ts';
import { assert } from 'assert';

Deno.test("listUserDir test", async () => {
    const u = await listUserDir('c:\\users', 'marcio')
    assert
})