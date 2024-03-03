const date = new Date();
class AppLog {
	private lgs: string[] = [];

	constructor() {
		this.lgs.push(
			`Logs : ${date.getDate()}/${
				date.getMonth() + 1
			}/${date.getFullYear()}\n`,
		);
	}
	async write() {
		try {
			const txt = this.lgs.join('\n');
			await Deno.writeTextFile(`${Deno.cwd()}\\logs.txt`, txt);
		} catch (error) {
			console.log(error.message);
		}
	}
	set(str: string) {
		const timestamp = `${date.getHours()}:${date.getMinutes()}`;
		this.lgs.push(`[${timestamp}] ${str}`);
	}
	async exit(msg = '') {
		this.set(msg);
		await this.write();
		Deno.exit(5);
	}
}

const appLog = new AppLog();
export { appLog };
