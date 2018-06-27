export function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export function formatDate(databaseDate) {
  const date = new Date(databaseDate);
  return date.toLocaleDateString();
}