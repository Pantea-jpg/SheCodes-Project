// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDcsCndJv7oX5Z6XRsh114HmgLnzIzRlUqYyQysI4vh0drCsJRkJW7APu0Ay5d2uV2QhKqFt2UUy2mxtBv8aoYcU4gXH0dHJiZGktgHBi4UknnEhKbNyacroyVQm0I7zz2K8CH_1JC0PeXJNgeFEOCwmtZZB43LM_cGIyOWV-h-SFUxokw6DDOuBbT_DgjHPK4QTH4wIsBi-YDSdRPP6Psf5vmLIw9NiT4AK34jfYOS1haftwBz1JOuYB7lqDjr5pDeYdk9KBl8KvR8aPbIxKadn_Jpwxl_cZw9H23X7wZbTXrIea_Un7q1BeHkqBzpBjB8';
const headers = {
  Authorization: `Bearer ${token}`,
};

// voor search page
export async function searchSpotify(query) {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query,
  )}&type=track,artist&limit=10`;

  const res = await fetch(url, { headers });
  return res.json();
}

export async function getTrendingTracks() {
  const url = `https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=10`;
  const res = await fetch(url, { headers });
  return res.json();
}
export async function getPopularArtists() {
  const url = `https://api.spotify.com/v1/search?q=pop&type=artist&limit=10`;
  const res = await fetch(url, { headers });
  return res.json();
}
