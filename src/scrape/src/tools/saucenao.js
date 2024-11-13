/** @format */

import axios from 'axios';
import FormData from 'form-data';

const saucenao = async imageUrl => {
  const formData = new FormData();
  formData.append('output_type', '2');
  formData.append('api_key', '58eb687f35decd24507ada808a643fb719931c18');
  formData.append('url', imageUrl);

  let res = await axios.post('https://saucenao.com/search.php', formData, {
    headers: formData.getHeaders(),
  });
  let json = res.data;

  if (!json.results || json.results.length === 0) {
    throw 'No results found.';
  }

  return json.results.map(result => {
    let similarity = result.header.similarity;
    let thumbnailUrl = result.header.thumbnail;
    let indexName = result.header.index_name;
    let { title, member_name, ext_urls } = result.data;

    return {
      title,
      author: member_name,
      similarity,
      source: ext_urls[0],
      thumbnailUrl,
      indexName,
    };
  });
};

export default saucenao;
