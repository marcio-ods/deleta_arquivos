import { CONFIG_ARGS } from '@/src/helpers/appType.ts';
import { parseArgs } from 'parse_args';

type NAME_ARGS = 'user-name' | 'users-path' | 'logs-path' | 'sleep' | 'days';

export function getFlags(): CONFIG_ARGS {
	const flags = parseArgs(Deno.args, {
		string: <NAME_ARGS[]> [
			'users-path',
			'user-name',
			'logs-path',
			'sleep',
			'days',
		],
	});
	console.log(
		flags['user-name'],
		flags['users-path'],
		flags['logs-path'],
		flags['sleep'],
		flags['days'],
	);

	return {
		days: flags['days'],
		sleep: flags['sleep'],
		userName: flags['user-name'],
		logsPath: flags['logs-path'],
		usersPath: flags['users-path'],
	};
}
