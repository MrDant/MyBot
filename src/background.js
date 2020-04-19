global.browser = require("webextension-polyfill");

import * as filter from "./asset/lib/filter";

function watchMessages() {
  chrome.runtime.onMessage.addListener(async (request, sender) => {
    if (request.type && request.type == "SIGN_CONNECT") {
      sendActions(sender.tab.id, sender.url);
    }
  });
}

function sendActions(tab, url) {
  const callback = (data) => {
    chrome.tabs.sendMessage(tab, data);
  };
  getActions(url, callback);
}

function getActions(url, callback) {
  chrome.storage.sync.get((data) => {
    if (Object.keys(data).length > 0) {
      const timelines = filter.timelines(data, url);
      if (timelines.length > 0) {
        callback(filter.actions(timelines));
      }
    }
  });
}

chrome.runtime.onInstalled.addListener(function() {
  watchMessages();
});
