import { addMonths, differenceInMonths } from "date-fns";

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

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

export function formatDate(date: Date, joinCharacter: string) {
  const dateData = getDateData(date);
  let month = "" + dateData.month;
  let day = "" + dateData.day;
  const year = dateData.year;

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join(joinCharacter);
}

// 2024-03-22
export function formatStrDateToSpanish(date: string) {
  const dateParts = date.split("-");

  const year = dateParts[0];
  const month = MONTHS[Number(dateParts[1]) - 1];
  const day = dateParts[2];

  return `${day} de ${month} del ${year}`;
}

export function formatHour(date: Date) {
  let hour = "" + date.getHours();
  let minutes = "" + date.getMinutes();

  if (hour.length < 2) hour = "0" + hour;
  if (minutes.length < 2) minutes = "0" + minutes;

  return `${hour}:${minutes}`;
}

export function formatStrHour(hour: string) {
  const hourParts = hour.split(":");
  let hourPart = hourParts[0];
  let minutesPart = hourParts[1];

  if (hourPart.length < 2) hourPart = "0" + hourPart;
  if (minutesPart.length < 2) minutesPart = "0" + minutesPart;

  return `${hourPart}:${minutesPart} hrs`;
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

export function convertTimeTo12HourFormat(timeString): string {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(':').map(Number);

  // Determine if it's AM or PM
  const period = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Construct the new time string
  const newTimeString = `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;

  return newTimeString;
};

export function formatDate(dateString) {
  // Parse the input date string
  const date = new Date(dateString);
  // Extract day, month, and year
  const day = date.getDate() + 1
  const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
  const year = date.getFullYear();
  
  // Format the date components
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  // Return the formatted date string
  return `${formattedDay}/${formattedMonth}/${year}`;
}

export function dateToString(date:Date):string{  
  // Extract day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
  const year = date.getFullYear();
  
  // Format the date components
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;

  // Return the formatted date string
  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function timeToString(time:Date):string{
  console.log(time.toLocaleTimeString('en-US', { hour12: false }))
  return time.toLocaleTimeString('en-US', { hour12: false });
}