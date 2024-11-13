/** @format */

export default function parseBoards(data) {
  const root = data.resource_response;
  const bookmark = root?.bookmark;
  const results = root?.data?.results;
  const array = [];

  results.map((response, index, _) => {
    const name = response?.name;
    const id = response?.id;
    const type = response?.type;
    const thumbnailURL = response?.image_thumbnail_url;
    const thumbnailImagesURL = response?.pin_thumbnail_urls;
    const coverURL = response?.image_cover_hd_url;
    const slashURL = response?.url;
    const pinCount = response?.pin_count;
    const owner = response?.owner;

    array.push({
      id,
      name,
      coverURL,
      thumbnailURL,
      thumbnailImagesURL,
      slashURL,
      pinCount,
      type,
      owner: {
        id: owner?.id,
        username: owner?.username,
        fullName: owner?.full_name,
        avatarURL: owner?.image_large_url,
        followers: owner?.follower_count,
      },
    });
  });

  return {
    bookmark,
    response: array,
  };
}
