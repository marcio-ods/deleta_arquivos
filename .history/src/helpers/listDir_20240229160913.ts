import { appLog } from '@/src/helpers/log.ts';

export const listDir = async (src: string) => {
    try {
        // const src = await Deno.realPath(dir)
        const users: string[] = []

        for await (const dirEntry of Deno.readDir(src))
            if (dirEntry.isDirectory)
                users.push(dirEntry.name)

        appLog.set(users.length + " usuários encontrados ")
        return users
    } catch (error) {
        console.log(error.message);
        appLog.set(error.message)
        return []
    }
}