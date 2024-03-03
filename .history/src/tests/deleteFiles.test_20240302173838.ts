import { deleteFiles } from '@/src/helpers/deleteFiles.ts';
import { sleep } from '@/src/helpers/sleep.ts';
import { makeFakeDir } from '@/src/tests/makeFakeDir.ts';


Deno.test("deleteFiles test", async () => {
    // const dir = `${Deno.cwd()}/dir_tests`
    const files = []
    try {
        const dir = await makeFakeDir()

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