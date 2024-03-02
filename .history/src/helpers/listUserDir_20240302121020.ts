import { appLog } from '@/src/helpers/AppLog.ts';

// 
export const listUserDir = async (dir: string, nameUser?: string) => {
    try {
        // const dir = await Deno.realPath(dir)

        if (nameUser)
            const users: string[] = []

        for await (const dirEntry of Deno.readDir(dir))
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