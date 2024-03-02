import { parseArgs } from "parse_args"

type NAME_ARGS = "user-name" | "users-path" | "logs-path" | "sleep" | "days"

const main = async () => {
    const flags = parseArgs(Deno.args, {
        // boolean: ["help", "color"],
        string: <NAME_ARGS[]>["users-path", "user-name", "logs-path", "sleep", "days"],
        // default: { color: true },
        // negatable: ["color"],
        // "--": ["users"],
    });

    console.log(flags["user-name"], flags["users-path"], flags["logs-path"], flags["sleep"], flags["days"]);
}