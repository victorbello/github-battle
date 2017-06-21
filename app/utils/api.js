const axios = require('axios');

const id = '42932c7e19bf138e8c5f';
const sec = 'fdf582ed529662c91f0fdc5435b97781c1ab8dab';
const params = `?client_id=${id}&client_secret=${sec}`;
const BASE_URL = 'https://api.github.com/';

function getProfile(username) {
  return axios.get(`${BASE_URL}users/${username}${params}`)
    .then(user => user.data);
}

function getRepos(username) {
  return axios.get(`${BASE_URL}users/${username}/repos${params}&per_page=100`)
    .then(repos => repos);
}

function getStarCount(repos) {
  return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore(profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    const profile = data[0];
    const repos = data[1];

    return {
      profile,
      score: calculateScore(profile, repos)
    };
  });
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

module.exports = {
  battle(players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos(language) {
    const encodedURI = window.encodeURI(`${BASE_URL}search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    return axios.get(encodedURI)
      .then(response => response.data.items);
  }
};
