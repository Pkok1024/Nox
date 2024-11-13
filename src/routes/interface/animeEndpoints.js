/** @format */

const createAnimeEndpoint = (parameters, description) => {
  return {
    get: {
      tags: ['Anime'],
      parameters,
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
        default: {
          description: 'Unexpected error',
          content: {
            'application/json': {
              example: {
                status: 'Error',
                code: 500,
                message: 'Internal Server Error',
              },
            },
          },
        },
      },
    },
  };
};

const animeEndpoints = {
  '/anime/doujin-latest': createAnimeEndpoint(
    [],
    'Successfully retrieved response'
  ),
  '/anime/doujin-search': createAnimeEndpoint(
    [
      {
        name: 'q',
        in: 'query',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'URL for doujin search',
      },
    ],
    'Successful response'
  ),
  '/anime/doujin-ch': createAnimeEndpoint(
    [
      {
        name: 'url',
        in: 'query',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'URL for doujin search',
      },
    ],
    'Successful response'
  ),
  '/anime/doujin-img': createAnimeEndpoint(
    [
      {
        name: 'url',
        in: 'query',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'URL doujin get image',
      },
    ],
    'Successful response'
  ),
  '/anime/hentai': createAnimeEndpoint([], 'Successfully response.'),
  '/anime/whatanime': createAnimeEndpoint(
    [
      {
        name: 'url',
        in: 'query',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'URL of the image or video frame',
      },
    ],
    'Successful response'
  ),
  '/anime/nhentai-search': createAnimeEndpoint(
    [
      {
        name: 'q',
        in: 'query',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'q of the image or video frame',
      },
    ],
    'Successful response'
  ),
};

export default animeEndpoints;
