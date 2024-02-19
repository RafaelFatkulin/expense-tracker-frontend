export const translateDate = (date: Date, time: boolean = false) => {
  const dateObj = new Date(date || null);
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  if (time) {
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    return `${day}.${month + 1}.${year} ${hours}:${minutes}:${seconds}`;
  }

  return `${day}.${month + 1}.${year}`;
};
