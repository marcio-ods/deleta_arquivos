import { assertEquals } from "assert";
import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from '@/src/helpers/SetupState.ts';

Deno.test("deleteFiles test", async () => {

    assertEquals(config.get().days, 30);
})