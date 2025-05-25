const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const container = document.getElementById("blogPostContainer");
const GRAPHQL_ENDPOINT = "http://localhost:8080/brightstar-cms/graphql";

if (!slug) {
  container.innerHTML = "<h1>Post not found.</h1>";
  throw new Error("No slug provided.");
}

// GraphQL Query for Post and Comments
const GET_POST_QUERY = `
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      comments(first: 100, where: {status: APPROVE}) {
        nodes {
          id
          content(format: RENDERED)
          parentId
          author {
            node {
              name
              email
            }
          }
        }
      }
    }
  }
`;

// GraphQL Mutation for Comments
const CREATE_COMMENT_MUTATION = `
  mutation CreateComment(
    $postId: Int!
    $author: String!
    $authorEmail: String!
    $content: String!
    $parentId: Int
  ) {
    createComment(
      input: {
        commentOn: $postId
        author: $author
        authorEmail: $authorEmail
        content: $content
        parent: $parentId
      }
    ) {
      success
      comment {
        id
        content
      }
    }
  }
`;

// Generic GraphQL request handler
async function graphqlRequest(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();
    if (data.errors) throw new Error(data.errors[0].message);
    return data.data;
  } catch (error) {
    console.error("GraphQL Error:", error);
    throw error;
  }
}

// Main execution
(async () => {
  try {
    // Get post data
    const { postBy: post } = await graphqlRequest(GET_POST_QUERY, { slug });
    const postId = parseInt(post.id);

    // Function to refresh comments
    const refreshComments = async () => {
      const { postBy: updatedPost } = await graphqlRequest(GET_POST_QUERY, {
        slug,
      });
      const comments = updatedPost.comments.nodes;

      // Remove existing comments section
      const existingComments = document.querySelector(".comments");
      if (existingComments) existingComments.remove();

      // Recursive comment renderer
      const renderComments = (comments, parentId = 0) => {
        return comments
          .filter((c) => c.parentId === parentId)
          .map((comment) => {
            const childComments = renderComments(
              comments,
              parseInt(comment.id)
            );
            const hasReplies = comments.some(
              (c) => c.parentId === parseInt(comment.id)
            );

            return `
              <div class="comment" data-id="${
                comment.id
              }" style="margin-left: ${parentId ? "30px" : "0"}">
                <h4>${comment.author.node.name}</h4>
                <p>${comment.content}</p>
                <button class="reply-btn" data-parent="${
                  comment.id
                }">Reply</button>
                ${
                  hasReplies
                    ? `<button class="toggle-replies-btn" data-id="${comment.id}">Show Replies</button>`
                    : ""
                }
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

      // Insert new comments section
      container.insertAdjacentHTML(
        "beforeend",
        `
        <section class="comments">
          <h2>Comments</h2>
          ${renderComments(comments) || "<p>No comments yet.</p>"}
        </section>
      `
      );
    };

    // Handle reply button clicks
    container.addEventListener("click", async (e) => {
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
                  <button class="btn btn--secondary" type="submit">Submit Reply</button>
                  <div class="reply-message"></div>
                </form>
              </div>
            `;

            formContainer
              .querySelector("form")
              .addEventListener("submit", async (ev) => {
                ev.preventDefault();
                const form = ev.target;
                const messageDiv = form.querySelector(".reply-message");

                try {
                  await graphqlRequest(CREATE_COMMENT_MUTATION, {
                    postId,
                    author: form.querySelector(".reply-name").value,
                    authorEmail: form.querySelector(".reply-email").value,
                    content: form.querySelector(".reply-content").value,
                    parentId: parseInt(parentId),
                  });

                  messageDiv.textContent = "Reply submitted!";
                  await refreshComments();
                } catch (err) {
                  messageDiv.textContent = err.message;
                }
              });
          }
        }
      }
    });

    // Initial render
    container.innerHTML = `
      <article class="blog__detail">
        <h1 class="blog__detail-title">${post.title}</h1>
        <div class="blog__detail-img">
          <img src="${post.featuredImage?.node?.sourceUrl || ""}" alt="${
      post.title
    }">
        </div>
        <div class="blog__detail-content">${post.content}</div>
      </article>

      <section class="comment-form">
        <h3>Leave a Comment</h3>
        <form id="commentForm">
          <input class="form__input" type="text" id="name" placeholder="Your Name" required>
          <input class="form__input" type="email" id="email" placeholder="Your Email" required>
          <textarea id="comment" placeholder="Your Comment" required></textarea>
          <button type="submit">Submit</button>
        </form>
        <div id="commentMessage"></div>
      </section>
    `;

    // Handle main comment form submission
    document
      .getElementById("commentForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const messageDiv = document.getElementById("commentMessage");

        try {
          await graphqlRequest(CREATE_COMMENT_MUTATION, {
            postId,
            author: form.querySelector("#name").value,
            authorEmail: form.querySelector("#email").value,
            content: form.querySelector("#comment").value,
          });

          messageDiv.textContent = "Comment submitted!";
          form.reset();
          await refreshComments();
        } catch (err) {
          messageDiv.textContent = err.message;
        }
      });

    // Load initial comments
    await refreshComments();
  } catch (error) {
    console.error(error);
    container.innerHTML = "<h1>Error loading post.</h1>";
  }
})();
