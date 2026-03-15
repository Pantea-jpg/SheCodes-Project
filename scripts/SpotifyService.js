// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQAHE-yZ5VLP5CaFcO1gt6ow6bYS6soB9jHKbBz0_xTrdZJqF4rTZC4gY0z0DGZXby2EiXhOAYlcBFr5_eaaVumSCwF0vN6Ghnq9mkPAk0mk4FEoFeRiJ8_b60LMcieLseXTFC8Mw_g";

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

//generator page
// export async function getRecommendations({ genre, tempo, popularity }) {
//   const url = `https://api.spotify.com/v1/recommendations?limit=10&seed_genres=${genre}&target_tempo=${tempo}&target_popularity=${popularity}`;
//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return res.json();
// }
