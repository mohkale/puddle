const BYTE_SCALES: [string, number][] = [
    ['Tb', 1099511627776.0],
    ['Gb', 1073741824.0],
    ['Mb', 1048576.0],
    ['kb', 1024.0],
    ['B', 1.0],
]

export function scaleBytes(bytes: number): [number, string] {
    const [scale, mul] = BYTE_SCALES.find(
        (([_, val]) => bytes >= val)) || BYTE_SCALES[BYTE_SCALES.length-1];

    return [bytes/mul, scale]
}
