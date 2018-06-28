export function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export function formatDate(databaseDate) {
  const date = new Date(databaseDate);
  return date.toLocaleDateString();
}

export function localizeDate(datePickerDate) {
  const year = datePickerDate.substr(0, 4);
  const month = datePickerDate.substr(5, 2) - 1;
  const day = datePickerDate.substr(8, 2);
  return new Date(year, month, day);
}