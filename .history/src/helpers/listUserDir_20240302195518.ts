import { appLog } from '@/src/helpers/AppLog.ts';
import { exists, } from 'exists';
import { config } from '@/src/helpers/SetupState.ts';

// all or specificUser
export const listUserDir = async (dir: string, nameUser = "") => {
    nameUser = nameUser.trim() === "all" ? "" : nameUser.trim()
    try {

        if (nameUser) if (await exists(`${dir}\\${nameUser}`)) {
            config.set({ numberOfDir: 1 })
            return [nameUser]
        }
        else
            throw new Error(`Caminho não encontrado: ${dir}\\${nameUser}`)

        const users: string[] = []

        for await (const dirEntry of Deno.readDir(dir))
            if (dirEntry.isDirectory)
                users.push(dirEntry.name)

        const length = users.length
        appLog.set(length + " usuários encontrados ")
        config.set({ numberOfDir: length })
        console.log("numberOfDir", length);
        console.log("numberOfDir", config.get().numberOfDir);
        return users
    } catch (error) {
        console.log(error.message);
        appLog.set(error.message)
        return []
    }
}