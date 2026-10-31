"use strict";

/* Home page: categories + featured products. */
(() => {
  const cats = document.getElementById("category-list");
  const featured = document.getElementById("featured-list");
  if (cats) {
    cats.innerHTML = MP.categories
      .map((c) => `<a class="category-card" href="catalog.html?category=${c.id}"><span class="icon" aria-hidden="true">${c.icon}</span>${c.name}</a>`)
      .join("");
  }
  if (featured) {
    featured.innerHTML = [...MP.products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
      .map(MP.cardHTML)
      .join("");
  }
})();
