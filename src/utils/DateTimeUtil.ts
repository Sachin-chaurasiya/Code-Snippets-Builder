export const getMilliSecondsByDateString = (dateString: string) => {
  return Date.parse(dateString);
};

export const getDateByDateString = (dateString: string) => {
  return new Date(dateString);
};
