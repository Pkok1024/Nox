/** @format */

const uploadEndpoints = {
  '/upload/cdn': {
    post: {
      tags: ['Uploader'],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                  required: true,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'File successfully uploaded.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                  },
                  code: {
                    type: 'integer',
                  },
                  author: {
                    type: 'string',
                  },
                  data: {
                    type: 'object',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default uploadEndpoints;
