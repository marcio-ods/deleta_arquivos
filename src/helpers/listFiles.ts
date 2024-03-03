export const listFiles = async (src: string) => {
	try {
		// const src = await Deno.realPath(dir)
		const files: string[] = [];

		for await (const dirEntry of Deno.readDir(src)) {
			if (dirEntry.isFile) {
				files.push(dirEntry.name);
			}
		}

		return files;
	} catch (error) {
		console.log(error.message);

		return [];
	}
};
