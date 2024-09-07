// export function formatTimestamp(timestamp: string): string {
//     const date = new Date(timestamp);
//     const storedLanguage = localStorage.getItem('language') || 'en-US';
//     // Options for date formatting
//     const options: Intl.DateTimeFormatOptions = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     };
  
//     // Format the date using the provided locale and options
//     return date.toLocaleDateString(storedLanguage, options);
//   }

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  // Extract day, month, and year
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth is 0-based
  const year = date.getFullYear().toString();

  // Format the date as dd/mm/yyyy
  return `${day}/${month}/${year}`;
}