
const MB_BASE   = "https://musicbrainz.org/ws/2";
const LFM_BASE  = "https://ws.audioscrobbler.com/2.0";

const LASTFM_API_KEY = "YOUR_LASTFM_API_KEY";

const MB_HEADERS = {
  "Accept":     "application/json",
  "User-Agent": "MyMusicApp/1.0 (your@email.com)", 
};


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let _lastMbRequest = 0;
async function mbFetch(url) {
  const now = Date.now();
  const wait = 1050 - (now - _lastMbRequest);
  if (wait > 0) await sleep(wait);
  _lastMbRequest = Date.now();
  const res = await fetch(url, { headers: MB_HEADERS });
  if (!res.ok) throw new Error(`MusicBrainz error ${res.status}: ${url}`);
  return res.json();
}

async function lfmFetch(params) {
  const qs = new URLSearchParams({
    ...params,
    api_key: LASTFM_API_KEY,
    format:  "json",
  });
  const res = await fetch(`${LFM_BASE}?${qs}`);
  if (!res.ok) throw new Error(`Last.fm error ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(`Last.fm: ${data.message}`);
  return data;
}


export async function getArtistInfo(name) {

  const mbData = await mbFetch(
    `${MB_BASE}/artist?query=${encodeURIComponent(name)}&limit=1&fmt=json`
  );
  const mbArtist = mbData.artists?.[0];
  if (!mbArtist) throw new Error(`Artist not found: ${name}`);


  const lfmData = await lfmFetch({
    method: "artist.getInfo",
    artist: mbArtist.name,
  });
  const lfm = lfmData.artist;

  return {
    mbid:           mbArtist.id,
    name:           mbArtist.name,
    country:        mbArtist.country    ?? null,
    type:           mbArtist.type       ?? null,  
    formed:         mbArtist["life-span"]?.begin ?? null,
    disbanded:      mbArtist["life-span"]?.end   ?? null,
    tags:           mbArtist.tags?.map((t) => t.name) ?? [],
    // از Last.fm
    listeners:      parseInt(lfm?.stats?.listeners ?? "0"),
    totalPlays:     parseInt(lfm?.stats?.playcount  ?? "0"),
    bio:            lfm?.bio?.summary?.replace(/<a[^>]*>.*?<\/a>/g, "").trim() ?? null,
    imageUrl:       lfm?.image?.find((i) => i.size === "extralarge")?.["#text"] ?? null,
  };
}


export async function getArtistAlbums(mbid, { limit = 10, offset = 0 } = {}) {
  const data = await mbFetch(
    `${MB_BASE}/release` +
    `?artist=${mbid}` +
    `&type=album` +
    `&status=official` +
    `&limit=${limit}` +
    `&offset=${offset}` +
    `&fmt=json`
  );

  const albums = await Promise.all(
    data.releases.map(async (r) => {
      await sleep(1100); 
      const detail = await mbFetch(
        `${MB_BASE}/release/${r.id}?inc=recordings&fmt=json`
      );

      const tracks = detail.media
        ?.flatMap((m) => m.tracks ?? [])
        .map((t) => ({
          position:      t.position,
          title:         t.title,
          durationMs:    t.length ?? null,
          durationStr:   t.length ? msToTime(t.length) : null,
          recordingMbid: t.recording?.id ?? null,
        }));

      return {
        mbid:       r.id,
        title:      r.title,
        date:       r.date     ?? null,
        country:    r.country  ?? null,
        trackCount: tracks?.length ?? r["track-count"] ?? null,
        tracks:     tracks ?? [],
      };
    })
  );

  return {
    total:  data["release-count"],
    albums,
  };
}


export async function getTopTracks(artistName, count = 5) {
  const data = await lfmFetch({
    method:  "artist.getTopTracks",
    artist:  artistName,
    limit:   count,
    page:    1,
  });

  return data.toptracks.track.map((t, i) => ({
    rank:       i + 1,
    title:      t.name,
    playCount:  parseInt(t.playcount),
    listeners:  parseInt(t.listeners),
    url:        t.url,
    mbid:       t.mbid || null,
  }));
}


function msToTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = String(totalSec % 60).padStart(2, "0");
  return `${m}:${s}`;
}



export async function getFullArtistData(artistName) {
  const artist    = await getArtistInfo(artistName);
  const { albums } = await getArtistAlbums(artist.mbid, { limit: 5 });
  const topTracks = await getTopTracks(artistName, 5);

  return { artist, albums, topTracks };
}