async function main() {
    // Get the DOM elements
    const number = document.getElementById("number");
    const slider = document.getElementById("speed");
  
    // Not convinced that this is the best way to do this.
    const tabId = (
      await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    )[0].id;
  
    // Get the most recent speed
    const rate = (await chrome.storage.local.get("upr"))["upr"] || 1;
  
    // Update UI
    number.textContent = rate.toString();
    slider.value = rate;
  
    // Add Listener
    slider.addEventListener("input", async (e) => {
      const value = slider.value;
  
      chrome.storage.local.set({ upr: value });
  
      number.textContent = value.toString();
      await chrome.scripting.executeScript({
        target: { tabId },
        func: function (value) {
          document.querySelector("video").playbackRate = value;
        },
        args: [value],
      });
    });
  }
  
  main();