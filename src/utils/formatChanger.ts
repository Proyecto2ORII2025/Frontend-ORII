export function changeDateFormat(fecha: string, flag: boolean) {
    const partes = fecha.split('-');
    if (flag) {
        return `${partes[2]}-${partes[1]}-${partes[0]}`;

    }
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
}
