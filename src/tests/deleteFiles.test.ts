import { deleteFiles } from '@/src/helpers/deleteFiles.ts';
import { sleep } from '@/src/helpers/sleep.ts';
import { exists, } from 'exists';


Deno.test("deleteFiles test", async () => {
    const dir = `${Deno.cwd()}/dir_tests`
    const files = []
    console.log('dir', dir);
    try {
        if (!await exists(dir, { isDirectory: true }))
            await Deno.mkdir(dir)
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