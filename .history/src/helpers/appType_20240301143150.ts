export type CONFIG_ARGS = {
    usersPath?: string
    logsPath?: string
    days?: string
    sleep?: string
    userName?: string
}


export type CONFIG = {
    usersPath: string
    logsPath: string
    days: bigint
    sleep: number
    userName: string

    // action: "delete" | "toMove";
    // daysElapsed: number;
    // ip: string;
    // ip_folder: string;
    // ip_backup: string;
    // folder: string;
    // backup: string;// Quando informado é pra mover, não informado pra excluir
}

// "users-path", "user-name", "logs-path", "sleep", "days"