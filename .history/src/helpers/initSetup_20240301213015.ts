import { CONFIG_ARGS } from '@/src/helpers/appType.ts';
import { appLog } from '@/src/helpers/AppLog.ts';
import { readMe } from '@/src/helpers/readMe.ts';
import { config } from '@/src/helpers/SetupState.ts';
import { reassemblePath } from '@/src/helpers/reassemblePath.ts';

const userName = (v?: string) => {
    v = v?.trim()
    if (!v) return
    config.set({ userName: v })
}

const usersPath = (v?: string) => {
    // 'c:\\Users'  |  \\172.0.0.1\c$\...
    v = v?.trim() || ""
    if (v.includes(':'))
        config.set({ usersPath: reassemblePath(v) })
    if (v.includes('$'))
        config.set({ usersPath: '\\\\' + reassemblePath(v) })
}

// const days = (v?: string) => {
//     console.log("days", v);
//     if (v?.trim()) return daysElapsed(setup.days)
//     const n = Number(v?.trim())
//     if (isNaN(n)) return daysElapsed(setup.days)
//     return daysElapsed(BigInt(n))
// }

const sleep = (v?: string) => {

    console.log(v);
    if (v?.trim()) return
    console.log(v);
    const r = Number(v?.trim())
    if (isNaN(r)) return
    config.set({ sleep: r })
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
        // days(v.days)
        sleep(v.sleep)


        // // console.log(days(v.days));

        // setup.logsPath = logsPath(v.logsPath)
        setLog()
    } catch (error) {
        setLog()
        console.log(error.message);
        appLog.set(error.message)
        await Deno.writeTextFile(`${Deno.cwd()}//config.txt`, "Diretório não encontrado")
    }
}
