/** @format */

import { Api } from './api/api.js';
import request from './fetch/request.js';
import parserSearch from './parser/searchParser.js';
export default async function searchPins(query, bookMark) {
  if (!query) throw Error('No query specified');

  const params = {
    source_url: `/search/pins/?q=${query}&rs=typed`,
    data: {
      options: {
        article: '',
        appliedProductFilters: '---',
        price_max: null,
        price_min: null,
        query: query,
        scope: 'pins',
        auto_correction_disabled: '',
        top_pin_id: '',
        filters: '',
        page_size: '15',
        bookmarks: [bookMark],
      },
      context: {},
    },
  };

  const URL = `${Api.baseURL}/resource/BaseSearchResource/get/?source_url=${encodeURIComponent(params.source_url)}&data=${encodeURIComponent(JSON.stringify(params.data))}`;

  const data = await request(URL);

  return parserSearch(data);
}
