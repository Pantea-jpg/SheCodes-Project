import { searchSpotify } from "./SpotifyService.js";



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
  if (!lastSearchData) return;

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
          <button class="details-btn"><a href="./detailPage.html" class="detail-btn">Details</a></button>
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