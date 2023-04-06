let isFocusMode = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "getState") {
    sendResponse({ isFocusMode });
  }

  if (request.command === "toggleFocusMode") {
    isFocusMode = request.isFocusMode;
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  if (isFocusMode) {
    chrome.tabs.remove(tab.id, () => {
      chrome.notifications.create(tab.id, {
        type: "basic",
        title: "Focused Tab",
        message:
          "Focus mode is currently on. Please turn it off to create new tabs.",
        iconUrl: "icon.png",
      });
    });
  }
});

chrome.windows.onCreated.addListener((window) => {
  if (isFocusMode) {
    chrome.windows.remove(window.id, () => {
      chrome.notifications.create(tab.id, {
        type: "basic",
        title: "Focused Tab",
        message:
          "Focus mode is currently on. Please turn it off to create new windows.",
        iconUrl: "icon.png",
      });
    });
  }
});
