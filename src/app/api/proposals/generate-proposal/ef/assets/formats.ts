export const formatDate = (date: string | Date): string => {
  if (typeof date === 'string') {
    let [year, month, day] = date.split("-");
    if (date.includes("/")) [year, month, day] = date.split("/");
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

export const formatTelefone = (telefone: string): string => {
  const apenasNumeros = telefone.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (apenasNumeros.length === 10) {
    // Formato: (__) ____-____
    return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (apenasNumeros.length === 11) {
    // Formato: (__) _____-____
    return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    // Retorna o número original se não tiver 10 ou 11 dígitos
    return telefone;
  }
}