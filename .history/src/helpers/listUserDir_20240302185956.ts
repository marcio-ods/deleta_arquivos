import { appLog } from '@/src/helpers/AppLog.ts';
import { exists, } from 'exists';
import { config } from '@/src/helpers/SetupState.ts';

// 
export const listUserDir = async (dir: string, nameUser = "") => {
    try {
        // const dir = await Deno.realPath(dir)
        console.log("nameUser", nameUser);


        if (nameUser) if (await exists(`${dir}\\${nameUser}`))
            // return [`${dir}\\${nameUser}`]
            return [nameUser]
        else
            throw new Error(`Caminho não encontrado: ${dir}\\${nameUser}`)

        const users: string[] = []

        for await (const dirEntry of Deno.readDir(dir))
            if (dirEntry.isDirectory)
                users.push(dirEntry.name)

        appLog.set(users.length + " usuários encontrados ")
        config.set({ numberOfDir: users.length })
        return users
    } catch (error) {
        console.log(error.message);
        appLog.set(error.message)
        return []
    }
}