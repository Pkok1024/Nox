/** @format */

const endpoints = [
  {
    name: 'toanime',
    param: 'url',
  },
];

const sfwEndpoints = {};

endpoints.forEach(endpoint => {
  sfwEndpoints[`/sfw/${endpoint.name}`] = {
    get: {
      tags: ['Maker'],
      parameters: [
        {
          name: endpoint.param,
          in: 'query',
          required: true,
          description: `Parameter for ${endpoint.name}.`,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Berhasil mengambil informasi.',
          content: {
            'image/*': {
              example: 'https://example.com/image.jpg',
            },
          },
        },
      },
    },
  };
});

export default sfwEndpoints;
