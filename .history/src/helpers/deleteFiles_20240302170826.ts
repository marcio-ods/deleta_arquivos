import { exists } from 'exists';
import { appLog } from '@/src/helpers/AppLog.ts';
import { config } from '@/src/helpers/SetupState.ts';

export const deleteFiles = async (dir: string, files: string[]) => {
    try {
        let counter = 0
        for await (const f of files) {
            const pth = `${dir}\\${f}`
            // console.log(pth);
            if (await exists(pth)) {
                await Deno.remove(pth)
                appLog.set(`deleted ${++counter} : ${pth}`)
                config.set({ numberOfDeletedFiles: config.get().numberOfDeletedFiles + 1 })
            }
        }
    } catch (error) {
        console.log(error.message);
        appLog.set(error.message)
    }
}