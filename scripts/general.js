"use strict";

const loginButton = document.querySelector("#login");
const modal = document.getElementById("loginModal");
const modalContent = document.querySelector(".modal-content");
const close1 = document.querySelector(".close-1");
const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
  window.location.href = "./searchPage.html";
});

loginButton.addEventListener("click", () => {
  modal.style.display = "flex";
  close1.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
