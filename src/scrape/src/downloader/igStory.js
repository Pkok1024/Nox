/** @format */

import axios from 'axios';

export default async function igStory(url) {
  try {
    const response = await axios.get(
      `https://storiesig.info/api/ig/story?url=${encodeURIComponent(url)}`
    );
    const data = response.data;
    let imagesArray = data.result.map(v =>
      v.image_versions2.candidates.map(candidate => candidate.url)
    );
    let imagesObject = {};
    let counter = 1;
    for (let i = 0; i < imagesArray.length; i++) {
      for (let j = 0; j < imagesArray[i].length; j++) {
        imagesObject[counter] = imagesArray[i][j];
        counter++;
      }
    }
    return imagesObject;
  } catch (error) {
    console.error(error);
  }
}
