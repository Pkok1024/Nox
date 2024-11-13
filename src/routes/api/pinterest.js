/** @format */

import express from 'express';
import * as sc from '../../scrape/index.js';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';

const apiR = express.Router();

async function sendJSONResponse(res, data) {
  res.json({
    status: 'Success',
    code: 200,
    author,
    data,
  });
}

async function handleGetBoard(req, res) {
  const options = {
    id: req.query.id,
    slashurl: req.query.slashurl,
    bookmark: req.query.bookmark,
  };
  const boardData = await sc.getBoard(options);
  await sendJSONResponse(res, boardData);
}

async function handleSearchBoards(req, res) {
  const query = req.query.query;
  const bookmark = req.query.bookmark;
  const boardData = await sc.searchBoards(query, bookmark);
  await sendJSONResponse(res, boardData);
}

async function handleSearchPins(req, res) {
  const query = req.query.query;
  const bookmark = req.query.bookmark;
  const pinData = await sc.searchPins(query, bookmark);
  await sendJSONResponse(res, pinData);
}

async function handleSuggestions(req, res) {
  const id = req.query.id;
  const bookmark = req.query.bookmark;
  const suggestionData = await sc.suggestions(id, bookmark);
  await sendJSONResponse(res, suggestionData);
}

apiR.get('/:path', apiKeyMiddleware, async (req, res) => {
  const path = req.path;

  try {
    switch (path) {
      case '/getBoard':
        await handleGetBoard(req, res);
        break;

      case '/searchBoards':
        await handleSearchBoards(req, res);
        break;

      case '/searchPins':
        await handleSearchPins(req, res);
        break;

      case '/suggestions':
        await handleSuggestions(req, res);
        break;

      default:
        res.status(404).json({ error: 'Path not found' });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default apiR;
