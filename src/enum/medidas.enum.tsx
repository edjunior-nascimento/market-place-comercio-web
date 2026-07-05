export type MedidasType = {
    unidade: string;
    descricao: string;
}

export const MedidasEnum = {
    UN: {unidade: "un", descricao: "Unidade"} as MedidasType,
    KG: {unidade: "kg", descricao: "Quilograma"} as MedidasType,
    MG: {unidade: "mg", descricao: "Miligramas"} as MedidasType,
    G: {unidade: "g", descricao: "Gramas"} as MedidasType,
    ML: {unidade: "ml", descricao: "Mililitros"} as MedidasType,
    L: {unidade: "l", descricao: "Litros"} as MedidasType,
    M: {unidade: "m", descricao: "Metros"} as MedidasType,
    M2: {unidade: "m²", descricao: "Metros Quadrados"} as MedidasType,
} as const satisfies Record<string, MedidasType>;