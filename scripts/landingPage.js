"use strict";

let projectsMusicMatch = document.querySelector(".projects.musicMatch");
const modal = document.getElementById("loginModal");
const modalContent = document.querySelector(".modal-content");
const close = document.querySelector(".close");
const loginButton = document.querySelector("#login");

projectsMusicMatch.addEventListener("click", () => {
  modal.style.display = "flex";
  const close = document.querySelector(".close");
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

loginButton.addEventListener("click", () => {
  modal.style.display = "flex";
  const close = document.querySelector(".close");
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
