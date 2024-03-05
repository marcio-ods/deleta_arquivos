import { CONFIG_ARGS } from '@/src/helpers/appType.ts';
import { appLog } from '@/src/helpers/AppLog.ts';
import { readMe } from '@/src/helpers/readMe.ts';
import { config } from './AppState.ts';
import { reassemblePath } from '@/src/helpers/reassemblePath.ts';
import { addDays } from '@/src/helpers/date.ts';
import { setSleep } from '@/src/helpers/initSetup/setSleep.ts';

// const userName = (v: string) => {
//     if (v) return config.set({ userName: v });
//     config.set({ userName: 'all' });
// };

const usersPath = (v: string) => {
    // 'c:\\Users'  |  \\172.0.0.1\c$\...
    v = v.trim();
    if (!v) return config.set({ usersPath: "c:\\Users" });
    if (v.includes(':')) {
        config.set({ usersPath: reassemblePath(v) });
    } else if (v.includes('$')) {
        config.set({ usersPath: '\\\\' + reassemblePath(v) });
    } else {
        config.set({ usersPath: reassemblePath(config.get().usersPath) });
    }
};

const days = (v: string, date?: string) => {
    const is_NaN = (n: number) => isNaN(n) ? config.get().days : n;

    const current = date?.trim()
        ? (new Date(date.trim())).getTime()
        : undefined;
    v = v?.trim();

    if (v) {
        config.set({ days: addDays(is_NaN(is_NaN(Number(v))), current) });
    } else {
        config.set({ days: addDays(config.get().days, current) });
    }
};



const filesPath = (v: string) => {
    if (!v) return config.set({ filesPath: "" });
    config.set({ filesPath: reassemblePath(v) })
};

const fullPath = (v: string) => {
    // 'c:\\Users'  |  \\172.0.0.1\c$\...
    if (!v) return config.set({ fullPath: "" });

    if (v.includes(':'))
        return config.set({ fullPath: reassemblePath(v) });

    if (v.includes('$'))
        return config.set({ fullPath: '\\\\' + reassemblePath(v) });
};


export async function initSetup(v: CONFIG_ARGS) {
    const setLog = () => {
        appLog().set(`usersPath: ${config.get().usersPath}`);
        appLog().set(`filesPath: ${config.get().filesPath}`);
        appLog().set(`fullPath: ${config.get().fullPath}`);
    };

    try {
        usersPath(v.usersPath);
        days(v.days, v.date);
        await setSleep(v.sleep);
        filesPath(v.filesPath);
        fullPath(v.fullPath);
        setLog();
        await readMe();
        // console.log(config.get());
    } catch (error) {
        setLog();
        console.log(error.message);
        appLog().set(error.message);
        await Deno.writeTextFile(
            `${Deno.cwd()}//config.txt`,
            'Diretório não encontrado',
        );
    }
}
