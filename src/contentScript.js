global.browser = require("webextension-polyfill");
import * as actionMetods from "./asset/lib/actions.js";
import * as filter from "./asset/lib/filter.js";

chrome.storage.sync.get(timelines => {
  timelines = filter.timelines(timelines);
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
    actionMetods[action.type](node, action.text);
  }
}
