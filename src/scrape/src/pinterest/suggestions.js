/** @format */

import { Api } from './api/api.js';
import request from './fetch/request.js';
import parseSuggestions from './parser/parseSuggestions.js';
export default async function suggestions(id, bookmark) {
  if (!id) throw Error('No id specified');

  const params = {
    source_url: `/pin/${id}/`,
    data: {
      options: {
        pin_id: `${id}`,
        context_pin_ids: [],
        page_size: 12,
        search_query: '',
        source: 'deep_linking',
        top_level_source: 'deep_linking',
        top_level_source_depth: 1,
        is_pdp: false,
        bookmarks: [bookmark],
      },
      context: {},
    },
  };

  const URL = `${Api.baseURL}/resource/RelatedModulesResource/get/?source_url=${encodeURIComponent(params.source_url)}&data=${encodeURIComponent(JSON.stringify(params.data))}`;

  const data = await request(URL);

  return parserSuggestions(data);
}
