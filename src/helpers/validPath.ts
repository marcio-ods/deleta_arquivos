import { appLog } from '@/src/helpers/AppLog.ts';
import { config } from "@/src/helpers/AppState.ts";



export const validPath = async () => {
	const fullDir = config.get().fullPath.trim()
	if (fullDir) return

	const usersDir = config.get().usersPath.trim()
	const filesDir = config.get().filesPath.trim()
	// console.log("log2 fullPath 2", dir);
	if (filesDir && usersDir) return

	await appLog().exit({ msg: `verifique se as flags users-path=${usersDir} e files-path=${filesDir} ou full-path=${fullDir}, foram informadas`, st: 'Erro' })
}

