/** @format */

// /** @format */

// import axios from 'axios';
// /**
//  * @function blackbox - sends a prompt to blackbox and returns the response
//  * @param {String} prompt - prompt to be sent to blackbox
//  * @param {Boolean} web_search - set to true if you want to use web search. By default it is set to false.
//  * @returns
//  */
// const blackbox = async (prompt, web_search = false) => {
//   const body = {
//     messages: [
//       {
//         content: prompt,
//         role: 'user',
//       },
//     ],
//     previewToken: null,
//     codeModelMode: true,
//     agentMode: {},
//     trendingAgentMode: {},
//     isMicMode: false,
//     isChromeExt: false,
//     githubToken: null,
//     webSearchMode: web_search,
//   };

//   const url = 'https://www.blackbox.ai/api/chat';

//   const response = await axios.post(url, body);

//   return response.data;
// };

// export default blackbox;

/** @format */

import axios from 'axios';

/**
 * @function blackbox - sends a prompt to blackbox and returns the response
 * @param {String} prompt - prompt to be sent to blackbox
 * @param {Boolean} web_search - set to true if you want to use web search. By default it is set to false.
 * @returns {Promise<Object>} - returns the response data from the blackbox API
 */
const blackbox = async (prompt, web_search = false) => {
  // Validasi input
  if (!prompt || typeof prompt !== 'string') {
    console.error('Invalid prompt: Prompt must be a non-empty string.');
    throw new Error('Prompt must be a non-empty string.');
  }

  
  const body = {
    messages: [
      {
        content: prompt,
        role: 'user',
      },
    ],
    previewToken: null,
    userId: null,
    codeModelMode: true,
    agentMode: {},
    trendingAgentMode: {},
    isMicMode: false,
    userSystemPrompt: null,
    maxTokens: 1024,
    playgroundTopP: 0.9,
    playgroundTemperature: 0.79,
    isChromeExt: false,
    githubToken: '',
    clickedAnswer2: false,
    clickedAnswer3: false,
    clickedForceWebSearch: false,
    visitFromDelta: false,
    mobileClient: false,
    userSelectedModel: null,
  };

  const url = 'https://www.blackbox.ai/api/chat';

  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    // Log error response
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error response from server:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    throw error; // Rethrow error after logging
  }
};

export default blackbox;
