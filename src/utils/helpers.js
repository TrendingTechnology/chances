export function formatReadingTime(minutes) {
  return `${minutes} min read`;
}

export function unslashit(str) {
  return str.replace(/^(\/*)|(\/*)$/g, '');
}

export function leadingSlashit(str) {
  return '/' + unslashit(str);
}

export function trailingSlashit(str) {
  return unslashit(str) + '/';
}

export function doubleSlashit(str) {
  return '/' + unslashit(str) + '/';
}
