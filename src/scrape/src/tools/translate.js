/** @format */

import fetch from 'node-fetch';

async function translate(lang, text) {
  try {
    const prompt = encodeURIComponent(text);
    const reis = await fetch(
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' +
        lang +
        '&dt=t&q=' +
        prompt
    );
    const res = await reis.json();
    return res[0][0][0];
  } catch (e) {
    return 'Error: Terjadi kesalahan dalam proses terjemahan.';
  }
}

async function langList() {
  try {
    const data = await fetch(
      'https://translate.google.com/translate_a/l?client=webapp&sl=auto&tl=en&v=1.0&hl=en&pv=1&tk=&source=bh&ssel=0&tsel=0&kc=1&tk=626515.626515&q='
    ).then(response => response.json());
    return data.tl;
  } catch (e) {
    return {};
  }
}

export { translate, langList };
