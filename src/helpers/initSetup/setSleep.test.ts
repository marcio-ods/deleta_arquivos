import { setSleep } from '@/src/helpers/initSetup/setSleep.ts';
import { config } from '../AppState.ts';
import { assertEquals } from 'assert';
config.set({ appTest: true })

Deno.test("setSleep test", async () => {
    assertEquals((await setSleep("")).sleep, NaN);
    assertEquals((await setSleep("j5")).sleep, NaN);
    assertEquals((await setSleep("5")).sleep, NaN);
    assertEquals((await setSleep("s-1")).sleep, 1000);
    assertEquals((await setSleep("m-1")).sleep, 60000);
    assertEquals((await setSleep("h-1")).sleep, 60000 * 60);
    assertEquals((await setSleep("j-5")).sleep, 5000);
    assertEquals((await setSleep("-5")).sleep, 5000);
})