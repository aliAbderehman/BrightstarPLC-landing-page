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
const wordpressBaseURL = "http://localhost:8080/brightstar-cms/wp-json/wp/v2";
const featuredTagSlug = "featured";

// First, get the ID of the "featured" tag
async function getFeaturedTagId() {
  const res = await fetch(`${wordpressBaseURL}/tags?slug=${featuredTagSlug}`);
  const data = await res.json();
  return data.length > 0 ? data[0].id : null;
}

// Then, fetch the posts with the featured tag
async function fetchFeaturedPosts() {
  const tagId = await getFeaturedTagId();
  if (!tagId) return [];

  const response = await fetch(
    `${wordpressBaseURL}/posts?tags=${tagId}&_embed&per_page=4`
  );
  return await response.json();
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
      "./assets/images/placeholder.jpg"; // fallback
    const link = post.link; // full post URL from WordPress

    const card = document.createElement("div");
    card.classList.add("blog__card");

    card.innerHTML = `
  <a href="blog.html?slug=${post.slug}" class="blog__card-link">
    <div class="blog__img-box">
      <img src="${image}" alt="${title}" />
    </div>
    <h3 class="blog__catagory">${category}</h3>
    <div class="blog__title-sec">
      <h3 class="heading-tertiary">${title}</h3>
      <div class="lable-txt">${excerpt}</div>
    </div>
  </a>
`;

    cardContainer.appendChild(card);
  });
}

// Run it
fetchFeaturedPosts().then((posts) => {
  renderCards(posts);
  setupScroll(); // <- call it here AFTER rendering cards
});

// function renderPosts(posts, cardContainer) {
//   const container = document.getElementById(cardContainer);
//   if (!container) {
//     console.error(`No element with ID "${sectionId}" found.`);
//     return;
//   }

//   // Limit to 4 posts (or however many cards you want)
//   const limitedPosts = posts.slice(0, 4);

//   // Clear old cards
//   container.innerHTML = "";

//   limitedPosts.forEach((post) => {
//     const card = document.createElement("div");
//     card.classList.add("blog__card");

//     const category = post.categories?.nodes?.[0]?.name || "Uncategorized";
//     const imgSrc =
//       post.featuredImage?.node?.sourceUrl || "./assets/images/fallback.jpg";
//     const title = post.title || "No Title";
//     const excerpt = post.excerpt || "No description available.";

//     card.innerHTML = `
//       <div class="blog__img-box">
//         <img src="${imgSrc}" alt="${title}" />
//       </div>
//       <h3 class="blog__catagory">${category}</h3>
//       <div class="blog__title-sec">
//         <h3 class="heading-tertiary">${title}</h3>
//         <p class="lable-txt">${excerpt}</p>
//       </div>
//     `;

//     container.appendChild(card);
//   });
// }

// // Fetch featured posts from WordPress GraphQL
// fetch("http://localhost:8080/brightstar-cms/graphql", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ query: featuredQuery }),
// })
//   .then((res) => res.json())
//   .then((result) => {
//     const posts = result?.data?.posts?.nodes;
//     if (!posts || posts.length === 0) {
//       document.getElementById("cardContainer").innerHTML =
//         "<p>No featured posts found.</p>";
//       return;
//     }
//     renderPosts(posts, "cardContainer");
//   })
//   .catch((err) => {
//     console.error("Failed to load posts:", err);
//     document.getElementById("cardContainer").innerHTML =
//       "<p>Failed to load posts.</p>";
//   });
