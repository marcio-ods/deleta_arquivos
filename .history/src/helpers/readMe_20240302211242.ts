import { appLog } from '@/src/helpers/AppLog.ts';
import { exists } from 'exists';

const logsPath = 'logs';
// const logsPath = "AppData\\\\Local\\\\[AppName]\\\\Logs "
const usersPath = `${Deno.cwd()}\\\\fake_user`;
// const usersPath = "C:\\\\users"

export async function readMe() {
	try {
		const file = `${Deno.cwd()}\\readme.txt`;
		const isFile = await exists(file);
		if (!isFile) {
			await Deno.writeTextFile(
				file,
				`
            Configuração padrão:
            --users-path=${usersPath} --user-name=all --logs-path=${logsPath} --sleep=0 --days=30

                                        exemplos de configurações flags

            remoto:
            --users-path=172.0.0.1\\\\c$\\\\Users

            Caminho da pasta do(s) arquivo(s) 
            --logs-path=${logsPath}

            usuário expecifico:
            --user-name=fulano

            Máximo de dias que um arquivo pode existir
            --days=30

            atraso de execução em 100 milisegundos:
            --sleep=100 
            `,
			);
		}
	} catch (error) {
		console.log(error.message);
		appLog.set(error.message);
	}
}
