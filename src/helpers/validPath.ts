import { appLog } from '@/src/helpers/AppLog.ts';
import { config } from './AppState.ts';

// all or specificUser
export const validPath = async () => {
	const fullDir = config.get().fullPath.trim()
	if (fullDir) return

	const usersDir = config.get().usersPath.trim()
	const logsDir = config.get().filesPath.trim()
	// console.log("log2 fullPath 2", dir);
	if (logsDir && usersDir) return

	await appLog().exit(`verifique se as flags users-path=${usersDir} e logs-path=${logsDir} ou full-path=${fullDir}, foram informadas`, 'Erro')
}

