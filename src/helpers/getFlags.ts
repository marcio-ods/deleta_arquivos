import { CONFIG_ARGS } from '@/src/helpers/appType.ts';
import { parseArgs } from 'parse_args';
import { yellow } from 'colors';
import { appLog } from '@/src/helpers/AppLog.ts';


type NAME_ARGS = 'users-path' | 'files-path' | 'full-path' | 'sleep' | 'days'

// deno task start 
// start: --users-path=C:\dev\deleta_arquivos\\fake_user  --files-path=  --full-path=a --sleep=s-0 --days=5 

export function getFlags(): CONFIG_ARGS {
	const flags = parseArgs(Deno.args, {
		string: <NAME_ARGS[]>[
			'users-path',
			'files-path',
			'full-path',
			'sleep',
			'days',
		],
	});

	const start = Object.keys(flags)
		.filter(a => a.trim() != "_")
		.reduce((a, b) => (a + ` --${b}=${flags[b]}`), 'Start:')

	appLog().set(start)
	console.log((Object.keys(flags)
		.filter(a => a.trim() != "_")
		.reduce((a, b) => (a + ` ${yellow(`--${b}=`)}${flags[b]}`), 'Start:')).trim());

	return {
		days: flags['days']?.trim() || "0",
		sleep: flags['sleep']?.trim() || "0",
		filesPath: flags['files-path']?.trim() || "",
		usersPath: flags['users-path']?.trim() || "C:\\Users",
		fullPath: flags['full-path']?.trim() || "",
	};
}
