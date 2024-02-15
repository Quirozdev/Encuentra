import {
  addMonths,
  differenceInCalendarMonths,
  differenceInMonths,
} from "date-fns";

export function sumDaysToDate(date: Date, days: number): Date {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

export function getDateData(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    day,
    month,
    year,
    hour,
    minute,
  };
}

export function formatDate(date: Date) {
  const dateData = getDateData(date);
  let month = "" + dateData.month;
  let day = "" + dateData.day;
  const year = dateData.year;

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}

export function formatHour(date: Date) {
  return `${date.getHours()}:${date.getMinutes()}`;
}

export function getMonthsDifferenceBetweenDates(from: Date, to: Date) {
  return differenceInMonths(to, from);
}

export function getDateAfterCertainMonths(from: Date, months: number) {
  return addMonths(from, months);
}

export function datesHaveTheSameDay(date: Date, anotherDate: Date) {
  const dateData = getDateData(date);
  const anotherDateData = getDateData(anotherDate);

  return (
    dateData.year === anotherDateData.year &&
    dateData.month === anotherDateData.month &&
    dateData.day === anotherDateData.day
  );
}
