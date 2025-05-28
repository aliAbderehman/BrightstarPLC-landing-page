document.addEventListener("DOMContentLoaded", function () {
  const postsPerPage = 6;
  let currentPage = 1;
  let allPosts = [];
  let filteredPosts = [];

  const blogList = document.getElementById("blog-list");
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // Fetch posts with embedded categories and media
  fetch(
    "http://localhost:8080/brightstar-cms/wp-json/wp/v2/posts?_embed&per_page=100"
  )
    .then((res) => res.json())
    .then((posts) => {
      allPosts = posts;
      filteredPosts = posts;
      populateCategories(posts);
      renderPosts();
      setupPagination();
    });

  // Extract unique categories from posts and populate dropdown
  function populateCategories(posts) {
    const categorySet = new Set();

    posts.forEach((post) => {
      const categories = post._embedded?.["wp:term"]?.flat() || [];
      categories.forEach((cat) => categorySet.add(cat.name));
    });

    const categories = Array.from(categorySet).sort();

    categories.forEach((catName) => {
      const option = document.createElement("option");
      option.value = catName;
      option.textContent = catName;
      categoryFilter.appendChild(option);
    });
  }

  // Filter posts by search and category
  function filterPosts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    filteredPosts = allPosts.filter((post) => {
      const title = post.title.rendered.toLowerCase();
      const categories =
        post._embedded?.["wp:term"]?.flat().map((c) => c.name.toLowerCase()) ||
        [];

      const matchesSearch =
        title.includes(searchText) ||
        categories.some((cat) => cat.includes(searchText));
      const matchesCategory =
        !selectedCategory ||
        categories.includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    currentPage = 1;
    renderPosts();
    updateButtons();
  }

  function renderPosts() {
    blogList.innerHTML = "";

    if (filteredPosts.length === 0) {
      blogList.innerHTML = `<p style="text-align:center; color:#666; font-size:1.2rem;">No posts found.</p>`;
      return;
    }

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = filteredPosts.slice(start, end);

    const searchText = searchInput.value.toLowerCase();

    pagePosts.forEach((post) => {
      const image =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/assets/images/img-featured.png";
      const categoriesRaw =
        post._embedded?.["wp:term"]?.flat().map((c) => c.name) || [];

      const postDate = new Date(post.date);
      const formattedDate = postDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Highlight matched text
      const highlight = (text) => {
        if (!searchText) return text;
        const regex = new RegExp(`(${searchText})`, "gi");
        return text.replace(regex, `<mark>$1</mark>`);
      };

      const highlightedTitle = highlight(post.title.rendered);
      const highlightedCategories = categoriesRaw
        .map((cat) => highlight(cat))
        .join(", ");

      const postEl = document.createElement("div");
      postEl.className = "blog-post";
      postEl.innerHTML = `
      <a href="/blog-detail.html?slug=${post.slug}">
        <div class="blog-post__img-box">${
          image
            ? `<img src="${image}" alt="${post.title.rendered}"/>`
            : "../assets/images/img-featured.png"
        }</div>
        <div class="blog-post-content">
          <h2 class="heading-tertiary u-margin-bottom-small">${highlightedTitle}</h2>
          <div class="categories lable-txt">${highlightedCategories}</div>
          <div class="post-date" >${formattedDate}</div>
          <div class="blog-excerpt">${post.excerpt.rendered}</div>
        </div>
      </a>
    `;
      blogList.appendChild(postEl);
    });
  }

  function setupPagination() {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPosts();
        updateButtons();
      }
    });

    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderPosts();
        updateButtons();
      }
    });

    searchInput.addEventListener("input", filterPosts);
    categoryFilter.addEventListener("change", filterPosts);

    updateButtons();
  }

  function updateButtons() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
  }
});
