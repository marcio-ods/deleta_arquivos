import { sleep } from '@/src/helpers/sleep.ts';
import { exists } from 'exists';
import { CONFIG } from '@/src/helpers/appType.ts';
import { config } from '../helpers/AppState.ts';
import { CONFIG_ARGS } from '@/src/helpers/appType.ts';



config.set({ appTest: true })
const DATA_ARGS: CONFIG_ARGS = { days: "", fullPath: "", filesPath: "", sleep: "", usersPath: "c:\\Users" }

const DATA_SETUP: CONFIG = { days: 0, fullPath: "", filesPath: "", sleep: 0, usersPath: "c:\\Users", numberOfDeletedFiles: 0, numberOfDir: 0, appTest: true }



export const getTestArgs = (att: Partial<CONFIG_ARGS>) => {
    return { ...DATA_ARGS, ...att }
}

export const setTestSetup = (att: Partial<CONFIG>) => {
    return config.set({ ...DATA_SETUP, ...att })
    // validPath()
}


async function makeFiles(dir: string, amount = 10) {
    const files = [];
    try {
        if (!await exists(dir, { isDirectory: true }))
            await Deno.mkdir(dir);

        for await (const [idx] of (new Array(amount)).entries()) {
            const nameFile = idx + 'test.txt';
            await Deno.writeTextFile(`${dir}/${nameFile}`, `${nameFile}\n`);
            files.push(nameFile);
            await sleep(10);
        }
        return files;
    } catch (error) {
        throw error;
    }
}


export async function makeFakeDir(root = 'fake_user', beforeDaley = 0) {
    const userDir = `${Deno.cwd()}\\${root}`;
    const users = ['us1', 'us2', 'us3', 'dir_tests'];

    try {
        let amount = 5;
        for await (const u of ['us1', 'us2', 'us3', 'dir_tests']) {
            const dir = `${userDir}\\${u}\\logs`;
            if (!await exists(dir, { isDirectory: true })) {
                await Deno.mkdir(dir, { recursive: true });
            }
            await makeFiles(dir, amount);
            amount += 5;
        }
        await sleep(beforeDaley)
        return { userDir, filesDir: "logs", users };
    } catch (error) {
        throw error;
    }
}