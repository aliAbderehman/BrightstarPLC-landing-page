const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const container = document.getElementById("blogPostContainer");
const blogImg = document.getElementById("blogPostImg");

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

    function generateReplyForm(parentId) {
      return `
    <div class="reply">
      <form class="reply-form form">

        <div class="form__group">
          <textarea class="form__input reply-content" rows="6" placeholder="Your Reply" required></textarea>
          <label class="form__label">Your Reply</label>
        </div>

        <div class="form__group">
          <input type="text" placeholder="Your Name" required class="reply-name form__input">
          <label class="form__label">Full Name</label>
        </div>

        <div class="form__group">
          <input type="email" placeholder="Your Email" required class="reply-email form__input">
          <label class="form__label">Email</label>
        </div>

        <button class="btn btn--secondary" type="submit">Post Reply</button>
        <div class="reply-message"></div>
      </form>
    </div>
  `;
    }

    const refreshComments = (openReplyId = null) => {
      fetch(
        `http://localhost:8080/brightstar-cms/wp-json/wp/v2/comments?post=${postId}`
      )
        .then((res) => res.json())
        .then((comments) => {
          const existingComments = document.querySelector(".comments");

          if (existingComments) existingComments.remove();

          const renderComments = (comments, parentId = 0) => {
            return comments
              .filter((c) => c.parent === parentId)
              .map((comment) => {
                const childComments = renderComments(comments, comment.id);
                const avatarUrl = comment.author_avatar_urls["48"];
                const date = new Date(comment.date).toLocaleString();
                // Make the replies visible if this was the last open one
                const showReplies = openReplyId == comment.id;

                return `
  <div class="comment" data-id="${comment.id}" style="margin-left: ${
                  parentId ? "30px" : "0"
                }">
    <div class="comment-header" style="display: flex; align-items: center; gap: 10px;">
      <img src="${avatarUrl}" alt="${
                  comment.author_name
                }" style="width: 48px; height: 48px; border-radius: 50%;" />
      <div>
        <h4 class="heading-quaternary">${comment.author_name}</h4>
        <small style="color: #888;">${date}</small>
      </div>
    </div>
    <div class="text--default">
      <p>${comment.content.rendered}</p>
    </div>
    <button class="reply-btn lable-txt" data-parent="${
      comment.id
    }">Reply</button>
    <div class="replies" data-replies-for="${
      comment.id
    }" style="display: none;">
      ${childComments}
    </div>
    <div class="reply-form-container" data-parent="${comment.id}"></div>
  </div>
`;
              })
              .join("");
          };

          const commentForm = container.querySelector(".comment-form");

          const commentSectionHTML = `
        <section class="comments u-margin-top-small">
          <h2 class="heading-tertiary">Comments</h2>
          ${renderComments(comments) || "<p>No comments yet.</p>"}
        </section>
      `;

          if (commentForm) {
            commentForm.insertAdjacentHTML("beforebegin", commentSectionHTML);
          } else {
            container.insertAdjacentHTML("beforeend", commentSectionHTML);
          }

          // Automatically open the reply section if openReplyId is provided
          if (openReplyId) {
            const repliesContainer = document.querySelector(
              `.replies[data-replies-for="${openReplyId}"]`
            );
            const formContainer = document.querySelector(
              `.reply-form-container[data-parent="${openReplyId}"]`
            );

            if (repliesContainer) repliesContainer.style.display = "block";
            if (formContainer && formContainer.innerHTML.trim() === "") {
              formContainer.innerHTML = generateReplyForm(openReplyId);

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
                          parent: parseInt(openReplyId),
                        }),
                      }
                    );

                    if (!res.ok) throw new Error("Reply failed");

                    refreshComments(openReplyId); // Keep it open again
                  } catch (err) {
                    console.error(err);
                    formContainer.querySelector(".reply-message").textContent =
                      "Error submitting reply";
                  }
                });
            }
          }
        });
    };

    function truncateTitle(title, maxLength = 35) {
      return title.length > maxLength
        ? title.substring(0, maxLength) + "..."
        : title;
    }

    fetch(
      "http://localhost:8080/brightstar-cms/wp-json/wp/v2/posts?_embed&per_page=100"
    )
      .then((res) => res.json())
      .then((posts) => {
        const index = posts.findIndex((p) => p.id === postId);
        const prevPost = posts[index + 1]; // Newer post
        const nextPost = posts[index - 1]; // Older post

        // Fetch category details for each category ID in post.categories
        const categoryIds = post.categories; // array of category IDs

        if (categoryIds.length > 0) {
          // Fetch category details
          fetch(
            `http://localhost:8080/brightstar-cms/wp-json/wp/v2/categories?include=${categoryIds.join(
              ","
            )}`
          )
            .then((res) => res.json())
            .then((categories) => {
              // Create chips HTML
              const chipsHTML = categories
                .map(
                  (cat) => `
        <a href="blog-category.html?id=${cat.id}" class="blog-detail__category-chip">
          ${cat.name}
        </a>
      `
                )
                .join("");

              // Insert chips at the top of the blog-detail content container
              const blogContent = container.querySelector(
                ".blog-detail__content"
              );
              if (blogContent) {
                blogContent.insertAdjacentHTML(
                  "beforebegin",
                  `<div class="category-chips" style="margin-bottom: 16px;">${chipsHTML}</div>`
                );
              }
            });
        }

        const navHTML = `
      <div class="blog-nav u-margin-top-medium" style="display: flex; justify-content: space-between;">
        ${
          prevPost
            ? `<a class="btn" href="blog-detail.html?slug=${
                prevPost.slug
              }">&larr; ${truncateTitle(prevPost.title.rendered)}</a>`
            : `<span></span>`
        }
        ${
          nextPost
            ? `<a class="btn" href="blog-detail.html?slug=${
                nextPost.slug
              }">${truncateTitle(nextPost.title.rendered)} &rarr;</a>`
            : `<span></span>`
        }
      </div>
    `;

        container.insertAdjacentHTML("beforeend", navHTML);
      });

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
          repliesContainer.style.display = "none";
          formContainer.innerHTML = "";
        } else {
          repliesContainer.style.display = "block";
          if (formContainer.innerHTML.trim() === "") {
            formContainer.innerHTML = generateReplyForm(parentId);

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

                  refreshComments(parentId); // ✅ Keep it open
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

    blogImg.innerHTML = `
    <div class="blog-detail__img">
    <h1 class="blog-detail__title heading-secondary container">${
      post.title.rendered
    }</h1>
          <img src="${
            post._embedded["wp:featuredmedia"]?.[0]?.source_url || ""
          }" alt="${post.title.rendered}">

          
        </div>`;

    container.innerHTML = `
      <article class="blog-detail__article">
        
        
        <div class="blog-detail__content text--default">${post.content.rendered}</div>
      </article>

      <section class="comment-form-box  u-margin-top-large">
        
        <form id="commentForm" class="comment-form u-margin-top-medium">
<h3 class="heading-tertiary">Leave a Comment</h3>
        <div class="form__group">
            <textarea class="form__input" id="comment" rows="8" placeholder="Your Comment" required></textarea>
            <label for="comment" class="form__lable">Your Comment</label>
          </div>

          <input class="form__input" type="text" id="com-name" placeholder="Your Name" required>
          <label for="com-name" class="form__lable">Your Name</label>

          <div class="form__group">
            <input class="form__input" type="email" id="com-email" placeholder="Your Email" required>
            <label for="com-email" class="form__lable">Your Email</label>
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
