export const formatarMomento = (
  date: string | Date
): string => {
  const now = new Date();
  const target = new Date(date);

  const diffMs = now.getTime() - target.getTime();

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diffMs < minute) {
    return "Agora";
  }

  if (diffMs < hour) {
    const minutes = Math.floor(diffMs / minute);

    return `${minutes} min atrás`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);

    return `${hours} hora${hours > 1 ? "s" : ""} atrás`;
  }

  if (diffMs < day * 2) {
    return "Ontem";
  }

  if (diffMs < week) {
    const days = Math.floor(diffMs / day);

    return `${days} dias atrás`;
  }

  if (diffMs < month) {
    const weeks = Math.floor(diffMs / week);

    return `${weeks} semana${weeks > 1 ? "s" : ""} atrás`;
  }

  if (diffMs < year) {
    const months = Math.floor(diffMs / month);

    return `${months} mês${months > 1 ? "es" : ""} atrás`;
  }

  const years = Math.floor(diffMs / year);

  return `${years} ano${years > 1 ? "s" : ""} atrás`;
};