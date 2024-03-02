import { exists } from 'exists';
import { sleep } from '@/src/helpers/sleep.ts';

export async function makeFiles(dir: string) {
    const files = []
    try {
        if (!await exists(dir, { isDirectory: true }))
            await Deno.mkdir(dir)
        for await (const [idx] of (new Array(10)).entries()) {
            const nameFile = idx + 'test.txt'
            await Deno.writeTextFile(`${dir}/${nameFile}`, `${nameFile}\n`)
            files.push(nameFile)
            await sleep(10)
        }
        return files

    } catch (error) {
        throw error
    }
}