export const rounded = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;
