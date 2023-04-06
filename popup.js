const checkbox = document.getElementById("focus-mode");

checkbox.addEventListener("change", () => {
  chrome.runtime.sendMessage({
    command: "toggleFocusMode",
    isFocusMode: checkbox.checked,
  });
});

// Load the current state of focus mode from the background script
chrome.runtime.sendMessage({ command: "getState" }, (state) => {
  checkbox.checked = state.isFocusMode;
});
