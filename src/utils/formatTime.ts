export function formatTimestamp(timestamp: string, locale: string = 'en-US'): string {
    const date = new Date(timestamp);
  
    // Options for date formatting
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    // Format the date using the provided locale and options
    return date.toLocaleDateString(locale, options);
  }