export function formatReadingTime(minutes) {
  return `${minutes} min read`;
}

export function unSlashIt(str) {
  return str.replace(/^(\/*)|(\/*)$/g, '');
}

export function leadingSlashIt(str) {
  return '/' + unSlashIt(str);
}

export function trailingSlashIt(str) {
  return unSlashIt(str) + '/';
}

export function doubleSlashIt(str) {
  return '/' + unSlashIt(str) + '/';
}
