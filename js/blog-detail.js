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

    // Function to refresh comments

    /////////////////////////////////////////////////
    /////////////////////////////////////////////////

    const refreshComments = () => {
      fetch(
        `http://localhost:8080/brightstar-cms/wp-json/wp/v2/comments?post=${postId}`
      )
        .then((res) => res.json())
        .then((comments) => {
          const existingComments = document.querySelector(".comments");
          if (existingComments) existingComments.remove();

          // Create new comments HTML
          const renderComments = (comments, parentId = 0) => {
            return comments
              .filter((c) => c.parent === parentId)
              .map((comment) => {
                const childComments = renderComments(comments, comment.id);
                const hasReplies = comments.some(
                  (c) => c.parent === comment.id
                );

                return `
                  <div class="comment" data-id="${
                    comment.id
                  }" style="margin-left: ${parentId ? "30px" : "0"}">
                    <h4>${comment.author_name}</h4>
                    <p>${comment.content.rendered}</p>
                    <button class="reply-btn" data-parent="${
                      comment.id
                    }">Reply</button>

                    <div class="reply-form-container" data-parent="${
                      comment.id
                    }"></div>
                    <div class="replies" data-replies-for="${
                      comment.id
                    }" style="display: none;">
                      ${childComments}
                    </div>
                  </div>
                `;
              })
              .join("");
          };

          // Get reference to the comment form
          const commentForm = container.querySelector(".comment-form");

          // Insert comments section before the comment form
          if (commentForm) {
            commentForm.insertAdjacentHTML(
              "beforebegin",
              `
          <section class="comments">
            <h2>Comments</h2>
            ${renderComments(comments) || "<p>No comments yet.</p>"}
          </section>
        `
            );
          } else {
            // Fallback if comment form isn't found
            container.insertAdjacentHTML(
              "beforeend",
              `
          <section class="comments">
            <h2>Comments</h2>
            ${renderComments(comments) || "<p>No comments yet.</p>"}
          </section>
        `
            );
          }
        });
    };

    // const refreshComments = () => {
    //   fetch(
    //     `http://localhost:8080/brightstar-cms/wp-json/wp/v2/comments?post=${postId}`
    //   )
    //     .then((res) => res.json())
    //     .then((comments) => {
    //       // Remove existing comments section
    //       const existingComments = document.querySelector(".comments");
    //       if (existingComments) existingComments.remove();

    //       // Create new comments HTML
    //       const renderComments = (comments, parentId = 0) => {
    //         return comments
    //           .filter((c) => c.parent === parentId)
    //           .map((comment) => {
    //             const childComments = renderComments(comments, comment.id);
    //             const hasReplies = comments.some(
    //               (c) => c.parent === comment.id
    //             );

    //             return `
    //               <div class="comment" data-id="${
    //                 comment.id
    //               }" style="margin-left: ${parentId ? "30px" : "0"}">
    //                 <h4>${comment.author_name}</h4>
    //                 <p>${comment.content.rendered}</p>
    //                 <button class="reply-btn" data-parent="${
    //                   comment.id
    //                 }">Reply</button>

    //                 <div class="reply-form-container" data-parent="${
    //                   comment.id
    //                 }"></div>
    //                 <div class="replies" data-replies-for="${
    //                   comment.id
    //                 }" style="display: none;">
    //                   ${childComments}
    //                 </div>
    //               </div>
    //             `;
    //           })
    //           .join("");
    //       };

    //       // Insert new comments section
    //       container.insertAdjacentHTML(
    //         "beforeend",
    //         `
    //           <section class="comments">
    //             <h2>Comments</h2>
    //             ${renderComments(comments) || "<p>No comments yet.</p>"}
    //           </section>
    //         `
    //       );
    //     });
    // };

    /////////////////////////////////////////////////
    /////////////////////////////////////////////////

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("reply-btn")) {
        const parentId = e.target.dataset.parent;
        const repliesContainer = document.querySelector(
          `.replies[data-replies-for="${parentId}"]`
        );
        const formContainer = document.querySelector(
          `.reply-form-container[data-parent="${parentId}"]`
        );

        const isVisible = repliesContainer.style.display === "block";

        if (isVisible) {
          // Hide replies and form
          repliesContainer.style.display = "none";
          formContainer.innerHTML = ""; // remove form
        } else {
          // Show replies
          repliesContainer.style.display = "block";

          // Show form if not already present
          if (formContainer.innerHTML.trim() === "") {
            formContainer.innerHTML = `
          <div class="reply">
            <form class="reply-form form">
              <div class="form__group">
                <input type="text" placeholder="Your Name" required class="reply-name form__input">
                <label class="form__label">Full Name</label>
              </div>
              <div class="form__group">
                <input type="email" placeholder="Your Email" required class="reply-email form__input">
                <label class="form__label">Email</label>
              </div>
              <div class="form__group">
                <textarea placeholder="Your Reply" required class="reply-content form__input"></textarea>
                <label class="form__label">Message</label>
              </div>
              <button class="btn btn--secondary" type="submit">Post Reply</button>
              <div class="reply-message"></div>
            </form>
          </div>
        `;

            formContainer
              .querySelector(".reply-form")
              .addEventListener("submit", async (ev) => {
                ev.preventDefault();

                const author_name =
                  formContainer.querySelector(".reply-name").value;
                const author_email =
                  formContainer.querySelector(".reply-email").value;
                const content =
                  formContainer.querySelector(".reply-content").value;

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
                        parent: parseInt(parentId),
                      }),
                    }
                  );

                  if (!res.ok) throw new Error("Reply failed");

                  await refreshComments();

                  // Re-open the replies and form after refresh
                  setTimeout(() => {
                    const repliesContainer = document.querySelector(
                      `.replies[data-replies-for="${parentId}"]`
                    );
                    const formContainer = document.querySelector(
                      `.reply-form-container[data-parent="${parentId}"]`
                    );

                    if (repliesContainer)
                      repliesContainer.style.display = "block";

                    if (formContainer) {
                      formContainer.innerHTML = `
                        <div class="reply">
                          <form class="reply-form form">
                            <div class="form__group">
                              <input type="text" placeholder="Your Name" required class="reply-name form__input">
                              <label class="form__label">Full Name</label>
                            </div>
                            <div class="form__group">
                              <input type="email" placeholder="Your Email" required class="reply-email form__input">
                              <label class="form__label">Email</label>
                            </div>
                            <div class="form__group">
                              <textarea placeholder="Your Reply" required class="reply-content form__input"></textarea>
                              <label class="form__label">Message</label>
                            </div>
                            <button class="btn btn--secondary" type="submit">Post Reply</button>
                            <div class="reply-message"></div>
                          </form>
                        </div>
                      `;
                    }
                  }, 300); // slight delay to allow refreshComments() to finish
                } catch (err) {
                  console.error(err);
                  formContainer.querySelector(".reply-message").textContent =
                    "Error submitting reply";
                }
              });
          }
        }
      }
    });

    // Initial render
    container.innerHTML = `
      <article class="blog__detail">
        <h1 class="blog__detail-title">${post.title.rendered}</h1>
        <div class="blog__detail-img">
          <img src="${
            post._embedded["wp:featuredmedia"]?.[0]?.source_url || ""
          }" alt="${post.title.rendered}">
        </div>
        <div class="blog__detail-content">${post.content.rendered}</div>
      </article>

      <section class="comment-form">
        <h3>Leave a Comment</h3>
        <form id="commentForm">

          <input class="form__input" type="text" id="com-name" placeholder="Your Name" required>
          <label for="com-name" class="form__lable">Full Name</label>

          <div class="form__group">
            <input class="form__input" type="email" id="com-email" placeholder="Your Email" required>
            <label for="com-email" class="form__lable">Full Name</label>
          </div>

          <div class="form__group">
            <textarea class="form__input" id="comment" rows="5" placeholder="Your Comment" required></textarea>
            <label for="commen" class="form__lable">Full Name</label>
          </div>

          <button class="btn btn--secondary" type="submit">Post Comment</button>

        </form>
        <div id="commentMessage"></div>
      </section>
    `;

    // Add comment form handler
    document
      .getElementById("commentForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const author_name = document.getElementById("com-name").value;
        const author_email = document.getElementById("com-email").value;
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

          // Refresh comments after successful submission
          refreshComments();

          document.getElementById("commentMessage").textContent =
            "Comment submitted!";
          document.getElementById("commentForm").reset();
        } catch (err) {
          console.error(err);
          document.getElementById("commentMessage").textContent =
            "Error submitting comment";
        }
      });

    // Load initial comments
    refreshComments();
  })
  .catch((err) => {
    console.error(err);
    container.innerHTML = "<h1>Error loading post.</h1>";
  });
