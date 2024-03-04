import { CONFIG_ARGS } from '@/src/helpers/appType.ts';
import { parseArgs } from 'parse_args';

type NAME_ARGS = 'users-path' | 'files-path' | 'full-path' | 'sleep' | 'days'

export function getFlags(): CONFIG_ARGS {
	const flags = parseArgs(Deno.args, {
		string: <NAME_ARGS[]>[
			'users-path',
			// 'user-name',
			'files-path',
			'full-path',
			'sleep',
			'days',
		],
	});
	console.log(
		flags['user-name'],
		flags['users-path'],
		flags['logs-path'],
		flags['full-path'],
		flags['sleep'],
		flags['days'],
	);

	return {
		days: flags['days']?.trim() || "",
		sleep: flags['sleep']?.trim() || "0",
		// userName: flags['user-name']?.trim() || "",
		filesPath: flags['files-path']?.trim() || "",
		usersPath: flags['users-path']?.trim() || "",
		fullPath: flags['full-path']?.trim() || "",
	};
}
