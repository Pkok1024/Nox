/** @format */

const pinterestEndpoints = {
  '/pinterest/getBoard': {
    get: {
      tags: ['Pinterest'],
      description: 'Retrieve data for a specific board',
      parameters: [
        {
          in: 'query',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The ID of the board',
        },
        {
          in: 'query',
          name: 'slashurl',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The slash URL of the board',
        },
        {
          in: 'query',
          name: 'bookmark',
          required: false,
          schema: {
            type: 'string',
          },
          description: 'Bookmark parameter for pagination',
        },
      ],
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SuccessResponse',
              },
            },
          },
        },
      },
    },
  },
  '/pinterest/searchBoards': {
    get: {
      tags: ['Pinterest'],
      description: 'Search for boards based on query',
      parameters: [
        {
          in: 'query',
          name: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The query string for searching boards',
        },
        {
          in: 'query',
          name: 'bookmark',
          required: false,
          schema: {
            type: 'string',
          },
          description: 'Bookmark parameter for pagination',
        },
      ],
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SuccessResponse',
              },
            },
          },
        },
      },
    },
  },
  '/pinterest/searchPins': {
    get: {
      tags: ['Pinterest'],
      description: 'Search for pins based on query',
      parameters: [
        {
          in: 'query',
          name: 'query',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The query string for searching pins',
        },
        {
          in: 'query',
          name: 'bookmark',
          required: false,
          schema: {
            type: 'string',
          },
          description: 'Bookmark parameter for pagination',
        },
      ],
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SuccessResponse',
              },
            },
          },
        },
      },
    },
  },
  '/pinterest/suggestions': {
    get: {
      tags: ['Pinterest'],
      description: 'Get suggestions for related pins based on pin ID',
      parameters: [
        {
          in: 'query',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The ID of the pin',
        },
        {
          in: 'query',
          name: 'bookmark',
          required: false,
          schema: {
            type: 'string',
          },
          description: 'Bookmark parameter for pagination',
        },
      ],
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SuccessResponse',
              },
            },
          },
        },
      },
    },
  },
};

export default pinterestEndpoints;
