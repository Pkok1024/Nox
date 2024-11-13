/** @format */

import axios from 'axios';

async function shortlink(t) {
  return (
    await axios.get(
      'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(t)
    )
  ).data;
}
export default shortlink;
