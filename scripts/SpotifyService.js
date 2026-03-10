// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQCfpaWv6-g_16PTy_VZ9PBes8ByB39dacIKgX-OXcB65qLC3eavjD1kq7f9k0N6aiMXs_FIxXYP5SxofZ-8oO31Knw4Yw3G7yMEhvcrNwLBWjnFCB4m_YGXokNjz5YXKIhrpu77gsfE7rsoP1hT6xEfI_FnpUu59ho-GQd0BqEweLBJpfUsdfzPQ0MlnUeOdUvwU50hS2TrBDjyKumePVsZPZBNxvCXSe-5H88YYH0x2NZ1asVAF7KBSPHzkaHpqsrVjDken44wb_TP7XK_UvuQwE3RHgmQSVVDGuiC2n4j_9juiUSKn-JBCVs6KZ6h3kN4";

const headers = {
  Authorization: `Bearer ${token}`,
};

export async function searchSpotify(query) {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query,
  )}&type=track,artist&limit=10`;

  const res = await fetch(url, { headers });
  return res.json();
}
