// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAxs1E3j5VdcYdfALayyrghSbYMJDDYLapzXp1z6gN9sU-T8ZAMs0z2-Tr5owiKH-IOBDm1zhnmtonLEZzB4V0pSALyVXaHmo2ekbI3He6Hh0V54CahUlIX4fC49c2LSbUn7MvSgFoZG1VjTHpUeh3WoX9kLD4kSFwv-3-ssV-K-lnjA0EUsWZRfg7lUlIfENy3nk1NdoMqZxc_wiTeANdGqSRFj1RWr8v4wjIV4_f_BWOPwD8h6XpNNDtk9OzM3EaiKN80b7PNcmYJNh1ENDP73vrEcptqv9ATLBZjREn263zXIGXpxrU_zQo0grd-urgM';
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
