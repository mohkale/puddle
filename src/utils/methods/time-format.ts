import moment from 'moment';

const formatInt = (int: number): string => {
  if (int < 10) {
    return `0${int}`;
  }

  return `${int}`;
};

// source: [[https://github.com/moment/moment/issues/463#issuecomment-552498641][#463]].
export const formatDuration = (time: number): string => {
  const duration = moment.duration(time)
  const seconds = duration.seconds(),
        minutes = duration.minutes(),
        hours = duration.hours();

  if (hours > 0) {
    return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
  }

  if (minutes > 0) {
    return `${formatInt(minutes)}:${formatInt(seconds)}`;
  }

  return `00:${formatInt(seconds)}`;
};

// https://github.com/tremc/tremc/blob/master/tremc#L3362
export function timeFormat(duration: number): string {
  return formatDuration(duration * 1000)
}
