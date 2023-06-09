import GPTService from './gptService.js';

const apiKey = process.env.OPENAI_API_KEY;
const gptService = new GPTService(apiKey);

let chatData = [];
let currentTitleElementIndex = 0;

// browser.tabs.onActivated.addListener(handleTabActivated);

async function handleTabActivated(url) {
  return (
    url.includes('chat.openai.com') ? 'GPT'
    : url.includes('twitter.com') ? 'Twitter'
    : 'default'
  );
}

browser.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
  handleTabActivated(tab.url);
});

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'getCount') {
      sendResponse(currentTitleElementIndex);
      return true;
  } else if (message.action === 'storeChatData') {

    const { id, messages, name, model } = message.chat;
    try {
      const mkMessages = messages.map(({ role, content: c }) => ({ role, content: convertHtmlToMarkdown(c) }));
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
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const ui = await handleTabActivated(tab.url);
    sendResponse(ui)
    return true;
  } else if (message.action === 'summarizeWebpageContent') {
      try {
        const summary = await gptService.summarizeText(message.mainContent);
        console.log('Summary:', summary);
//        sendResponse({ summary });
      } catch (error) {
//        sendResponse({ error });
        console.error('Error generating summary:', error);
      }

//      return true;
  }

});

const turndownService = new TurndownService();

function convertHtmlToMarkdown(html) {
  return turndownService.turndown(`${html}`);
}
