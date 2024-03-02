import { CONFIG_ARGS } from '@/src/helpers/appType.ts';
import { appLog } from '@/src/helpers/AppLog.ts';
import { readMe } from '@/src/helpers/readMe.ts';
import { config } from '@/src/helpers/SetupState.ts';

const userName = (v?: string) => {
    v = v?.trim()
    if (!v) return
    config.set({ userName: v })
}

const usersPath = (v?: string) => {
    // \\172.0.0.1\c$\...
    // 'c:\\Users'
    v = v?.trim() || ""
    if (v.includes(':')) {
        config.set({ userName: reassemblePath(v) })
    } else if (v.includes('$')) return '\\\\' + reassemblePath(v)

    return reassemblePath(setup.usersPath)
    config.set({ userName: v })
}


export async function initSetup(v: CONFIG_ARGS) {
    const setLog = () => {
        appLog.set(`userName: ${config.get().userName}`)
        appLog.set(`usersPath: ${config.get().usersPath}`)
        appLog.set(`logsPath: ${config.get().logsPath}`)
    }

    try {
        await readMe()
        userName(v.userName)
        usersPath(v.usersPath)

        // setup.usersPath = usersPath(v.usersPath)
        // setup.days = days(v.days)
        // // console.log(days(v.days));

        // setup.sleep = sleep(v.sleep)
        // setup.logsPath = logsPath(v.logsPath)
        setLog()
    } catch (error) {
        setLog()
        console.log(error.message);
        appLog.set(error.message)
        await Deno.writeTextFile(`${Deno.cwd()}//config.txt`, "Diretório não encontrado")
    }
}
