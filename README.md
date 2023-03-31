## ChatGPT-Scraper
A Safari Web Extension to export all conversations from ChatGPT as a JSON file

### Upcoming Features

1. **Website specific functionality:** different actions based on the webpage.
2. **Selective Chat Export:** Choose specific chats to export, giving you more control.
3. Support for summarizing and chatting about content on the webpage.
4. Support for interacting with YouTube videos.
5. Select specific text on webpage to summarize or chat about.

### Features

1. Scrape ChatGPT to export all conersations as JSON file.

### Installation

1. Clone or download the repository to your local machine.
2. Ensure that you have Xcode installed on your Mac. If you don't have Xcode installed, you can download it from the [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835).
3. Open the Chat.xcodeproj file in Xcode.
4. In Xcode, select a development team for code signing (if prompted).
5. Build and run the project by pressing Cmd + R or by clicking the "Run" button in the Xcode toolbar. This will launch Safari with the extension installed.
6. In Safari, navigate to Preferences > Extensions and enable the Chat extension.

### Usage

1. Open [ChatGPT](https://chat.openai.com).
2. Click the extension's toolbar button to open the popup window.
3. Click the "Save chat" button to start the scraping process. The extension will automatically navigate to all conversations, gather the chat data, and save it as a JSON file in your default downloads directory.
4. You can import this file to transfer all your conversations to a customizable GPT interface like [ChatbotUI](https://www.chatbotui.com).

### Notes

This extension is designed to work with the latest Safari Web Extension framework and is built using Xcode. Make sure to update your Xcode and Safari versions to the latest releases for optimal compatibility.
