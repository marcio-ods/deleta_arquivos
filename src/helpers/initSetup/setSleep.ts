import { config } from '../AppState.ts';
import { appLog } from '@/src/helpers/AppLog.ts';

type SLEEP = ['s' | 'm' | 'h', number];

const validSleep = async (v: string[]) => {
    const t = `${v[0]}`.trim()
    const n = Number(v[1])
    if (isNaN(n) || !['s', 'm', 'h'].includes(v[0]))
        await appLog().exit({ msg: `verifique se a flag sleep=${v} foi infirmada corretamente ex: um segundo: s-1 | um minuto: m-1 | uma hora: h-1`, st: 'Erro' })
    return [t, n] as SLEEP
}

export const setSleep = async (v: string) => {
    // segundos = milissegundos / 1000
    const [t, n] = await validSleep(v.toLocaleLowerCase().split('-'));

    switch (t) {
        case "m":
            return config.set({ sleep: (n * 1000) * 60 })
        case "h":
            return config.set({ sleep: ((n * 1000) * 60) * 60 })
        default: // s
            return config.set({ sleep: (n * 1000) })
    }

};