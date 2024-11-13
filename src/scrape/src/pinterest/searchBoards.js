/** @format */

import fetchRequest from './fetch/request.js';
import parseBoards from './parser/parseBoards.js';
export default async function searchBoards(query, bookmark) {
  if (!query) {
    throw new Error('No query specified');
  }

  const params = {
    source_url: `/search/boards/?q=${query}&rs=content_type_filter`,
    data: {
      options: {
        article: null,
        applied_filters: null,
        appliedProductFilters: '---',
        auto_correction_disabled: false,
        corpus: null,
        customized_rerank_type: null,
        filters: null,
        query: query,
        query_pin_sigs: null,
        redux_normalize_feed: true,
        rs: 'content_type_filter',
        scope: 'boards',
        source_id: null,
        bookmarks: [bookmark],
      },
      context: {},
    },
  };

  const URL = `https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=${encodeURIComponent(params.source_url)}&data=${encodeURIComponent(JSON.stringify(params.data))}`;
  const data = await fetchRequest(URL);

  return parseBoards(data);
}
