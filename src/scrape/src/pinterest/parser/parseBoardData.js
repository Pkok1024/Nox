/** @format */

export default function parseBoardData(data) {
  const root = data?.resource_response;
  const bookmark = root?.bookmark;
  const results = root?.data;
  const array = [];

  results.map((response, index, _) => {
    const id = response?.id;
    const type = response?.type;
    const title = response?.title ? response.grid_title : response?.title;
    const image = response?.images.orig?.url;
    const nativeCreator = response?.native_creator;

    array.push({
      id,
      title,
      type,
      image,
      nativeCreator: {
        id: nativeCreator?.id,
        username: nativeCreator?.username,
        fullName: nativeCreator?.full_name,
        avatarURL: nativeCreator?.image_xlarge_url,
        type: nativeCreator?.type,
      },
    });
  });

  return {
    bookmark,
    response: array,
  };
}
