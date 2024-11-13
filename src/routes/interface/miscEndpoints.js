/** @format */

const miscEndpoints = {
  '/misc/runtime': {
    get: {
      tags: ['Misc'],
      responses: {
        200: {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  uptime: {
                    type: 'number',
                    description: 'Application uptime in seconds',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/misc/clock': {
    get: {
      tags: ['Misc'],
      responses: {
        200: {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  wib: {
                    type: 'string',
                    description:
                      'Current time in Waktu Indonesia Barat timezone',
                  },
                  wita: {
                    type: 'string',
                    description:
                      'Current time in Waktu Indonesia Tengah timezone',
                  },
                  wit: {
                    type: 'string',
                    description:
                      'Current time in Waktu Indonesia Timur timezone',
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

export default miscEndpoints;
