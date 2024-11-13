/** @format */

const nsfwEndpoints = {
  '/nsfw/{tag}': {
    get: {
      tags: ['Random'],
      parameters: [
        {
          name: 'tag',
          in: 'path',
          description: 'The tag to search for',
          required: true,
          schema: {
            type: 'string',
            enum: [
              'maid',
              'waifu',
              'marin-kitagawa',
              'mori-calliope',
              'raiden-shogun',
              'oppai',
              'selfies',
              'uniform',
              'kamisato-ayaka',
              'ass',
              'hentai',
              'milf',
              'oral',
              'paizuri',
              'ecchi',
              'ero',
            ],
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'image/*': {},
          },
        },
      },
    },
  },
};

export default nsfwEndpoints;
