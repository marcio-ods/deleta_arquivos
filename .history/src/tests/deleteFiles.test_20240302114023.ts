import { assertEquals } from "assert";
import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from '@/src/helpers/SetupState.ts';

Deno.test("deleteFiles test", async () => {

    try {
        for await (const iterator of Array.from()) {

        }
    } catch (error) {

    }

    assertEquals(config.get().days, 30);
})