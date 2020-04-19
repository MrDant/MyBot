global.browser = require("webextension-polyfill");
import * as actionMetods from "./asset/lib/actions.js";
import * as filter from "./asset/lib/filter.js";

chrome.runtime.onMessage.addListener(async (request) => {
  doActions(request);
});

function doActions(actions) {
  actions.forEach((action) => {
    const node = document.querySelector(action.selector);
    if (node) {
      actionMetods[action.type](node, action.text);
    } else {
      console.warn("node :", action.selector, "not found");
    }
  });
}
