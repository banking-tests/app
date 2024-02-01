import { DateTime } from "luxon";

const SHORT_DATE = "LLLL dd";
const SHORTEST_DATE = "LLL dd";
const TIMEZONE = "America/Mexico_City";
const YEAR_AND_MONTH = "LLL y";

export function create(date) {
  return createInstance(date).toJSDate();
}

export function createInstance(date) {
  if (!date) {
    return DateTime.now().setZone(TIMEZONE);
  }
  const isIso = typeof date === "string";
  const instance = isIso ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return instance.setZone(TIMEZONE).setLocale("en");
}

export function shortDate(date) {
  const dateFormat = DateTime.fromISO(date)
    .setZone(TIMEZONE)
    .setLocale("en")
    .toFormat(SHORT_DATE);
  return dateFormat.charAt(0).toUpperCase() + dateFormat.slice(1);
}

export function shortestDate(date) {
  const dateFormat = DateTime.fromISO(date)
    .setZone(TIMEZONE)
    .setLocale("en")
    .toFormat(SHORTEST_DATE);
  return dateFormat.charAt(0).toUpperCase() + dateFormat.slice(1);
}

export function yearAndMonth(date) {
  const dateFormat = DateTime.fromJSDate(date)
    .setZone(TIMEZONE)
    .setLocale("en")
    .toFormat(YEAR_AND_MONTH);
  return (
    dateFormat.charAt(0).toUpperCase() + dateFormat.slice(1).replace(" ", "/")
  );
}

export function humanDate(date) {
  const dateFormat = DateTime.fromISO(date)
    .setZone(TIMEZONE)
    .setLocale("en")
    .toFormat(SHORT_DATE);
  return dateFormat;
}

export function secondsToHuman(seconds) {
  let output;

  if (seconds < 60) {
    output = `${Math.ceil(seconds)}s`;
  }
  if (seconds > 60 && seconds < 3600) {
    output = `${Math.ceil(seconds / 60)}m`;
  }
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600);
    const s = seconds % 3600;
    const m = Math.ceil(s / 60);
    output = `${h}h ${m}m`;
  }

  return output;
}

export function remainingMonths(date) {
  const now = DateTime.now().setZone(TIMEZONE).setLocale("en");
  const dateFormat = DateTime.fromJSDate(date)
    .setZone(TIMEZONE)
    .setLocale("en");
  const remainingMonths = dateFormat.diff(now, "months").months;
  return Math.ceil(remainingMonths);
}

export function substractMonths(date, months) {
  const now = DateTime.fromJSDate(date);
  now.minus({ month: months });

  return now.toISO();
}

export function endOfDay(date) {
  const now = DateTime.fromJSDate(date);
  return now.endOf("day").toISO();
}

export function startOfDay(date) {
  const now = DateTime.fromJSDate(date);
  return now.startOf("day").toISO();
}

export function isBefore(date) {
  const now = createInstance();
  const instance = createInstance(date);
  return now < instance;
}

export function isAfter(date) {
  const now = createInstance();
  const instance = createInstance(date);
  return now > instance;
}

export function humanRange(start, end) {
  const startInstance = createInstance(start);
  const endInstance = createInstance(end);

  const startDay = startInstance.toFormat("d");
  const startMonth = startInstance.toFormat("LLLL");
  const endDay = endInstance.toFormat("d");
  const endMonth = endInstance.toFormat("LLLL");

  return `Del ${startDay} de ${startMonth} al ${endDay} de ${endMonth}`;
}
