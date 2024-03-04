
import { sleep } from '@/src/helpers/sleep.ts';
import { config } from './AppState.ts';
const date = new Date();
type STATUS = "Alerta" | "Erro" | "Sucesso"

const readLog = async (filename: string) => {
	try {
		return await Deno.readTextFile(filename);
	} catch (error) {
		return ""
	}
}
class AppLog {
	private lgs: string[] = [];

	constructor() {
		this.lgs.push(
			`Logs : ${date.getDate()}/${date.getMonth() + 1
			}/${date.getFullYear()}\n`,
		);
	}
	// async write(v?: {
	// 	name: string;
	// 	add: boolean;
	// }) {
	async write({ name = "logs", add = false }) {
		const filename = `${Deno.cwd()}\\${name}.txt`
		try {
			let txt = this.lgs.join('\n');
			if (add)
				txt = txt + await readLog(filename)
			await Deno.writeTextFile(filename, txt);
		} catch (error) {
			console.log(error.message);
		}
	}
	set(str: string, st: STATUS = "Sucesso") {
		const timestamp = `${date.getHours()}:${date.getMinutes()}`;
		this.lgs.push(`[${timestamp}][${st}] ${str}`);
	}
	async exit({ msg = '', st = <STATUS>"Sucesso", name = 'logs' }) {
		this.set(msg, st);
		console.log(msg);

		if (config.get().appTest) return await this.write({ add: true });
		await this.write({ name });
		await sleep(100)
		Deno.exit();
	}
}

let UNIQUE: undefined | AppLog = undefined

const appLog = () => {
	if (!UNIQUE) UNIQUE = new AppLog()
	return UNIQUE
};

export { appLog };
