/** @format */

async function traceMoe(url) {
  try {
    const res = await fetch(
      `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(url)}`
    );
    const json = await res.json();
    return json;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export default traceMoe;
