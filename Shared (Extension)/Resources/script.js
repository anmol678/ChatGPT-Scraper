
document.getElementById('save-chat').addEventListener('click', async () => {
    const tab = await browser.tabs.query({ active: true, currentWindow: true });
    browser.tabs.sendMessage(tab[0].id, { action: 'scrape' });
});
