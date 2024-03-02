import { assertEquals } from "assert";
import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from '@/src/helpers/SetupState.ts';

Deno.test("deleteFiles test", async () => {
    const dir = `${Deno.cwd()}/dir_tests`
    console.log('dir', dir);


    try {

        for await (const [idx] of (new Array(10)).entries()) {
            await Deno.writeTextFile(`${dir}/${idx}test.txt`, `${idx}\n`)
        }
    } catch (error) {
        throw new Error('Falha ao criar arquivos')
    }

    // assertEquals(config.get().days, 30);
})