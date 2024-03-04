import { CONFIG } from '@/src/helpers/appType.ts';

class AppState {
	private d = <CONFIG>{
		usersPath: "",//'c:\\Users',
		filesPath: "",//`AppData\\Local\\[App]\\Logs`,
		days: 30,
		sleep: 0,
		numberOfDir: 0,
		numberOfDeletedFiles: 0,
	};
	set(v: Partial<CONFIG>) {
		this.d = { ...this.d, ...v };
		return this.d
	}
	get() {
		return this.d;
	}
}

const config = new AppState();

export { config };

