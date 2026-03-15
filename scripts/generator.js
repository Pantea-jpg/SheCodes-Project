// scripts/generator.js
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

// MOOD
moodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedMood = btn.textContent.trim();
  });
});

// GENRE
genreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedGenre = btn.textContent.trim();
  });
});

// DUUR
durationSelect.addEventListener("change", () => {
  selectedDuration = Number(durationSelect.value);
});

// TEMPO
tempoSlider.addEventListener("input", () => {
  selectedTempo = Number(tempoSlider.value);
});

// POPULARITEIT
popularitySelect.addEventListener("change", () => {
  selectedPopularity = popularitySelect.value;
});

// GENERATE PLAYLIST
generateBtn.addEventListener("click", async () => {
  const query = `${selectedMood} ${selectedGenre}`.trim() || "chill";

  const data = await searchSpotify(query);
  let tracks = data.tracks.items;

  // 1) FILTER OP DUUR
  const maxMs = selectedDuration * 60 * 1000;
  tracks = tracks.filter((t) => t.duration_ms <= maxMs);

  // 2) FILTER OP TEMPO (simpele benadering via popularity)
  if (selectedTempo < 33) {
    tracks = tracks.filter((t) => t.popularity < 40);
  } else if (selectedTempo > 66) {
    tracks = tracks.filter((t) => t.popularity > 60);
  }

  // 3) FILTER OP POPULARITEIT
  if (selectedPopularity === "Trending") {
    tracks = tracks.filter((t) => t.popularity > 70);
  }
  if (selectedPopularity === "Nieuw") {
    tracks = tracks.filter((t) => t.album.release_date > "2023-01-01");
  }
  if (selectedPopularity === "Populair") {
    tracks = tracks.filter((t) => t.popularity > 50);
  }

  renderPlaylist(tracks);
});

// RENDER PLAYLIST
function renderPlaylist(tracks) {
  playlist.innerHTML = "";

  tracks.forEach((track) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const previewUrl = track.preview_url;

    card.innerHTML = `
      <div class="img">
        <img src="${track.album.images[1]?.url || ""}" alt="cover" />
        <div class="liked" data-id="${track.id}">&#10084;</div>
      </div>
      <h2>${track.name}</h2>
      <p>${track.artists[0].name}</p>
      <button type="button" class="play-preview" data-preview="${previewUrl}">
        Afspeel Preview
      </button>
    `;

    playlist.appendChild(card);
  });

  activatePreviewButtons();
  activateLikeButtons();
}

// PREVIEW AUDIO
function activatePreviewButtons() {
  const buttons = document.querySelectorAll(".play-preview");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.preview;
      if (!url) {
        alert("Geen preview beschikbaar");
        return;
      }

      const audio = new Audio(url);
      audio.play();
    });
  });
}

// LIKE OPSLAAN
function activateLikeButtons() {
  const hearts = document.querySelectorAll(".liked");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      const id = heart.dataset.id;

      let liked = JSON.parse(localStorage.getItem("likedTracks")) || [];

      if (!liked.includes(id)) {
        liked.push(id);
        heart.style.color = "red";
      } else {
        liked = liked.filter((x) => x !== id);
        heart.style.color = "white";
      }

      localStorage.setItem("likedTracks", JSON.stringify(liked));
    });
  });
}
moodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    moodButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMood = btn.textContent.trim();
  });
});

genreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    genreButtons.forEach((b) => 
      b.classList.remove("active"));
    btn.classList.add("active");
    selectedGenre= btn.textContent.trim();
  });
});
