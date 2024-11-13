/** @format */

const swaggerDoc = {
  '/myanimelist/search': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Search for anime or manga on MyAnimeList',
      parameters: [
        {
          name: 'querystring',
          in: 'query',
          description: 'The search query',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'type',
          in: 'query',
          description: 'The type of search (anime or manga)',
          required: false,
          schema: {
            type: 'string',
            enum: ['anime', 'manga'],
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful response',
        },
      },
    },
  },
  '/myanimelist/season': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Get anime data by year, season, and type',
      parameters: [
        {
          name: 'year',
          in: 'query',
          required: true,
          description: 'The year',
          schema: {
            type: 'integer',
          },
        },
        {
          name: 'season',
          in: 'query',
          required: true,
          description: 'The season',
          schema: {
            type: 'string',
            enum: ['spring', 'summer', 'fall', 'winter'],
          },
        },
        {
          name: 'type',
          in: 'query',
          required: false,
          description: 'The type',
          schema: {
            type: 'string',
            enum: [
              'TV',
              'TVNew',
              'TVCon',
              'ONAs',
              'OVAs',
              'Specials',
              'Movies',
            ],
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
              },
            },
          },
        },
      },
    },
  },
  '/myanimelist/watchlist': {
    get: {
      tags: ['MyAnimeList'],
      summary: "Get user's watchlist",
      parameters: [
        {
          name: 'username',
          in: 'query',
          description: 'Username of the user',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'after',
          in: 'query',
          description: 'Start index for pagination',
          required: false,
          schema: {
            type: 'integer',
            enum: [0, 50, 100, 150, 200, 250],
          },
        },
        {
          name: 'type',
          in: 'query',
          description: 'Type of media (anime or manga)',
          required: false,
          schema: {
            type: 'string',
            enum: ['anime', 'manga'],
          },
        },
        {
          name: 'status',
          in: 'query',
          description: "Status in the user's watchlist",
          required: false,
          schema: {
            type: 'integer',
            enum: [0, 1, 2, 3, 4, 5, 6, 7],
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
      },
    },
  },
  '/myanimelist/news': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Get anime news from MyAnimeList',
      parameters: [
        {
          name: 'nbNews',
          in: 'query',
          description: 'Number of news articles to retrieve',
          required: false,
          schema: {
            type: 'integer',
            enum: [10, 20, 30, 40, 50],
          },
        },
      ],
      responses: {
        200: {
          description: 'List of anime news articles',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                    },
                    link: {
                      type: 'string',
                    },
                    date: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/myanimelist/anime-info': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Mendapatkan informasi anime berdasarkan nama',
      parameters: [
        {
          name: 'name',
          in: 'query',
          description: 'Nama anime yang ingin dicari',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'getBestMatch',
          in: 'query',
          description:
            'Apakah ingin menggunakan match-sorter untuk menemukan hasil terbaik',
          required: true,
          schema: {
            type: 'boolean',
            enum: [true, false],
          },
        },
        {
          name: 'type',
          in: 'query',
          description: 'Tipe, bisa berupa anime atau manga',
          required: true,
          schema: {
            type: 'string',
            enum: ['anime', 'manga'],
          },
        },
      ],
      responses: {
        200: {
          description: 'Sukses mendapatkan informasi anime',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
      },
    },
  },
  '/myanimelist/anime-info': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Get anime information from URL',
      parameters: [
        {
          in: 'query',
          name: 'url',
          required: true,
          schema: {
            type: 'string',
            format: 'url',
          },
          description: 'URL of the anime on MyAnimeList.net',
        },
      ],
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                  },
                  episodes: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/myanimelist/episodes': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Get episodes list by anime name and/or id',
      parameters: [
        {
          in: 'query',
          name: 'animeName',
          required: true,
          schema: {
            type: 'string',
            description: 'The name of the anime',
          },
        },
        {
          in: 'query',
          name: 'animeId',
          required: false,
          schema: {
            type: 'number',
            description: 'The unique identifier of the anime',
          },
        },
      ],
      responses: {
        200: {
          description: 'Episodes list retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {},
              },
            },
          },
        },
      },
    },
  },
  '/myanimelist/reviews': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Get list of anime reviews',
      parameters: [
        {
          in: 'query',
          name: 'name',
          required: true,
          description: 'The name of the anime',
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'id',
          description: 'The unique identifier of the anime',
          schema: {
            type: 'number',
          },
        },
        {
          in: 'query',
          name: 'limit',
          description: 'The maximum number of reviews to fetch',
          schema: {
            type: 'number',
          },
        },
        {
          in: 'query',
          name: 'skip',
          description: 'The number of reviews to skip',
          schema: {
            type: 'number',
          },
        },
      ],
      responses: {
        200: {
          description: 'List of anime reviews',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {},
              },
            },
          },
        },
      },
    },
  },
  '/myanimelist/recommendations': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Get anime recommendations',
      parameters: [
        {
          in: 'query',
          name: 'name',
          required: true,
          description: 'The name of the anime',
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'id',
          required: false,
          description: 'The unique identifier of the anime',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                type: 'object',
              },
            },
          },
        },
      },
    },
  },
  '/myanimelist/stats': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Get anime stats',
      parameters: [
        {
          in: 'query',
          name: 'name',
          required: true,
          description: 'The name of the anime',
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'id',
          required: false,
          description: 'The unique identifier of the anime',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                type: 'object',
              },
            },
          },
        },
      },
    },
  },
  '/myanimelist/pictures': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Get anime picture',
      parameters: [
        {
          in: 'query',
          name: 'name',
          required: true,
          description: 'The name of the anime',
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'id',
          required: false,
          description: 'The unique identifier of the anime',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                type: 'object',
              },
            },
          },
        },
      },
    },
  },
  '/myanimelist/user': {
    get: {
      tags: ['MyAnimeList'],
      summary: 'Get anime picture',
      parameters: [
        {
          in: 'query',
          name: 'name',
          required: true,
          description: 'The name of the anime',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                type: 'object',
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDoc;
