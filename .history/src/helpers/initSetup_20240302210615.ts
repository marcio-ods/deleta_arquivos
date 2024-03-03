import { CONFIG_ARGS } from '@/src/helpers/appType.ts';
import { appLog } from '@/src/helpers/AppLog.ts';
import { readMe } from '@/src/helpers/readMe.ts';
import { config } from '@/src/helpers/SetupState.ts';
import { reassemblePath } from '@/src/helpers/reassemblePath.ts';
import { addDays } from '@/src/helpers/date.ts';

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
    else if (v.includes('$'))
        config.set({ usersPath: '\\\\' + reassemblePath(v) })
    else
        config.set({ usersPath: reassemblePath(config.get().usersPath) })
}

const days = (v?: string, date?: string) => {
    const is_NaN = (n: number) => isNaN(n) ? config.get().days : n

    const current = date?.trim() ? (new Date(date.trim())).getTime() : undefined
    v = v?.trim()

    if (v)
        config.set({ days: addDays(is_NaN(is_NaN(Number(v))), current) })
    else
        config.set({ days: addDays(config.get().days, current) })
}

const sleep = (v?: string) => {
    // segundos = milissegundos / 1000
    v = v?.trim() ? v.trim() : ""
    if (!v) return
    type SLEEP = ['s', 'm' | 'h', number]
    let d = ['s', 0] as SLEEP

    if (v.includes('-'))
        d = v.split('-') as SLEEP
    else
        d = ['s', Number(v)] as SLEEP

    if (isNaN(d[1])) return

    switch (d[0]) {
        case "s":
            return config.set({ sleep: d[1] * 100 })
        case "h":
            return config.set({ sleep: (d[1] * 100) * 60 })

    }
    config.set({ sleep: r })
}

const logsPath = (v?: string) => {
    v = v?.trim() || ""
    if (v) config.set({ logsPath: reassemblePath(v) })
    else
        config.set({ logsPath: reassemblePath(config.get().logsPath) })
}

export async function initSetup(v: CONFIG_ARGS) {
    const setLog = () => {
        appLog.set(`userName: ${config.get().userName}`)
        appLog.set(`usersPath: ${config.get().usersPath}`)
        appLog.set(`logsPath: ${config.get().logsPath}`)
    }

    try {
        userName(v.userName)
        usersPath(v.usersPath)
        days(v.days, v.date)
        sleep(v.sleep)
        logsPath(v.logsPath)
        setLog()
        await readMe()
        // console.log(config.get());
    } catch (error) {
        setLog()
        console.log(error.message);
        appLog.set(error.message)
        await Deno.writeTextFile(`${Deno.cwd()}//config.txt`, "Diretório não encontrado")
    }
}
