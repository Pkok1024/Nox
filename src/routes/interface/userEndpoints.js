/** @format */

const swaggerDocument = {
  '/auth/register': {
    get: {
      tags: ['User'],
      parameters: [
        {
          in: 'query',
          name: 'email',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'password',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'username',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'apiKey',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'User registered successfully',
        },
        400: {
          description: 'Bad Request',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
  '/auth/profile': {
    get: {
      tags: ['User'],
      parameters: [
        {
          in: 'query',
          name: 'email',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'password',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'User profile returned',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  username: {
                    type: 'string',
                  },
                  limit: {
                    type: 'integer',
                  },
                  status: {
                    type: 'string',
                  },
                  apiKey: {
                    type: 'string',
                  },
                  isVerified: {
                    type: 'boolean',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad Request',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
  '/cekey': {
    get: {
      tags: ['User'],
      parameters: [
        {
          in: 'query',
          name: 'key',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'API key checked',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  limit: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad Request',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
};

export default swaggerDocument;
