<!-- @format -->
<p align="center">
<img src="https://telegra.ph/file/65c3d56009cbd52fba69b.png" width="75%" style="margin-left: auto;margin-right: auto;display: block;"><p align="center">
</p>
<h1 align="center">NoxVenenum</h1>

<a href="https://github.com/Pkok1024/NoxVenenum/network/members"><img title="Forks" src="https://img.shields.io/github/forks/Pkok1024/NoxVenenum?label=Forks&color=blue&style=flat-square"></a>
<a href="https://github.com/Pkok1024/NoxVenenum/lwatchers"><img title="Watchers" src="https://img.shields.io/github/watchers/Pkok1024/NoxVenenum?label=Watchers&color=green&style=flat-square"></a>
<a href="https://github.com/Pkok1024/NoxVenenum/stargazers"><img title="Stars" src="https://img.shields.io/github/stars/Pkok1024/NoxVenenum?label=Stars&color=yellow&style=flat-square"></a>
<a href="https://github.com/Pkok1024/NoxVenenum/graphs/contributors"><img title="Contributors" src="https://img.shields.io/github/contributors/Pkok1024/NoxVenenum?label=Contributors&color=blue&style=flat-square"></a>
<a href="https://github.com/Pkok1024/NoxVenenum/issues"><img title="Issues" src="https://img.shields.io/github/issues/Pkok1024/NoxVenenum?label=Issues&color=success&style=flat-square"></a>
<a href="https://github.com/Pkok1024/NoxVenenum/issues?q=is%3Aissue+is%3Aclosed"><img title="Issues" src="https://img.shields.io/github/issues-closed/Pkok1024/NoxVenenum?label=Issues&color=red&style=flat-square"></a>
<a href="https://github.com/Pkok1024/NoxVenenum/pulls"><img title="Pull Request" src="https://img.shields.io/github/issues-pr/Pkok1024/NoxVenenum?label=PullRequest&color=success&style=flat-square"></a>
<a href="https://github.com/Pkok1024/NoxVenenum/pulls?q=is%3Apr+is%3Aclosed"><img title="Pull Request" src="https://img.shields.io/github/issues-pr-closed/Pkok1024/NoxVenenum?label=PullRequest&color=red&style=flat-square"></a>

---

<h1 align="center">example</h1>
<p align="center">
  <img src="https://telegra.ph/file/af0922d8cb7b8e08b9469.jpg" alt="example" style="border: 5px solid #000; padding: 2px; margin: 5px;">
</p>

# Description

NoxVenenum is an experimental project for learning purposes. It's a REST API built using JavaScript, documented with Swagger OpenAPI V3.0, and designed to run on port 3000.

## path

**Ai:**

- GET /ai/blackbox
- GET /ai/Pixart-A

**Anime:**

- GET /anime/doujin-latest
- GET /anime/doujin-search
- GET /anime/doujin-ch
- GET /anime/doujin-img
- GET /anime/hentai
- GET /anime/whatanime
- GET /anime/nhentai-search

**Downloader:**

- GET /downloader/tiktok
- GET /downloader/facebook
- GET /downloader/xnxx
- GET /downloader/mediafire
- GET /downloader/instagram
- GET /downloader/igstory
- GET /downloader/igstory2
- GET /downloader/igtv
- GET /downloader/gdrive
- GET /downloader/twitter
- GET /downloader/sfile
- GET /downloader/capcut
- GET /downloader/spotify
- GET /downloader/apkmirror
- GET /downloader/dvadownloader
- GET /downloader/terabox
- GET /downloader/ttslide

**Random:**

- GET /bokep/{genre}
- GET /nsfw/{tag}
- GET /random/{country}
- GET /sfw/{name}

**Maker:**

- GET /sfw/toanime

**Misc:**

- GET /misc/runtime
- GET /misc/clock
-
- **MyAnimeList:**

- GET /myanimelist/search
- GET /myanimelist/season
- GET /myanimelist/watchlist
- GET /myanimelist/news
- GET /myanimelist/anime-info
- GET /myanimelist/episodes
- GET /myanimelist/reviews
- GET /myanimelist/recommendations
- GET /myanimelist/stats
- GET /myanimelist/pictures
- GET /myanimelist/user

**Search:**

- GET /search/youtube
- GET /search/xnxx
- GET /search/wikipedia
- GET /search/dvasearch
- GET /search/komikcast
- GET /search/bukalapak
- GET /search/tiktoks

**Tools:**

- GET /shortUrl/{service}
- GET /tools/translate
- GET /tools/cuaca
- GET /tools/saucenao
- GET /tools/removebg
- GET /tools/apkmsearch
- GET /tools/sinonim
- GET /tools/githubstalk
- GET /tools/langList
- GET /tools/userAgents
- GET /tools/nekopoi-letest
- GET /tools/anti-porn
- GET /tools/ssweb
- GET /tools/styletext

**Uploader:**

- POST /upload/cdn

**User:**

- GET /auth/register
- GET /auth/profile
- GET /cekey

## Installation

1. **Prerequisites:**

   - Ensure you have Node.js installed on your computer.

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/Pkok1024/NoxVenenum
   ```
3. **Navigate to the Project Directory:**

   ```bash
   cd NoxVenenum
   ```

4. **Install Dependencies:**

   ```bash
   npm install
   ```

5. **Run the Server:**

   - For production:
     ```bash
     npm start
     ```
   - For development with auto-reloading:
     ```bash
     npm run dev
     ```

6. **Access the API:**
   - The API will be accessible at `http://localhost:3000/`.
   - Access the Swagger documentation at `http://localhost:3000/docs`.

## Usage

- For production:
  - Run the command `npm start` to start the server. The API will be accessible at `http://localhost:3000/`.
  - Access the Swagger documentation at `http://localhost:3000/docs`.
- For development:
  - Run the command `npm run dev` to start the server with nodemon for auto-reloading. The API will be accessible at `http://localhost:3000/`.
  - Access the Swagger documentation at `http://localhost:3000/docs`.
  - Format your code using `npm run format` to ensure consistent coding style.

## Contribution

Feel free to submit a pull request if you'd like to contribute to this project. Please make sure to provide a clear description of the changes you propose.

## License

NoxVenenum is licensed under the [MIT license](https://opensource.org/licenses/MIT).

## This was created using 100% chatGPT without any programmer intervention
