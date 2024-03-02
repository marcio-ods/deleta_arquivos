import { assertEquals } from "assert";
import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from '@/src/helpers/SetupState.ts';
import { deleteFiles } from '@/src/helpers/deleteFiles.ts';
import { sleep } from '@/src/helpers/sleep.ts';



Deno.test("deleteFiles test", async () => {
    const dir = `${Deno.cwd()}/dir_tests`
    const files = []
    console.log('dir', dir);
    try {
        for await (const [idx] of (new Array(10)).entries()) {
            const nameFile = idx + 'test.txt'
            await Deno.writeTextFile(`${dir}/${nameFile}`, `${nameFile}\n`)
            files.push(nameFile)
            // await sleep(200)
        }

        await sleep(1200)
        await deleteFiles(dir, files)
    } catch (error) {
        throw new Error(error.message)
    }
})