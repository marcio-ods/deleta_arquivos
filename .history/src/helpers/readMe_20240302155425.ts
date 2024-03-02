import { appLog } from "@/src/helpers/AppLog.ts";
import { exists } from 'exists';

const logsDir = "dir_tests"
// const logsDir = "AppData\\Local\\[NameApp]\\Logs "
const usersDir = "C:\\dev\\deleta_arquivos"
// const usersDir = "C:\\users"

export async function readMe() {
    try {
        const file = `${Deno.cwd()}//readme.txt`
        const isFile = await exists(file)
        if (!isFile)
            await Deno.writeTextFile(file, `
            Configuração padrão:
            --users-path=${usersDir} --user-name=all --logs-path=${logsDir} --sleep=0 --days=30

                                        exemplos de configurações flags

            remoto:
            --users-path=172.0.0.1\\c$\\Users

            Caminho da pasta do(s) arquivo(s) 
            --logs-path=AppData\\Local\\Regula\\Logs

            usuário expecifico:
            --user-name=fulano

            Máximo de dias que um arquivo pode existir
            --days=30

            atraso de execução em 100 milisegundos:
            --sleep=100 
            `)
    } catch (error) {
        console.log(error.message);
        appLog.set(error.message)
    }
}