import { initSetup } from '@/src/helpers/initSetup.ts';
import { config } from '@/src/helpers/SetupState.ts';
import { listUserDir } from '@/src/helpers/listUserDir.ts';
import { appLog } from '@/src/helpers/AppLog.ts';
import { deleteFiles } from '@/src/helpers/deleteFiles.ts';
import { listFiles } from '@/src/helpers/listFiles.ts';
import { exists } from 'exists';
import { getFlags } from '@/src/helpers/getFlags.ts';


const main = async () => {

    await initSetup(getFlags())
    await sleep
    // console.log(config.get());

    try {
        const users = await listUserDir(config.get().usersPath, config.get().userName)

        for await (const u of users) {
            const dir = `${config.get().usersPath}\\${u}\\${config.get().logsPath}`
            if (await exists(dir)) {
                // console.log(dir);
                const listLogs = await listFiles(dir)
                // console.log(listLogs);
                await deleteFiles(dir, listLogs, u)
            }
        }

    } catch (error) {
        console.log(error.message);
        appLog.set(`total: usuários: ${config.get().numberOfDir} | Arquivos deletados: ${config.get().numberOfDeletedFiles}`)
        await appLog.exit(error.message)
    }

    await appLog.exit(`total: usuários: ${config.get().numberOfDir} | Arquivos deletados: ${config.get().numberOfDeletedFiles}`)
}

main()