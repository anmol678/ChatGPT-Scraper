
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scrape') {
    processChat(message.count ?? 0)
      .then(() => {
        
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (message.action === 'saveJSON') {
      downloadJSON(message.data);
  }
});

async function processChat(index) {
    
    const saveChat = async () => {
        return new Promise(async (resolve) => {
            const id = window.location.href.match(/\/chat\/([\w-]+)$/)[1];

            const model = document.querySelector('div.flex.w-full.items-center')?.innerHTML.split(' ')[1]

            // Collect the chat messages
            const messages = Array.from(
                document.querySelectorAll(
                  ".group div:first-child .flex-grow > div:first-child"
                )
            ).map((message, index) => ({
                role: index % 2 === 0 ? "user" : "assistant",
                content: message.innerHTML.trim()
            }));

            console.debug(
                `Collected ${messages.length} messages from chat ${id}`
            );

            // Create the chat object
            const chat = { id, messages, model };
            resolve(chat);
        });
    }
    
  const titleElements = document.querySelectorAll('div.flex-1.text-ellipsis.max-h-5.overflow-hidden.break-all.relative');
  
    if (index >= titleElements.length) {
        const showMoreButton = document.querySelector("button.btn-dark");
        if (showMoreButton) {
            showMoreButton.click();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            processChat(index);
            return;
        }
       
        console.log('Finished processing all chats');
        browser.runtime.sendMessage({ action: 'processCompleted' });
        return;
    }

  const titleElement = titleElements[index];
    
    titleElement.addEventListener('click', async () => {
      // Wait for the new page to load
      setTimeout(async () => {
        const chat = await saveChat();
        chat.name = titleElement.textContent.trim();
        console.debug(`Chat name: ${chat.name}`);
        browser.runtime.sendMessage({ action: 'storeChatData', chat });
      }, 3000);
    });
    
    
  titleElement.click();

}

function downloadJSON(data) {
  const jsonString = JSON.stringify(data)
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chat_data.json';
  a.click();
  URL.revokeObjectURL(url);
}

