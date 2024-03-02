import { assertEquals } from "assert";
import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from '@/src/helpers/SetupState.ts';

Deno.test("deleteFiles test", async () => {
    const dir = `${Deno.cwd()}/`

    try {

        for await (const it of (new Array(10))) {
            await Deno.writeTextFile()
        }
    } catch (error) {

    }

    assertEquals(config.get().days, 30);
})