import { CONFIG_ARGS } from '@/src/helpers/appType.ts';
import { appLog } from '@/src/helpers/AppLog.ts';
import { readMe } from '@/src/helpers/readMe.ts';

export async function initSetup(v: CONFIG_ARGS) {
    const setLog = () => {
        appLog.set(`userName: ${setup.userName}`)
        appLog.set(`usersPath: ${setup.usersPath}`)
        appLog.set(`logsPath: ${setup.logsPath}`)
    }

    try {
        await readMe()
        setup.userName = userName(v.userName)
        setup.usersPath = usersPath(v.usersPath)
        setup.days = days(v.days)
        // console.log(days(v.days));

        setup.sleep = sleep(v.sleep)
        setup.logsPath = logsPath(v.logsPath)
        setLog()
    } catch (error) {
        setLog()
        console.log(error.message);
        appLog.set(error.message)
        await Deno.writeTextFile(`${Deno.cwd()}//config.txt`, "Diretório não encontrado")
    }
}
