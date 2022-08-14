// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  document.querySelector('video').autoplay=true
  document.querySelector('video').play()
  document.querySelector('video').playbackRate=10

  document.querySelector('video').addEventListener("ended", () => {
    let currentEle = document.getElementsByClassName("resource-item resource-item-train")
    for (let i = 0; i < currentEle.length; i ++) {
      let isEnded = currentEle[i].getElementsByClassName("index-module_progress2_1v4wk").length
      if (isEnded == 0) {
        currentEle[i].click()
        break;
      }
    }

    setTimeout(() => {
      setPageBackgroundColor()
    }, 1000)
  })
}
