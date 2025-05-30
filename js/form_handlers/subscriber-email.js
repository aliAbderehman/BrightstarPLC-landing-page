document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("subscribe-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      grecaptcha.ready(function () {
        grecaptcha
          .execute("6LcDJ0orAAAAAMd25aHuBFAt99TYURh8jRSixCK7", {
            action: "subscribe",
          }) // use your site key here
          .then(function (token) {
            const email = document.getElementById("subscriber-email").value;

            fetch(
              "http://localhost:8080/brightstar-cms/wp-json/custom/v1/subscribe",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, recaptcha: token }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                document.getElementById("subscribe-message").textContent =
                  data.message || "Subscribed successfully!";
              })
              .catch(() => {
                document.getElementById("subscribe-message").textContent =
                  "Something went wrong. Try again.";
              });
          });
      });
    });
});
