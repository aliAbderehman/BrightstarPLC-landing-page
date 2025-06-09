const form = document.querySelector(".form");
const submitBtn = document.getElementById("submit-btn");

function showPopup(message) {
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

function setLoading(isLoading) {
  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending<span class="spinner-btn"></span>';
  } else {
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Message";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showPopup("Please fill all fields.");
    return;
  }

  setLoading(true); // show loading spinner and disable button

  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LcDJ0orAAAAAMd25aHuBFAt99TYURh8jRSixCK7", {
        action: "contact",
      })
      .then(function (token) {
        // Now send the form data including the token to your backend:
        fetch("http://localhost/brightstar-cms/wp-json/custom/v1/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            message,
            recaptcha: token, // send token to backend for verification
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              showPopup("Message sent successfully!");
              form.reset();
            } else {
              showPopup(
                "Failed to send message: " + (data.message || "Unknown error")
              );
            }
          })
          .catch(() =>
            showPopup("Something went wrong. Please try again later.")
          )
          .finally(() => {
            setLoading(false); // reset loading spinner & button state
          });
      });
  });
});
