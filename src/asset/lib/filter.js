export function timelines(timelines, url) {
  timelines = Object.entries(timelines).filter(
    (entry) => entry[0].match(url) && entry[1].activated
  );
  timelines = timelines.map((t) => t[1]);

  return timelines;
}

export function actions(timelines) {
  return Object.keys(timelines)
    .map((key) => timelines[key].actions)
    .flat();
}
