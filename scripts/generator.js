
import { searchSpotify } from "./SpotifyService.js";



const moodButtons = document.querySelectorAll(".mood-section button");
const genreButtons = document.querySelectorAll(".genre-section button");
const durationSelect = document.getElementById("duration");
const tempoSlider = document.getElementById("tempo");
const popularitySelect = document.getElementById("popularity");
const playlist = document.getElementById("playlist");
const generateBtn = document.querySelector(".playList-generate");

let selectedMood = "";
let selectedGenre = "";
let selectedDuration = 15;
let selectedTempo = 50;
let selectedPopularity = "Populair";

let currentAudio = null;

// ===============================
// MOOD BUTTONS
// ===============================
moodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {

    // Toggle gedrag
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      selectedMood = "";
      return;
    }

    // Eerst alle andere knoppen uitzetten
    moodButtons.forEach((b) => b.classList.remove("active"));

    // Deze knop activeren
    btn.classList.add("active");
    selectedMood = btn.textContent.trim();
  });
});

// ===============================
// GENRE BUTTONS
// ===============================
genreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {

    // Toggle gedrag
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      selectedGenre = "";
      return;
    }

    // Andere knoppen uitzetten
    genreButtons.forEach((b) => b.classList.remove("active"));

    // Deze knop activeren
    btn.classList.add("active");
    selectedGenre = btn.textContent.trim();
  });
});
// ===============================
// SELECTS
// ===============================
durationSelect.addEventListener("change", () => {
  selectedDuration = Number(durationSelect.value);
});

tempoSlider.addEventListener("input", () => {
  selectedTempo = Number(tempoSlider.value);
});

popularitySelect.addEventListener("change", () => {
  selectedPopularity = popularitySelect.value;
});

// ===============================
// GENERATE PLAYLIST
// ===============================
generateBtn.addEventListener("click", async () => {
  let query = "pop";

  if (selectedMood && selectedGenre) query = `${selectedMood} ${selectedGenre}`;
  else if (selectedMood) query = selectedMood;
  else if (selectedGenre) query = selectedGenre;

  const data = await searchSpotify(query);
  let tracks = data.tracks.items;

  // 1) FILTER: ONLY TRACKS WITH PREVIEW
  // tracks = tracks.filter((t) => t.preview_url);
  let previewTracks = tracks.filter((t) => t.preview_url);
  if (previewTracks.length > 0) {
    tracks = previewTracks;
  }

  // 2) FILTER: DURATION
  // const maxMs = selectedDuration * 60 * 1000;
  // tracks = tracks.filter((t) => t.duration_ms <= maxMs);
  const maxMs = selectedDuration * 60 * 1000;
  tracks = tracks.filter((t) => t.duration_ms <= maxMs);

  // 3) FILTER: TEMPO (approx via popularity)
  if (selectedTempo < 33) {
    tracks = tracks.filter((t) => t.popularity < 60);
  } else if (selectedTempo > 66) {
    tracks = tracks.filter((t) => t.popularity > 40);
  }

  // 4) FILTER: POPULARITY
  if (selectedPopularity === "Trending") {
    tracks = tracks.filter((t) => t.popularity > 50);
  }
  if (selectedPopularity === "Nieuw") {
    tracks = tracks.filter((t) => t.album.release_date > "2022-01-01");
  }
  if (selectedPopularity === "Populair") {
    tracks = tracks.filter((t) => t.popularity > 30);
  }
  if (tracks.length === 0) {
    tracks = data.tracks.items.slice(0, 10);
  }

  renderPlaylist(tracks);
});

// ===============================
// RENDER PLAYLIST
// ===============================
function renderPlaylist(tracks) {
  playlist.innerHTML = "";

  tracks.forEach((track) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // const previewUrl = track.preview_url;
    const previewUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    card.innerHTML = `
      <div class="img">
        <img src="${track.album.images[1]?.url || ""}" alt="cover" />
        <div class="liked" data-id="${track.id}">&#10084;</div>
      </div>
      <h2>${track.name}</h2>
      <p>${track.artists[0].name}</p>

      ${
        previewUrl
          ? `<button type="button" class="play-preview" data-preview="${previewUrl}">
               ▶ Afspeel Preview
             </button>`
          : `<button type="button" class="play-preview disabled" disabled>
               Geen preview
             </button>`
      }
    `;

    playlist.appendChild(card);
  });

  activatePreviewButtons();
  activateLikeButtons();
}
// ===============================
// PREVIEW AUDIO
// ===============================
function activatePreviewButtons() {
  const buttons = document.querySelectorAll(".play-preview");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.preview;

      // ❗ Als er geen preview‑link is → doe niets
      if (!url || url === "null" || url === "") {
        return;
      }

      // ❗ Als dezelfde preview al speelt → stop hem
      if (currentAudio && currentAudio.src === url) {
        currentAudio.pause();
        currentAudio = null;

        // Zet knop terug naar standaard tekst
        btn.textContent = "▶ Afspeel Preview";
        return;
      }

      // ❗ Stop andere previews die al spelen
      if (currentAudio) {
        currentAudio.pause();
      }

      // ▶ Start nieuwe audio
      currentAudio = new Audio(url);
      currentAudio.play();

      // 🔄 Reset alle knoppen naar standaard tekst
      buttons.forEach((b) => (b.textContent = "▶ Afspeel Preview"));

      // ⏸ Verander de knop van deze track naar "Stop"
      btn.textContent = "⏸ Stop Preview";

      // 🔚 Wanneer de audio klaar is → knop terugzetten
      currentAudio.onended = () => {
        btn.textContent = "▶ Afspeel Preview";
        currentAudio = null;
      };
    });
  });
}
// ===============================
// LIKE SYSTEM
// ===============================
function activateLikeButtons() {
  const hearts = document.querySelectorAll(".liked");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      const id = heart.dataset.id;

      let liked = JSON.parse(localStorage.getItem("likedTracks")) || [];

      if (!liked.includes(id)) {
        liked.push(id);
        heart.classList.add("active");
      } else {
        liked = liked.filter((x) => x !== id);
        heart.classList.remove("active");
      }

      localStorage.setItem("likedTracks", JSON.stringify(liked));
    });
  });
}
