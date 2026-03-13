// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAEAXYt4sgDELOkRgkmoqg5wuT17i7VrCgDWqhaH71K1VkzIXwUgLmrwQOC52Uw-KpPfpxO-IHtS-cIvChp-iDYTyuQbb3Y6TTEWlLY8nB0XmXGiWbnL8FVy62OdcP7Fno4A1fZ-fKgqmTQj-hd_xtxKMZop3d2GCNQ01EwF-fOIk7iW1Kr7K11NQ1RGSt2zEUdRiHgiNwwYvQPbTRNGcf9LA33cn6LAWjceLCFzWza2V4x9UHCB2B0uXnCzRw71qH-nRYcBRPKRzf3WO77k4Tl1G6o-EI9Jn-U5wW0EOnoygCZmzbWsSF-VU8hNjfoEFPz'
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
