document.addEventListener("DOMContentLoaded", function () {
  // blog-pagination.js
  const postsPerPage = 6;
  let currentPage = 1;
  let allPosts = [];

  fetch("http://localhost:8080/brightstar-cms/wp-json/wp/v2/posts?_embed")
    .then((res) => res.json())
    .then((posts) => {
      allPosts = posts;
      renderPosts();
      setupPagination();
    });

  function renderPosts() {
    const blogList = document.getElementById("blog-list");
    blogList.innerHTML = ""; // Clear previous posts

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = allPosts.slice(start, end);

    pagePosts.forEach((post) => {
      const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
      const postEl = document.createElement("div");
      postEl.className = "blog-post";
      postEl.innerHTML = `
      <a href="blog-detail.html?slug=${post.slug}">
        ${image ? `<img src="${image}" alt="${post.title.rendered}"/>` : ""}
        <h2>${post.title.rendered}</h2>
        <div>${post.excerpt.rendered}</div>
      </a>
    `;
      blogList.appendChild(postEl);
    });
  }

  function setupPagination() {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPosts();
        updateButtons();
      }
    });

    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(allPosts.length / postsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderPosts();
        updateButtons();
      }
    });

    updateButtons();
  }

  function updateButtons() {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }
});
