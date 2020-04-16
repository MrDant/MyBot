global.browser = require("webextension-polyfill");

chrome.storage.sync.get(timelines => {
  timelines = timelinesFilter(timelines);
  timelines.forEach(t => {
    t.actions.forEach(action => {
      doAction(action);
    });
  });
});

function doAction(action) {
  let node = document.querySelector(action.selector);
  if (!node) {
    console.log("component with selector : " + action.selector + " not found");
  } else {
    eval(action.type)(node, action.text);
  }
}

function _click(node) {
  node.click();
}

function _check(node) {
  node.checked = !node.checked;
}

function _hidden(node) {
  node.hidden = true;
}

function _delete(node) {
  node.remove();
}

function _text(node, text) {
  node.value = text;
}

function _password(node, text) {
  node.value = text;
}

function timelinesFilter(timelines) {
  let url = window.location.href;
  timelines = Object.entries(timelines).filter(
    entry => entry[0].match(url) && entry[1].activated
  );
  timelines = timelines.map(t => t[1]);
  return timelines;
}
