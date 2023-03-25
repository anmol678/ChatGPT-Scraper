
let chatData = [];
let currentTitleElementIndex = 0;

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'getCount') {
      sendResponse(currentTitleElementIndex);
  } else if (message.action === 'storeChatData') {
      
    const { id, messages, name } = message.chat;
    try {
      const mkMessages = messages.map(({ role, content: c }) => ({ role, content: convertHtmlToMarkdown(c) }) );
      chatData.push({ id, messages: mkMessages, name });
    } catch (err) {
      console.log(err);
    }
    
    currentTitleElementIndex++;
    const tab = await browser.tabs.query({ active: true, currentWindow: true });
    browser.tabs.sendMessage(tab[0].id, { action: 'scrape', count: currentTitleElementIndex });
  } else if (message.action === 'processCompleted') {
    const tab = await browser.tabs.query({ active: true, currentWindow: true });
    browser.tabs.sendMessage(tab[0].id, { action: 'saveJSON', data: chatData.reverse() });
    chatData = []; // Reset chat data after saving the file
    currentTitleElementIndex = 0;
  }
});

const turndownService = new TurndownService();

function convertHtmlToMarkdown(html) {
  return turndownService.turndown(`${html}`);
}


