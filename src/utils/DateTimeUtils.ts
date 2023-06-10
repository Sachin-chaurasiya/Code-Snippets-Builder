export const getMilliSecondsByDateString = (dateString: string) => {
  return Date.parse(dateString);
};

export const getDateByDateString = (dateString: string) => {
  return new Date(dateString);
};

export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);

  // Format the date
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  } as Intl.DateTimeFormatOptions;

  const formattedDate = `${date.toLocaleDateString('en-US', options)}`;

  return formattedDate;
};
