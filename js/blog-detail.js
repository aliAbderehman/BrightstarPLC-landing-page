const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const container = document.getElementById("blogPostContainer");

if (!slug) {
  container.innerHTML = "<h1>Post not found.</h1>";
  throw new Error("No slug provided.");
}

fetch(
  `http://localhost:8080/brightstar-cms/wp-json/wp/v2/posts?slug=${slug}&_embed`
)
  .then((res) => res.json())
  .then((data) => {
    const post = data[0];
    const postId = post.id;

    // Render post content
    container.innerHTML = `
      <article class="blog__detail">
        <h1 class="blog__detail-title">${post.title.rendered}</h1>
        <div class="blog__detail-img">
          <img src="${
            post._embedded["wp:featuredmedia"]?.[0]?.source_url || ""
          }" alt="${post.title.rendered}" />
        </div>
        <div class="blog__detail-content">${post.content.rendered}</div>
      </article>

      <section class="comment-form">
        <h3>Leave a Comment</h3>
        <form id="commentForm">
          <input type="text" id="name" placeholder="Your Name" required />
          <input type="email" id="email" placeholder="Your Email" required />
          <textarea id="comment" placeholder="Your Comment" required></textarea>
          <button type="submit">Submit</button>
        </form>
        <div id="commentMessage"></div>
      </section>
    `;

    // Attach form handler AFTER the form exists in the DOM
    document
      .getElementById("commentForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const author_name = document.getElementById("name").value;
        const author_email = document.getElementById("email").value;
        const content = document.getElementById("comment").value;

        try {
          const res = await fetch(
            "http://localhost:8080/brightstar-cms/wp-json/wp/v2/comments",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                post: postId,
                author_name,
                author_email,
                content,
              }),
            }
          );

          if (!res.ok) throw new Error("Failed to submit comment");
          document.getElementById("commentMessage").textContent =
            "Comment submitted!";
          document.getElementById("commentForm").reset();
        } catch (err) {
          console.error(err);
          document.getElementById("commentMessage").textContent =
            "Error submitting comment";
        }
      });

    // Fetch comments and append NON-DESTRUCTIVELY
    fetch(
      `http://localhost:8080/brightstar-cms/wp-json/wp/v2/comments?post=${postId}`
    )
      .then((res) => res.json())
      .then((comments) => {
        const commentsHTML = comments
          .map(
            (comment) => `
          <div class="comment">
            <h4>${comment.author_name}</h4>
            <p>${comment.content.rendered}</p>
          </div>
        `
          )
          .join("");

        container.insertAdjacentHTML(
          "beforeend",
          `
          <section class="comments">
            <h2>Comments</h2>
            ${commentsHTML || "<p>No comments yet.</p>"}
          </section>
        `
        );
      });
  })
  .catch((err) => {
    console.error(err);
    container.innerHTML = "<h1>Error loading post.</h1>";
  });
