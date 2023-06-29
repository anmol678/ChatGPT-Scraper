import { Readability } from '@mozilla/readability';

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getText') {
    browser.runtime.sendMessage({ action: 'summarizeWebpageContent', mainContent: t });
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
  try {
    const documentClone = document.cloneNode(true);
    const readability = new Readability(documentClone);
    const article = readability.parse();
    return article ? article.textContent.trim() : null;
  } catch (error) {
    console.error('Error', error);
  }
}

function getMainContent() {
  // let text = getSchemaOrgArticleBody();
  // if (!text) {
  //   text = getArticleTagContent();
  // }
  // if (!text) {
  const text = getReadableText();
  // }

  console.log(text)

  return text;
}

if (!window.location.href.includes('twitter.com')) {
  const t = getMainContent()
}


