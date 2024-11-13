/** @format */

// Enum untuk karakter dan genre
const enums = {
  characters: [
    'akira',
    'elaina',
    'miku',
    'shota',
    'anna',
    'ikuyo',
    'neko',
    'takina',
    'asuna',
    'kaela',
    'rias',
    'waifu',
    'sakura',
    'kaguya',
    'ayanokouji',
    'yotsuba',
    'ayuzawa',
    'kaori',
    'sasuke',
    'yumeko',
    'bocchi',
    'kobo',
    'chisato',
    'kotori',
    'shinka',
    'cosplay',
    'loli',
    'shizuka',
  ],
  genres: [
    'office',
    'pantyhose',
    'dp',
    'cock-torture',
    'encasement',
    'maids',
    'high-heels',
    'college-girls',
    'lingerie',
    'dirty-talk',
    'feminization',
    'sexy-legs',
    'russian',
    'mature',
    'stockings',
    'jerkoff-instructions',
    'cfnm',
    'enema',
    'old-and-young',
    'plus-size',
    'glasses',
    'milf',
    'pov',
    'corset',
    'footfetish',
    'uniform',
    'footjob',
    'squirting',
    'anal',
    'nurses',
    'schoolgirls',
    'vintage-retro',
    'zettai-ryouiki',
    'zettai-pantsu',
    'fisting',
    'spandex',
    'crossdressing',
    'leather',
    'butts',
    'big-tits',
    'transformation',
    'strapon',
    'spitting',
    'deep-throat',
    'bisexual',
    'cheerleaders',
    'sex-toys',
    'granny',
    'close-up',
    'homemade',
    'rubber-latex',
    'trampling',
    'boots',
    'rough-sex',
    'lesbian',
    'reality-porn',
    'cuckold',
    'insertions',
    'public-sex',
    'femdom',
    'handjob',
    'babes',
    'shemale',
    'gyno',
    'amateur',
    'sex-machines',
    'group-sex',
    'hardcore',
    'facesitting',
    'panties',
    'medical',
    'teen',
    'pissing',
    'pussy-licking',
    'ass-worship',
    'lezdom',
    'hairy-pussy',
    'whipping',
    'masturbation',
    'blowjob',
    'asian',
    'redhead',
    'interracial',
    'big-cock',
    'wet-messy',
    'ball-busting',
    'tattoos-piercings',
    'ebony',
    'gloryhole',
    'skinny',
    'cumshots',
    'pregnant',
    'softcore',
    'jeans',
    'latin',
    'smothering',
    'upskirt',
    'bdsm',
    'bondage',
    'bbw',
    'humiliation',
    'titjob',
    'spanking',
    'pornstars',
    'nude-sports',
    'indian',
    'smoking',
    'voyeur',
    'cosplay',
    '3d',
    'ass-to-mouth',
    'massage',
    'anime-art',
  ],
  categories: [
    'waifu',
    'neko',
    'shinobu',
    'megumin',
    'bully',
    'cuddle',
    'cry',
    'hug',
    'awoo',
    'kiss',
    'lick',
    'pat',
    'smug',
    'bonk',
    'yeet',
    'blush',
    'smile',
    'wave',
    'highfive',
    'handhold',
    'nom',
    'bite',
    'glomp',
    'slap',
    'kill',
    'kick',
    'happy',
    'wink',
    'poke',
    'dance',
    'cringe',
  ],
};

// Fungsi untuk membuat parameter
function createParam(name, enumValues, description, required = true) {
  return {
    name,
    in: 'path',
    required,
    schema: {
      type: 'string',
      enum: enumValues,
    },
    description,
  };
}

// Fungsi untuk membuat endpoint SFW
function createSfwEndpoint() {
  return {
    get: {
      tags: ['Random'],
      parameters: [createParam('name', enums.characters, 'char name')],
      responses: {
        200: {
          content: {
            'image/*': {},
          },
        },
      },
    },
  };
}

// Fungsi untuk membuat endpoint BKP
function createBkpEndpoint() {
  return {
    get: {
      tags: ['Random'],
      parameters: [createParam('genre', enums.genres, 'genre name')],
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
  };
}

// Fungsi untuk membuat endpoint random
function createRandomEndpoint() {
  return {
    get: {
      tags: ['Random'],
      parameters: [
        createParam(
          'country',
          [
            'china',
            'indonesia',
            'japan',
            'korean',
            'vietnam',
            'random',
            'thailand',
            'malaysia',
            'potatogodzilla',
            'nude',
            'naughty',
            'jkt48',
            'saizneko',
            'belledelphine',
            'xiaopangju',
          ],
          'Country name'
        ),
      ],
      responses: {
        200: {
          content: {
            'image/png': {
              schema: {
                type: 'string',
                format: 'binary',
              },
            },
          },
        },
      },
    },
  };
}

// Endpoint SFW
const sfw = {
  '/waifu/sfw': {
    get: {
      tags: ['Random'],
      deprecated: true,
      parameters: [
        createParam('category', enums.categories, 'Kategori gambar (SFW)'),
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    example:
                      'https://api.waifu.pics/sfw/waifu/14c9957c-27ae-4798-850b-6d6b9485e36f.jpg',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/waifu/nsfw': {
    get: {
      tags: ['Random'],
      deprecated: true,
      parameters: [
        createParam(
          'category',
          ['waifu', 'neko', 'trap', 'blowjob'],
          'Kategori gambar (NSFW)'
        ),
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    example:
                      'https://api.waifu.pics/nsfw/waifu/14c9957c-27ae-4798-850b-6d6b9485e36f.jpg',
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

// Menggabungkan semua endpoint
const randomEndpoints = {
  '/random/{country}': createRandomEndpoint(),
  '/bokep/{genre}': createBkpEndpoint(),
  '/sfw/{name}': createSfwEndpoint(),
  ...sfw,
};

export default randomEndpoints;
