// import { searchSpotify } from "./SpotifyService.js";
import { 
  searchSpotify, 
  getTrendingTracks, 
  getPopularArtists 
} from "./SpotifyService.js";




const form = document.querySelector("form");
const input = document.querySelector("#mySearch");
const resultsContainer = document.querySelector("#results");

const tracksButton = document.querySelector(".tracksbutton");
const artistsButton = document.querySelector(".artistsbutton");

let lastSearchData = null;

// Zoekactie
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  const data = await searchSpotify(query);
  lastSearchData = data;

  renderResults();
});

// Filterknoppen
tracksButton.addEventListener("click", () => {
  tracksButton.classList.add("active");
  artistsButton.classList.remove("active");
  renderResults();
});

artistsButton.addEventListener("click", () => {
  artistsButton.classList.add("active");
  tracksButton.classList.remove("active");
  renderResults();
});

// Renderfunctie
function renderResults() {
 if (!lastSearchData) {
  renderHomeSections();
  return;
}

  resultsContainer.innerHTML = ""; // leegmaken

  const showTracks = tracksButton.classList.contains("active");

  if (showTracks) {
    const tracks = lastSearchData.tracks?.items || [];

    tracks.forEach((track) => {
      const html = `
        <div class="result-item">
          <img src="${track.album.images[2]?.url || ""}" class="image" />
          <div>
            <strong>${track.name}</strong><br>
            ${track.artists.map((a) => a.name).join(", ")}
          </div>
          <button class="details-btn">Details</button>
        </div>
      `;
      resultsContainer.insertAdjacentHTML("beforeend", html);
    });
  } else {
    const artists = lastSearchData.artists?.items || [];

    artists.forEach((artist) => {
      const html = `
        <div class="result-item">
          <img src="${artist.images[2]?.url || ""}" class="image" />
          <div>
            <strong>${artist.name}</strong><br>
            Populariteit: ${artist.popularity}
          </div>
          <button class="details-btn">Details</button>
        </div>
      `;
      resultsContainer.insertAdjacentHTML("beforeend", html);
    });
  }
}



//  HOME DATA
// =======================
async function loadHomeData() {
  const trendingData = await getTrendingTracks();
  const artistsData = await getPopularArtists();

  return {
    trendingTracks: trendingData.tracks.items.slice(0, 3),
    popularArtists: artistsData.artists.items.slice(0, 3)
  };
}
//  HOME SECTIONS
// =======================
async function renderHomeSections() {
  const homeData = await loadHomeData();

  const trending = homeData.trendingTracks;
  const artists = homeData.popularArtists;

  resultsContainer.innerHTML = `
    <button class="create-playlist-btn">🪄 Maak een playlist</button>

    <h2 class="section-title">🔥 Trending nummers</h2>
    <div class="home-row">
      ${trending.map(t => `
        <div class="home-card">
          <img src="${t.album.images[1]?.url || t.album.images[0]?.url}" class="home-img">
          <p>${t.name} - ${t.artists.map(a => a.name).join(", ")}</p>
        </div>
      `).join("")}
    </div>

  <h2 class="section-title">🌍 Populaire artiesten</h2>
    <div class="home-row">
      ${artists.map(a => `
        <div class="home-card">
          <img src="${a.images?.[0]?.url || "./assets/default.png"}" class="home-img round">
          <p>${a.name}</p>
        </div>
      `).join("")}
    </div>

   
  `;

const createBtn = document.querySelector(".create-playlist-btn");

createBtn.addEventListener("click", () => {
  window.location.href = "./generator.html"; 
});
}

renderHomeSections();
