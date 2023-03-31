
let chatData = [];
let currentTitleElementIndex = 0;

browser.tabs.onActivated.addListener(handleTabActivated);

async function handleTabActivated(tabID) {
  const tab = await browser.tabs.get(tabID);
  const url = tab.url;
  return url.includes('chat.openai.com') ? 'GPT': 'default';
}

browser.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
  handleTabActivated(tab.id);
});

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'getCount') {
      sendResponse(currentTitleElementIndex);
      return true;
  } else if (message.action === 'storeChatData') {
      
    const { id, messages, name, model } = message.chat;
    try {
      const mkMessages = messages.map(({ role, content: c }) => ({ role, content: convertHtmlToMarkdown(c) }) );
      chatData.push({ id, messages: mkMessages, name, model });
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
  } else if (message.action === 'requestUIUpdate') {
    const tab = await browser.tabs.query({ active: true, currentWindow: true });
    const ui = await handleTabActivated(tab[0].id);
    sendResponse(ui)
    return true;
  } else if (message.action === 'summarizeWebpageContent') {
    console.log(message.mainContent);
  }

});

const turndownService = new TurndownService();

function convertHtmlToMarkdown(html) {
  return turndownService.turndown(`${html}`);
}


