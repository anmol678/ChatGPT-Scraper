
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getText') {
    const mainContent = getMainContent();
    browser.runtime.sendMessage({ action: 'summarizeWebpageContent', mainContent });
  }
});

function getSchemaOrgArticleBody() {
  const articleElement = document.querySelector('[itemtype="https://schema.org/Article"] [itemprop="articleBody"]');
  return articleElement ? articleElement.textContent.trim() : null;
}

function getArticleTagContent() {
  const articleElement = document.querySelector('article');
  return articleElement ? articleElement.textContent.trim() : null;
}

function getReadableText() {
  const documentClone = document.cloneNode(true);
  const readability = new ReadabilityService(documentClone);
  const article = readability.parse();
  return article ? article.textContent.trim() : null;
}

function getMainContent() {
  // let text = getSchemaOrgArticleBody();
  // if (!text) {
  //   text = getArticleTagContent();
  // }
  // if (!text) {
    // text = getReadableText();
  // }
  return getReadableText();
}
