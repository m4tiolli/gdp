export const formatDate = (date: string | Date): string => {
  if (typeof date === 'string'){
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  } else {
    return date.toLocaleDateString()
  }
};

export const formatCNPJ = (cnpj: string): string => {
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};

export const formatValor = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};