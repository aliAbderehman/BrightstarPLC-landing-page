const featuredQuery = `
{
  posts(where: { tagSlugIn: ["featured"] }) {
    nodes {
      title
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        nodes {
          name
        }
      }
    }
  }
}
`;

const cardContainer = document.getElementById("cardContainer");

// Replace with the full URL to your WordPress REST API
const wordpressBaseURL = "http://localhost/brightstar-cms/wp-json/wp/v2";
const featuredTagSlug = "featured";

// First, get the ID of the "featured" tag
async function getFeaturedTagId() {
  const res = await fetch(`${wordpressBaseURL}/tags?slug=${featuredTagSlug}`);
  const data = await res.json();
  return data.length > 0 ? data[0].id : null;
}

// Then, fetch the posts with the featured tag
const spinner = document.getElementById("loadingSpinner");

async function fetchFeaturedPosts() {
  spinner.style.display = "flex"; // Show spinner
  cardContainer.style.display = "none"; // Hide cards while loading

  try {
    const tagId = await getFeaturedTagId();
    if (!tagId) return [];

    const response = await fetch(
      `${wordpressBaseURL}/posts?tags=${tagId}&_embed&per_page=4`
    );
    return await response.json();
  } catch (err) {
    console.error("Failed to fetch featured posts:", err);
    return [];
  } finally {
    spinner.style.display = "none"; // Hide spinner
    cardContainer.style.display = "flex"; // Show cards again
  }
}

// Render each post as a blog card
function renderCards(posts) {
  cardContainer.innerHTML = ""; // Clear existing cards

  posts.forEach((post) => {
    const title = post.title.rendered;

    const excerpt = post.excerpt.rendered;
    const category = post._embedded["wp:term"][0]?.[0]?.name || "General";
    const image =
      post._embedded["wp:featuredmedia"]?.[0]?.source_url ||
      "/assets/images/img-featured.png"; // fallback
    const link = post.link; // full post URL from WordPress

    const rawDate = post.date;
    const date = new Date(rawDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const card = document.createElement("div");
    card.classList.add("blog__card");
    card.classList.add("glass");

    card.innerHTML = `
    <a href="/pages/blog-detail.html?slug=${post.slug}" >
      <div class="blog__img-box">
        <img src="${image}" alt="${title}" loading="lazy" />
      </div>
      <div class="blog__card-content">
        <div class="blog__card-catagory">
          <h3 class="blog__catagory">${category}</h3>
          <p class="text--small u-margin-bottom-small">${date}</p>
        </div>
        <div class="blog__title-sec">
          <h3 class="heading-tertiary blog__card-title u-margin-bottom-small">${title}</h3>
          <div class="lable-txt blog__card-text">${excerpt}</div>
          <a href="/pages/blog-detail.html?slug=${post.slug}" class="btn btn--read-more">Read More &rarr;</a>
        </div>
      </div>
    </a>
  `;

    cardContainer.appendChild(card);
  });

  // ✅ Notify GSAP or other scripts that posts are now in the DOM
  document.dispatchEvent(new Event("blogsReady"));
}

// Run it
fetchFeaturedPosts().then((posts) => {
  renderCards(posts);
  setupScroll(); // <- call it here AFTER rendering cards
});
