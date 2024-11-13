/** @format */

import express from 'express';
import malScraper from 'mal-scraper';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';

const app = express.Router();

const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({
    error: 'Internal ServerError',
  });
};

app.get('/search', apiKeyMiddleware, async (req, res) => {
  try {
    const query = req.query.querystring;
    const type = req.query.type || 'anime'; // default to 'anime' if type not provided
    const data = await malScraper.getResultsFromSearch(query, type);
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/season', apiKeyMiddleware, async (req, res) => {
  const { year, season, type } = req.query;

  try {
    const data = await malScraper.getSeason(year, season, type);
    res.json(data);
  } catch (err) {
    handleError(res, error);
  }
});

app.get('/watchlist', apiKeyMiddleware, async (req, res) => {
  let { username, after, type, status } = req.query;

  after = after ? Math.max(0, Math.min(Number(after), 300)) : 0;
  type = type === 'manga' ? 'manga' : 'anime';
  status = status ? Math.max(0, Math.min(Number(status), 7)) : 0;
  console.log(username);
  try {
    const data = await malScraper.getWatchListFromUser(
      username,
      after,
      type,
      status
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
});

app.get('/news', apiKeyMiddleware, async (req, res) => {
  const nbNews = req.query.nbNews || 20;

  try {
    const data = await malScraper.getNewsNoDetails(nbNews);
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/anime-info', apiKeyMiddleware, async (req, res) => {
  try {
    const { name, getBestMatch = true, type = 'anime' } = req.query;

    const availableValues = {
      type: ['anime', 'manga'],
      getBestMatch: ['true', 'false'],
    };

    if (!name) {
      return res.status(400).json({
        error: 'Nama anime harus disediakan dalam query.',
      });
    }

    if (!availableValues.type.includes(type)) {
      return res.status(400).json({
        error: 'Tipe harus berupa anime atau manga.',
      });
    }

    if (!availableValues.getBestMatch.includes(getBestMatch.toString())) {
      return res.status(400).json({
        error: 'getBestMatch harus true atau false.',
      });
    }

    const data = await malScraper.getInfoFromName(
      name,
      getBestMatch === 'true',
      type
    );

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Terjadi kesalahan dalam server.',
    });
  }
});

app.get('/anime-info', apiKeyMiddleware, async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      throw new Error('URL parameter is missing');
    }

    const animeInfo = await malScraper.getInfoFromURL(url);
    res.json(animeInfo);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/episodes', apiKeyMiddleware, async (req, res) => {
  try {
    const { animeName, animeId } = req.query;

    if (!animeName) {
      res.status(400).send('Anime name is required.');
      return;
    }

    let episodesList;
    if (animeId) {
      episodesList = await malScraper.getEpisodesList({
        name: animeName,
        id: animeId,
      });
    } else {
      episodesList = await malScraper.getEpisodesList(animeName);
    }

    res.json(episodesList);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/reviews', apiKeyMiddleware, async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        error: 'Parameter name is required.',
      });
    }

    const reviews = await malScraper.getReviewsList({
      name,
    });

    res.json(reviews);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/recommendations', apiKeyMiddleware, async (req, res) => {
  try {
    const animeName = req.query.name;
    const animeId = req.query.id;

    let recommendationsList;

    if (animeId) {
      recommendationsList = await malScraper.getRecommendationsList({
        name: animeName,
        id: animeId,
      });
    } else if (animeName) {
      recommendationsList = await malScraper.getRecommendationsList(animeName);
    } else {
      return res.status(400).json({
        error: 'Missing anime name or ID',
      });
    }

    res.json(recommendationsList);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/stats', apiKeyMiddleware, async (req, res) => {
  try {
    const animeName = req.query.name;
    const animeId = req.query.id;

    let recommendationsList;

    if (animeId) {
      recommendationsList = await malScraper.getStats({
        name: animeName,
        id: animeId,
      });
    } else if (animeName) {
      recommendationsList = await malScraper.getStats(animeName);
    } else {
      return res.status(400).json({
        error: 'Missing anime name or ID',
      });
    }

    res.json(recommendationsList);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/pictures', apiKeyMiddleware, async (req, res) => {
  try {
    const animeName = req.query.name;
    const animeId = req.query.id;

    let pictures;

    if (animeId) {
      pictures = await malScraper.getPictures({
        name: animeName,
        id: animeId,
      });
    } else if (animeName) {
      pictures = await malScraper.getPictures(animeName);
    } else {
      return res.status(400).json({
        error: 'Missing anime name or ID',
      });
    }

    res.json(pictures);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/user', apiKeyMiddleware, async (req, res) => {
  const { username } = req.query;
  try {
    const userData = await malScraper.getUser('Kame-nos');
    res.json(userData);
  } catch (error) {
    handleError(res, error);
  }
});

export default app;
