document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("subscribe-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("subscriber-email").value;

      fetch(
        "http://localhost:8080/brightstar-cms/wp-json/custom/v1/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          document.getElementById("subscribe-form").textContent = data.message;
        })
        .catch(() => {
          document.getElementById("subscribe-form").textContent =
            "Something went wrong. Try again.";
        });
    });
});
