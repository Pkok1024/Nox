/** @format */

const downloaderEndpoints = [
  'tiktok',
  'facebook',
  'xnxx',
  'mediafire',
  'instagram',
  'igstory',
  'igstory2',
  'igtv',
  'gdrive',
  'twitter',
  'sfile',
  'capcut',
  'spotify',
  'apkmirror',
  'dvadownloader',
  'terabox',
  'ttslide',
];

const generateEndpoint = endpoint => ({
  [`/downloader/${endpoint}`]: {
    get: {
      tags: ['Downloader'],
      parameters: [
        {
          in: 'query',
          name: 'url',
          required: true,
          schema: {
            type: 'string',
          },
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
});

const downloaderEndpointsObject = Object.assign(
  {},
  ...downloaderEndpoints.map(endpoint => generateEndpoint(endpoint))
);

export default downloaderEndpointsObject;
