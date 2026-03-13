// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQChNXwCy371cBF4sS0dxDeRbjzkTrytUvD_F_du7YZJBks2LRiFMSNNnjjRtvsKomO0M-99F48P65y_W_BKWQfJIzcjIHnCs30p0YaS7Fx48v4Z2EnNXQHxluPGun3uKmBz0YBRYNoZO8ahDxWhXEoE5fOHr1FT0o1tSJRDEYrzyXAIbR8kFIXvoZN78Q0KYRNOjq8U_oa4oAJxLtX5MWnBBe20uPFbbN1y3CABeHMTaNTxLhaeCtMufXudh4W05JDhFVS4LEmcGR21BMAEDL8eNzW1iJjok91jBVxAug_D5RGj3wRC-ENUEVtsfRUWvEqX';
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
