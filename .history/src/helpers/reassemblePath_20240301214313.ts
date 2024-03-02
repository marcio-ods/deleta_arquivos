export const reassemblePath = (v: string) => {
    return v
        .trim()
        .replaceAll('\/', ';')
        .replaceAll('\\', ';')
        .replaceAll(';;', ';')
        .replaceAll(';', '\\')
}