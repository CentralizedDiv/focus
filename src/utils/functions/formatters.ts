export function createDate(_date: string) {
  return new Date(`${_date.substr(-4)}/${_date.substr(3, 2)}/${_date.substr(0, 2)}`);
}
export function formatDate(_date: string = "") {
  const date = new Date(_date);
  const time = date.getTime();

  // eslint-disable-next-line no-self-compare
  if (time !== time) {
    return _date;
  }

  return Intl.DateTimeFormat("pt-BR").format(date);
}

export function formatLicensePlate(licensePlate: string = "") {
  if (/^[a-zA-Z]{3}\d{4}$/.test(licensePlate)) {
    return licensePlate.replace(/^.{3}/, "$&-").toUpperCase();
  } else {
    return "Placa Inválida";
  }
}

export function formatCurrency(value: string | number = "") {
  return Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value));
}
