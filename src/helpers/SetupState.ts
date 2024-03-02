import { CONFIG } from '@/src/helpers/appType.ts';

class SetupState {
    private d = <CONFIG>{
        usersPath: 'c:\\Users',
        logsPath: `AppData\\Local\\Regula\\Logs`,
        days: 30,
        sleep: 0,
        userName: "all"
    }
    set(v: Partial<CONFIG>) {
        this.d = { ...this.d, ...v }
    }
    get() {
        return this.d
    }
}

const config = new SetupState()

export { config }
