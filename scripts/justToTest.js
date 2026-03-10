"use strict";

const token = 'BQAM_8tMK0HKd4DNfH5JfFO3x79r7e2Ul-Da8-jZnePVxbA5-yeOwWtjSv0ViemW5o3wLvb7zqvpcem311MQlWdZa-k72l7gtCY5OYkO3w3pR8KV3YoquU9O6LvUkuhZ8OFVTPNeAiDemuauLNFIuOJwdIQU-G0XG1BBn6vgnmdMUj4YCbb2E5QZ78vgKwOI_2dE2wuf0z8URHL72xsfxRkiFeI6TntCa0sCcBwUdRtu58_n8Yf11Mp8WdbGVXtTTM1Iw26BCubsLETpwx8c7VUWNIgSJpeRWZYVm-UXXkQsjCYgfTzOQgp6EtHs-QD6rdbCHaDm';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);
