import { exists } from 'exists';
import { makeFiles } from '@/src/tests/makeFiles.ts';

export async function makeFakeDir() {
	const userDir = `${Deno.cwd()}\\fake_user`;

	try {
		let amount = 5;

		for await (const u of ['us1', 'us2', 'us3', 'dir_tests']) {
			const dir = `${userDir}\\${u}\\logs`;
			if (!await exists(dir, { isDirectory: true })) {
				await Deno.mkdir(dir, { recursive: true });
			}
			await makeFiles(dir, amount);
			amount += 5;
		}

		return userDir;
	} catch (error) {
		throw error;
	}
}
