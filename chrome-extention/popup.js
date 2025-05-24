document.getElementById("btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => JSON.stringify(localStorage)
  });
  document.getElementById("out").textContent = result;
});
