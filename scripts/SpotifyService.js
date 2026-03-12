// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQCdUnIEVJ4f2grd2IuQTurynyRZPkCzHrFq01ZuyQahvkBZqkjtGno8VSkRJH70HYRyQ7vggH-hvsRDCujXDHosvO72MCJG_rPNOjeHInF81vZo7N9Z_rA_q5-Y5wiySSLQtgf3dkngfeVxH5Coq3uskfb1NfdfGqhEbM9zNDQJpzGEjWg89ZwWeM2tYCP91PFNAVxnFIps-h9L1uQvm1QyMmiU94i3DnEEy1ZMIGnddfv8shk8BHzFTStOGL9F1Hoz8xCyeRxI5dMeK-u75n9UJqkrIzXIShINRH9dxUkl3YUA5NzCc7kLq7R5JvxnNAwQ";

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
