/** @format */

const commonResponses = {
  200: {
    $ref: '#/components/schemas/SuccessResponse',
  },
};

const shortUrlEndpoint = {
  '/shortUrl/{service}': {
    get: {
      tags: ['Tools'],
      parameters: [
        {
          name: 'service',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            enum: ['tiny', 'vurl', 'vgd', 'shrt'],
            default: 'isgd',
          },
          description: 'The URL shortening service to use',
        },
        {
          name: 'url',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The URL to be shortened',
        },
      ],
      responses: commonResponses,
    },
  },
};

export default shortUrlEndpoint;
