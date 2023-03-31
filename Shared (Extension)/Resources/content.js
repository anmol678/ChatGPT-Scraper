
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getText') {
    console.log(document.body.innerText)
  }
});
