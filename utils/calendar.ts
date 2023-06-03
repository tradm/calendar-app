import dayjs from "dayjs";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  // generate prefix date
  for (let i = 1; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  //   generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }

  return arrayOfDate;
};

export const datesAreOnSameDay = (first: any, second: any) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export const datesAreOnSameDayHour = (first: any, second: any) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate() &&
  first.getHours() === second.getHours();

export const getHours = (month = dayjs().month(), year = dayjs().year()) => {
  const start = dayjs().year(year).month(month).startOf("month");

  return start;
};

export const generateDateWeek = (
  month = dayjs().month(),
  year = dayjs().year(),
  index: number
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  return 5;
};

export const getWeekDates = (days: any, date: any) => {
  const d = dayjs(date);
  let arrayOfHour: dayjs.Dayjs[] = [];

  for (let i = 0; i < 24; i++) {
    arrayOfHour.push(d.hour(i));
  }

  return arrayOfHour;
};

export const getMonday = () => {
  const today = dayjs();
  const first = today.date() - today.day() + 1;
  return dayjs(today.set("date", first));
};

export const addDateBy = (date: Date, count: number) => {
  const d = dayjs(date);
  return dayjs(d.set("date", d.date() + count));
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayHours = [
  { time: "12 am" },
  { time: "" },
  { time: "1 am" },
  { time: "" },
  { time: "2 am" },
  { time: "" },
  { time: "3 am" },
  { time: "" },
  { time: "4 am" },
  { time: "" },
  { time: "5 am" },
  { time: "" },
  { time: "6 am" },
  { time: "" },
  { time: "7 am" },
  { time: "" },
  { time: "8 am" },
  { time: "" },
  { time: "9 am" },
  { time: "" },
  { time: "10 am" },
  { time: "" },
  { time: "11 am" },
  { time: "" },
  { time: "12 pm" },
  { time: "" },
  { time: "1 pm" },
  { time: "" },
  { time: "2 pm" },
  { time: "" },
  { time: "3 pm" },
  { time: "" },
  { time: "4 pm" },
  { time: "" },
  { time: "5 pm" },
  { time: "" },
  { time: "6 pm" },
  { time: "" },
  { time: "7 pm" },
  { time: "" },
  { time: "8 pm" },
  { time: "" },
  { time: "9 pm" },
  { time: "" },
  { time: "10 pm" },
  { time: "" },
  { time: "11 pm" },
  { time: "" },
];
