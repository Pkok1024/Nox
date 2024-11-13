/** @format */

import parseBoardData from './parser/parseBoardData.js';
import request_1 from './fetch/request.js';
import { Api } from './api/api.js';

export default async function getBoard(options) {
  if (!id) throw Error('No id specified.');
  if (!slashurl) throw Error('No slash url specified.');

  const params = {
    source_url: `${slashurl}`,
    data: {
      options: {
        board_id: id,
        board_url: slashurl,
        currentFilter: -1,
        field_set_key: 'react_grid_pin',
        filter_section_pins: true,
        sort: 'default',
        layout: 'default',
        page_size: 250,
        redux_normalize_feed: true,
        bookmarks: [bookmark],
      },
      context: {},
    },
  };

  const URL = `${Api.baseURL}/resource/BoardFeedResource/get/?source_url=${encodeURIComponent(params.source_url)}&data=${encodeURIComponent(JSON.stringify(params.data))}`;

  console.log(URL);

  const data = await request_1(URL);

  return parser_getBoard_1(data);
}
