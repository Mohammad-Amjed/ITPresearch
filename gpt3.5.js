// const { Configuration, OpenAIApi } = require('openai');

// const openai = new OpenAIApi(
//   new Configuration({ apiKey: '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' })
// );

// const topic = 'LEAN 3';
// const question = 'i want to solve this using LEAN 3 :  (P \\/ Q → R) ↔ ((P → R) ∧ (Q → R)). I will tell you the step in natural language and you will convert it to a LEAN tactic. JUST transtale the messages that I will provide to a ONE TACTIC ONLY  in LEAN 3 :: first step is to split the goal into two goals PROVIDE THE TACTIC WITHOUT EXTRA EXPLANATION  ';

// // Setting values for the prompt and message to be used in the GPT-3 and GPT-3.5-Turbo
// // const GPT3Prompt = ` ${question} in ${topic}`;
// const GPT35TurboMessage = [
//   { role: 'system', content: `You are a ${topic} developer.PROVIDE ONE TACTIC ONLY WITHOUT ANY EXTRA TEXT ` },

//   {
//     role: 'assistant',
//     content: "LEAN 3 tactics.",
//   },
//   { role: 'user', content: question },
// ];

// // Function to generate text using GPT-3 model
// // const GPT3 = async (prompt) => {
// //   const response = await openai.createCompletion({
// //     model: 'text-davinci-003',
// //     prompt,
// //     max_tokens: 500,
// //   });
// //   return response.data.choices[0].text;
// // };

// const GPT35Turbo = async (message) => {
//   const response = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: message,
//   });

//   return response.data.choices[0].message.content;
// };

// // // Log the generated text from the GPT-3 and GPT-3.5-Turbo models to the console
// // GPT3(GPT3Prompt).then((result) => {
// //   console.log('### I\'m GPT-3. ####', result);
// // });

// GPT35Turbo(GPT35TurboMessage).then((result) => {
//   console.log('### I\'m GPT-3.5-TURBO. ####', result);
// });

const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(
  new Configuration({ apiKey: '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' })
);

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
  console.log('### I\'m GPT-3.5-TURBO. ####', result);
});
