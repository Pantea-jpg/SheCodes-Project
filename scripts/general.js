"use strict"

const loginButton = document.querySelector("#login");
const modal = document.getElementById("loginModal");
const modalContent = document.querySelector(".modal-content");
const close1 = document.querySelector(".close-1");
const close2 = document.querySelector(".close-2");


loginButton.addEventListener("click", () => {
  modal.style.display = "flex";
  close1.addEventListener("click", () => {
    modal.style.display = "none";
  });
});