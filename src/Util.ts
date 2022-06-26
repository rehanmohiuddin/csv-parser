const parseDate = (date: string) =>
  [date.split("/")[1], date.split("/")[0], date.split("/")[2]].join("/");

const getNearestDate = (dateStrFirst: string, dateStrSecond: string) => {
  const date_1 = new Date(dateStrFirst);
  const date_2 = new Date(dateStrSecond);
  return date_1 < date_2
    ? date_1.toLocaleDateString()
    : date_2.toLocaleDateString();
};

const isEmpty = (obj: {}) => Object.keys(obj).length === 0;

export { parseDate, getNearestDate, isEmpty };
