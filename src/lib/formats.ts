export const formatCurrency = (value: string): string => {
  const numericValue = value.replace(/[^\d]/g, "");
  const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formattedValue.replace("R$", "").trim();
}

export function formatToExtenseDate(dateString: string | Date) {
  let date;
  if (typeof dateString === 'string') date = new Date(dateString);
  else date = dateString;
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('pt-BR', options as { day: '2-digit', month: 'long', year: 'numeric' }).format(date);

  return formattedDate.replace(/^(\d+) de/, (match, day) => `${day} de`);
}