import { appLog } from '@/src/helpers/AppLog.ts';
import { config } from './AppState.ts';

export const deleteFile = async (
	filename: string
) => {
	try {
		const { birthtime } = await Deno.stat(filename)
		const createAt = birthtime?.getTime() || Date.now()

		if (createAt < config.get().days)
			return appLog().set(`mantido: ${filename}`);

		await Deno.remove(filename);
		const counter = config.get().numberOfDeletedFiles + 1;
		appLog().set(`excluindo ${counter}: ${filename}`);
		config.set({ numberOfDeletedFiles: counter });

	} catch (error) {
		console.log(error.message);
		appLog().set(error.message, "Erro");
	}
};
