export function sumDaysToDate(date: Date, days: number): Date {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

export function formatDate(date: Date) {
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("/");
}

export function formatHour(date: Date) {
  return `${date.getHours()}:${date.getMinutes()}`;
}
