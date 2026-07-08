
export const formatarTelefone = (phone?: string) => {
    if (!phone) return "";

    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length !== 11) {
        return phone;
    }

    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(
        2,
        7
    )}-${cleaned.slice(7)}`;
};
