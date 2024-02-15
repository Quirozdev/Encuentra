export function sumDaysToDate(date: Date, days: number): Date {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
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
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
  const year = date.getFullYear();
  
  // Format the date components
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;

  // Return the formatted date string
  return `${formattedDay}/${formattedMonth}/${year}`;
}