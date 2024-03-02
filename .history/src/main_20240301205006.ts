import { parseArgs } from "parse_args"
import { initSetup } from '@/src/helpers/initSetup.ts';

type NAME_ARGS = "user-name" | "users-path" | "logs-path" | "sleep" | "days"

const main = async () => {
    const flags = parseArgs(Deno.args, {
        string: <NAME_ARGS[]>["users-path", "user-name", "logs-path", "sleep", "days"],
    });

    console.log(flags["user-name"], flags["users-path"], flags["logs-path"], flags["sleep"], flags["days"]);
    await initSetup(flags)
}

main()