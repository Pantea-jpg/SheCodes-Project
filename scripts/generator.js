// import { getRecommendations } from "./SpotifyService.js";

// // MOOD BUTTONS
// const moodButtons = document.querySelectorAll(".mood-section button");
// let selectedMood = null;

// moodButtons.forEach(btn => {
//   btn.addEventListener("click", () => {
//     moodButtons.forEach(b => b.classList.remove("active"));
//     btn.classList.add("active");
//     selectedMood = btn.textContent.trim();
//   });
// });

// // GENRE BUTTONS
// const genreButtons = document.querySelectorAll(".genre-section button");
// let selectedGenre = null;

// genreButtons.forEach(btn => {
//   btn.addEventListener("click", () => {
//     genreButtons.forEach(b => b.classList.remove("active"));
//     btn.classList.add("active");
//     selectedGenre = btn.textContent.toLowerCase();
//   });
// });

// // SETTINGS
// const tempoInput = document.querySelector("#tempo");
// const popularityInput = document.querySelector("#popularity");

// // PLAYLIST BUTTON
// const generateBtn = document.querySelector(".playList-generate");

// // PLAYLIST OUTPUT
// const playlistSection = document.querySelector("#playlist");

// // MOOD → tempo/popularity mapping
// const moodSettings = {
//   "😎 Chill": { tempo: 80, popularity: 50 },
//   "🏃Energiek": { tempo: 140, popularity: 80 },
//   "😴 Slaap": { tempo: 50, popularity: 20 },
//   "💔 Verdrietig": { tempo: 70, popularity: 40 }
// };

// generateBtn.addEventListener("click", async () => {
//   if (!selectedMood || !selectedGenre) {
//     alert("Kies eerst een stemming en een genre!");
//     return;
//   }

//   // mood settings
//   const mood = moodSettings[selectedMood];

//   const data = await getRecommendations({
//     genre: selectedGenre,
//     tempo: tempoInput.value || mood.tempo,
//     popularity: popularityInput.value === "Trending" ? 80 :
//                 popularityInput.value === "Nieuw" ? 40 : 60
//   });

//   renderPlaylist(data.tracks);
// });

// // RENDER PLAYLIST
// function renderPlaylist(tracks) {
//   playlistSection.innerHTML = "";

//   tracks.forEach(track => {
//     const html = `
//       <div class="card">
//         <div class="img">
//           <img src="${track.album.images[1]?.url || ""}" />
//           <div class="liked">&#10084</div>
//         </div>
//         <h2>${track.name}</h2>
//         <p>${track.artists.map(a => a.name).join(", ")}</p>
//         <button type="button" class="play-preview">Afspeel Preview</button>
//       </div>
//     `;
//     playlistSection.insertAdjacentHTML("beforeend", html);
//   });
// }