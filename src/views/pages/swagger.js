
/**
 * @swagger
 * /ai/blackbox:
 *   get:
 *     tags:
 *       - Ai
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: The search query.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /anime/doujin-latest:
 *   get:
 *     tags:
 *       - Anime
 *     parameters:
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 */


/**
 * @swagger
 * /anime/doujin-search:
 *   get:
 *     tags:
 *       - Anime
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: URL for doujin search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 */


/**
 * @swagger
 * /anime/doujin-ch:
 *   get:
 *     tags:
 *       - Anime
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: URL for doujin search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 */


/**
 * @swagger
 * /anime/doujin-img:
 *   get:
 *     tags:
 *       - Anime
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: URL doujin get image
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 */


/**
 * @swagger
 * /anime/hentai:
 *   get:
 *     tags:
 *       - Anime
 *     parameters:
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 */


/**
 * @swagger
 * /anime/whatanime:
 *   get:
 *     tags:
 *       - Anime
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: URL of the image or video frame
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 */


/**
 * @swagger
 * /anime/nhentai-search:
 *   get:
 *     tags:
 *       - Anime
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: q of the image or video frame
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 */


/**
 * @swagger
 * /downloader/tiktok:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/facebook:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/xnxx:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/mediafire:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/instagram:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/igstory:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/igstory2:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/igtv:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/gdrive:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/twitter:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/sfile:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/capcut:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/spotify:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/apkmirror:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/dvadownloader:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/terabox:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /downloader/ttslide:
 *   get:
 *     tags:
 *       - Downloader
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /sfw/toanime:
 *   get:
 *     tags:
 *       - Maker
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: Parameter for toanime.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil mengambil informasi.
 *         content:
 *           image/*:
 */


/**
 * @swagger
 * /misc/runtime:
 *   get:
 *     tags:
 *       - Misc
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /misc/clock:
 *   get:
 *     tags:
 *       - Misc
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /myanimelist/search:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Search for anime or manga on MyAnimeList
 *     parameters:
 *       - in: query
 *         name: querystring
 *         required: true
 *         description: The search query
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         required: false
 *         description: The type of search (anime or manga)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */


/**
 * @swagger
 * /myanimelist/season:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Get anime data by year, season, and type
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         description: The year
 *         schema:
 *           type: integer
 *       - in: query
 *         name: season
 *         required: true
 *         description: The season
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         required: false
 *         description: The type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /myanimelist/watchlist:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Get user's watchlist
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         description: Username of the user
 *         schema:
 *           type: string
 *       - in: query
 *         name: after
 *         required: false
 *         description: Start index for pagination
 *         schema:
 *           type: integer
 *       - in: query
 *         name: type
 *         required: false
 *         description: Type of media (anime or manga)
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: false
 *         description: Status in the user's watchlist
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: undefined
 */


/**
 * @swagger
 * /myanimelist/news:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Get anime news from MyAnimeList
 *     parameters:
 *       - in: query
 *         name: nbNews
 *         required: false
 *         description: Number of news articles to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of anime news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   link:
 *                     type: string
 *                   date:
 *                     type: string
 */


/**
 * @swagger
 * /myanimelist/anime-info:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Get anime information from URL
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: URL of the anime on MyAnimeList.net
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /myanimelist/episodes:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Get episodes list by anime name and/or id
 *     parameters:
 *       - in: query
 *         name: animeName
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *       - in: query
 *         name: animeId
 *         required: false
 *         description: undefined
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Episodes list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /myanimelist/reviews:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Get list of anime reviews
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: The name of the anime
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
 *         required: undefined
 *         description: The unique identifier of the anime
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         required: undefined
 *         description: The maximum number of reviews to fetch
 *         schema:
 *           type: number
 *       - in: query
 *         name: skip
 *         required: undefined
 *         description: The number of reviews to skip
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of anime reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /myanimelist/recommendations:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Get anime recommendations
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: The name of the anime
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
 *         required: false
 *         description: The unique identifier of the anime
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /myanimelist/stats:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Get anime stats
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: The name of the anime
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
 *         required: false
 *         description: The unique identifier of the anime
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /myanimelist/pictures:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Get anime picture
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: The name of the anime
 *         schema:
 *           type: string
 *       - in: query
 *         name: id
 *         required: false
 *         description: The unique identifier of the anime
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /myanimelist/user:
 *   get:
 *     tags:
 *       - MyAnimeList
 *     summary: Get anime picture
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: The name of the anime
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /nsfw/{tag}:
 *   get:
 *     tags:
 *       - Random
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         description: The tag to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           image/*:
 */


/**
 * @swagger
 * /pinterest/getBoard:
 *   get:
 *     tags:
 *       - Pinterest
 *     description: Retrieve data for a specific board
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the board
 *         schema:
 *           type: string
 *       - in: query
 *         name: slashurl
 *         required: true
 *         description: The slash URL of the board
 *         schema:
 *           type: string
 *       - in: query
 *         name: bookmark
 *         required: false
 *         description: Bookmark parameter for pagination
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /pinterest/searchBoards:
 *   get:
 *     tags:
 *       - Pinterest
 *     description: Search for boards based on query
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: The query string for searching boards
 *         schema:
 *           type: string
 *       - in: query
 *         name: bookmark
 *         required: false
 *         description: Bookmark parameter for pagination
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /pinterest/searchPins:
 *   get:
 *     tags:
 *       - Pinterest
 *     description: Search for pins based on query
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: The query string for searching pins
 *         schema:
 *           type: string
 *       - in: query
 *         name: bookmark
 *         required: false
 *         description: Bookmark parameter for pagination
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /pinterest/suggestions:
 *   get:
 *     tags:
 *       - Pinterest
 *     description: Get suggestions for related pins based on pin ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the pin
 *         schema:
 *           type: string
 *       - in: query
 *         name: bookmark
 *         required: false
 *         description: Bookmark parameter for pagination
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /random/{country}:
 *   get:
 *     tags:
 *       - Random
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         description: Country name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 */


/**
 * @swagger
 * /bokep/{genre}:
 *   get:
 *     tags:
 *       - Random
 *     parameters:
 *       - in: path
 *         name: genre
 *         required: true
 *         description: genre name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /sfw/{name}:
 *   get:
 *     tags:
 *       - Random
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: char name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           image/*:
 */


/**
 * @swagger
 * /waifu/sfw:
 *   get:
 *     tags:
 *       - Random
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Kategori gambar (SFW)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /waifu/nsfw:
 *   get:
 *     tags:
 *       - Random
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Kategori gambar (NSFW)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /search/xvideos:
 *   get:
 *     tags:
 *       - Search
 *     summary: Get videos from XVideos based on criteria
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Search query
 *         schema:
 *           type: string
 *       - in: query
 *         name: short
 *         required: undefined
 *         description: Sorting criteria
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: undefined
 *         description: Date filter
 *         schema:
 *           type: string
 *       - in: query
 *         name: duration
 *         required: undefined
 *         description: Video duration filter
 *         schema:
 *           type: string
 *       - in: query
 *         name: quality
 *         required: undefined
 *         description: Video quality filter
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: undefined
 *         description: Page number
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   isChannel:
 *                     type: boolean
 *                   title:
 *                     type: string
 *                   url:
 *                     type: string
 *                   duration:
 *                     type: string
 *                   hdMark:
 *                     type: string
 *                   thumbnail:
 *                     type: string
 *                   thumbnailGif:
 *                     type: string
 *                   channelName:
 *                     type: string
 *                   channelHref:
 *                     type: string
 */


/**
 * @swagger
 * /search/youtube:
 *   get:
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: query for downloaded YouTube content
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /search/xnxx:
 *   get:
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: query for response for Xnxx
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /search/wikipedia:
 *   get:
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: query for response for Wikipedia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /search/dvasearch:
 *   get:
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: query for response for apk
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /search/komikcast:
 *   get:
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: query for response for komik
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /search/bukalapak:
 *   get:
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: query for response for bukalapak
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /search/tiktoks:
 *   get:
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: query for response for tiktoks
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /shortUrl/{service}:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: path
 *         name: service
 *         required: true
 *         description: The URL shortening service to use
 *         schema:
 *           type: string
 *       - in: query
 *         name: url
 *         required: true
 *         description: The URL to be shortened
 *         schema:
 *           type: string
 *     responses:
 *       200:
 */


/**
 * @swagger
 * /tools/translate:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: lang
 *         required: true
 *         description: Target language code
 *         schema:
 *           type: string
 *       - in: query
 *         name: text
 *         required: true
 *         description: Text to be translated
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/cuaca:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: kota
 *         required: true
 *         description: Text to be search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/saucenao:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: anime image URL to find the source 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/removebg:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: remove background
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/apkmsearch:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Text to be search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/sinonim:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: kata
 *         required: true
 *         description: Text to be sinonim
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/githubstalk:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         description: Text to be search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/langList:
 *   get:
 *     tags:
 *       - Tools
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/userAgents:
 *   get:
 *     tags:
 *       - Tools
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/nekopoi-letest:
 *   get:
 *     tags:
 *       - Tools
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/anti-porn:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: URL of the image to be checked
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /tools/ssweb:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: URL of the web to be checked
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           image/*:
 */


/**
 * @swagger
 * /tools/styletext:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: style text
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /anime/komikindo-ch:
 *   get:
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: url komikindo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/SuccessResponse
 */


/**
 * @swagger
 * /upload/cdn:
 *   post:
 *     tags:
 *       - Uploader
 *     responses:
 *       200:
 *         description: File successfully uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */


/**
 * @swagger
 * /auth/register:
 *   get:
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *       - in: query
 *         name: username
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *       - in: query
 *         name: apiKey
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /auth/profile:
 *   get:
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /cekey:
 *   get:
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: key
 *         required: true
 *         description: undefined
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: API key checked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
