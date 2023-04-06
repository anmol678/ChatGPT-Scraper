
class GPTService {
    constructor(apiKey) {
      this.apiKey = apiKey;
    }

    async summarizeText(text, maxTokens = 300) {
      const requestBodyURL = 'https://api.openai.com/v1/completions';
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      });

      const body = JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': `Please summarize the following text in ${maxTokens} words or less:\n\n${text}\n`,
        'max_tokens': maxTokens,
        'temperature': 0,
      });

     const response = await fetch(requestBodyURL, {
       method: 'POST',
       headers: headers,
       body: body,
     });
        
     const data = await response.json();
     console.log(data)
     const summary = data.choices && data.choices.length > 0 ? data.choices[0].text.trim() : '';

     return summary;
    }
  }

  export default GPTService;
