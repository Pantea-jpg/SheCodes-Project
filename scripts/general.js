"use strict";

const loginButton = document.querySelector("#login");
const modal = document.getElementById("loginModal");
const close1 = document.querySelector(".close-1");
const logo = document.querySelector(".logo");
const loginModalButton = document.querySelector(".login-button");
const errormessage = document.querySelector("#error-success");

const usernameTest = "pantea@ap.be";
const passwordTest = "1234";

if (!window.location.pathname === "landingPage.html") {
  logo.addEventListener("click", () => {
    window.location.href = "./searchPage.html";
  });
}

loginButton.addEventListener("click", () => {
  errormessage.textContent = "";
  document.querySelector("#password").value = "";
  document.querySelector("#username").value = "";
  errormessage.className = "";
  modal.style.display = "flex";
});

loginModalButton.addEventListener("click", () => {
  const userName = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  errormessage.className = "";

  if (userName !== usernameTest || password !== passwordTest) {
    errormessage.classList.add("red");
    errormessage.textContent = "Uw gegevens klopt niet!";
  } else {
    errormessage.classList.add("green");
    errormessage.textContent = "Je hebt successful ingelogd!";
    setTimeout(() => {
      window.location.href = "./searchPage.html";
    }, 2000);
  }
});

close1.addEventListener("click", () => {
  modal.style.display = "none";
});
