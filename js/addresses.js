const user = "info";
const domain = "brightstarplc.com";
const email = user + "@" + domain;
// document.log('<a href="mailto:' + email + '">' + email + "</a>");

const emailLink = document.querySelectorAll(".info-link");
const emailTxt = document.querySelectorAll(".info-txt");

// emailLink.href
// emailTxt.

emailLink.forEach((link) => {
  link.href = "mailto:" + email;
});

emailTxt.forEach((txt) => {
  txt.textContent = email;
});
