
browser.runtime.sendMessage({ action: 'requestUIUpdate' }, updatePopupUI);

document.getElementById('save-chat').addEventListener('click', async () => {
    const tab = await browser.tabs.query({ active: true, currentWindow: true });
    browser.tabs.sendMessage(tab[0].id, { action: 'scrape' });
});

document.getElementById('save-tweet').addEventListener('click', async () => {
  const tab = await browser.tabs.query({ active: true, currentWindow: true });
  browser.tabs.sendMessage(tab[0].id, { action: 'scrape-tweet' });
});

document.getElementById('summarize').addEventListener('click', async () => {
  const tab = await browser.tabs.query({ active: true, currentWindow: true });
  browser.tabs.sendMessage(tab[0].id, { action: 'getText' });
});

function updatePopupUI(ui) {
  if (ui === 'GPT') {
    document.getElementById('GPT').style.display = 'block';
    document.getElementById('Twitter').style.display = 'none';
    document.getElementById('default').style.display = 'none';
  } else if (ui === 'Twitter') {
    document.getElementById('GPT').style.display = 'none';
    document.getElementById('Twitter').style.display = 'block';
    document.getElementById('default').style.display = 'none';
  }
  else {
    document.getElementById('GPT').style.display = 'none';
    document.getElementById('Twitter').style.display = 'none';
    document.getElementById('default').style.display = 'block';
  }
}
