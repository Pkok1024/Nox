/** @format */

import axios from 'axios';

const fetchGitHubUserInfo = async username => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const userData = response.data;

    const {
      login,
      type,
      name,
      followers,
      following,
      created_at,
      updated_at,
      public_gists,
      public_repos,
      twitter_username,
      bio,
      hireable,
      email,
      location,
      blog,
      company,
      avatar_url,
      html_url,
    } = userData;

    return {
      userName: login,
      nickName: name,
      followersCount: followers,
      followingCount: following,
      publicGistsCount: public_gists,
      publicReposCount: public_repos,
      twitter: twitter_username || '-',
      email: email || '-',
      location: location || '-',
      blog: blog || '-',
      link: html_url,
      createdTime: created_at,
      updatedTime: updated_at,
      bio: bio || '-',
    };
  } catch (error) {
    console.log(error);
  }
};

export default fetchGitHubUserInfo;
