const { Configuration, OpenAIApi } = require('openai');
let leanCode;
const openai = new OpenAIApi(
  new Configuration({ apiKey: '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' })
);

// GPT function: 
const generateGPT35TurboResponse = async (question) => {
  const topic = 'LEAN 3';
  const GPT35TurboMessage = [
    { role: 'system', content: `You are a ${topic} developer.PROVIDE ONE TACTIC ONLY WITHOUT ANY EXTRA TEXT ` },
    { role: 'assistant', content: "LEAN 3 tactics." },
    { role: 'user', content: question },
  ];

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: GPT35TurboMessage,
  });

  const result = response.data.choices[0].message.content;
  return result;
};

// Example usage
const question = 'i want to solve this using LEAN 3 :  (P \\/ Q → R) ↔ ((P → R) ∧ (Q → R)). I will tell you the step in natural language and you will convert it to a LEAN tactic. JUST transtale the messages that I will provide to a ONE TACTIC ONLY  in LEAN 3 :: first step is to split the goal into two goals PROVIDE THE TACTIC WITHOUT EXTRA EXPLANATION  ';

generateGPT35TurboResponse(question).then((result) => {
   leanCode =  result;
   // Call the function to control Chrome from the browser
  controlChrome();
}).catch((error) => {
  console.error('Error:', error);
});
// Function to control Chrome from the browser
const controlChrome = async () => {
  // Import the required dependencies
  const CDP = require('chrome-remote-interface');

  const convertLeanToHttp = (leanCode) => {
    const encodedCode = encodeURIComponent(leanCode);
    const baseUrl = 'http://localhost:8080/#code=';
    const fullHttpUrl = baseUrl + encodedCode;
    return fullHttpUrl;
  };



  const fullEncodedCode = convertLeanToHttp(leanCode);

  try {
    // Connect to a running instance of Chrome
    const client = await CDP();

    // Enable the necessary domains
    await Promise.all([client.Page.enable(), client.Runtime.enable()]);

    // Evaluate JavaScript code to change the URL and force a reload
    await client.Runtime.evaluate({
      expression: `window.location.href = '${fullEncodedCode}'; location.reload(true);`,
    });

    // Close the client connection
    await client.close();
  } catch (err) {
    console.error('Error:', err);
  }
};


