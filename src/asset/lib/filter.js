export function timelines(timelines) {
  let url = window.location.href;
  timelines = Object.entries(timelines).filter(
    entry => entry[0].match(url) && entry[1].activated
  );
  timelines = timelines.map(t => t[1]);
  return timelines;
}
