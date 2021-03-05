import { differenceInSeconds, format, isSameDay } from "date-fns";

const secondsIn = {
  s: 1,
  m: 60,
  h: 60 * 60,
  d: 60 * 60 * 24,
  w: 60 * 60 * 24 * 7,
};

/**
 * Represents the distance between `date` and `now` as a short string
 * @param date
 * @param suffix whether "ago" should be appended to the string, when applicable
 * @param now value to compare `date` to
 */
export function tinyRelative(
  date: Date,
  suffix = false,
  now = new Date()
): string {
  const secondsAgo = Math.max(differenceInSeconds(now, date), 1);

  // If same day, just show time
  if (isSameDay(date, now)) {
    return format(date, "HH:mm");
  }

  // Else, show relative distance using short units
  const relativeTimestamp = (() => {
    if (secondsAgo < secondsIn.m) return `${secondsAgo}s`;
    if (secondsAgo < secondsIn.h)
      return `${Math.floor(secondsAgo / secondsIn.m)}m`;
    if (secondsAgo < secondsIn.d)
      return `${Math.floor(secondsAgo / secondsIn.h)}h`;
    if (secondsAgo < secondsIn.w)
      return `${Math.floor(secondsAgo / secondsIn.d)}d`;
    return `${Math.floor(secondsAgo / secondsIn.w)}w`;
  })();

  if (suffix) {
    return `${relativeTimestamp} ago`;
  }

  return relativeTimestamp;
}

export function leftPad(n: number): string {
  const s = n.toString();
  if (s.length == 1) return "0" + s;
  return s;
}

export function simpleTime(date: Date, separator = ":"): string {
  return leftPad(date.getHours()) + separator + leftPad(date.getMinutes());
}
