"use strict";

/* Catalog: search, category/price filters, sorting. State is reflected in the URL. */
(() => {
  const form = document.getElementById("filter-form");
  const list = document.getElementById("product-list");
  if (!form || !list) return;

  const count = document.getElementById("result-count");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const maxPrice = document.getElementById("max-price");
  const maxPriceOut = document.getElementById("max-price-out");
  const catBox = document.getElementById("category-filters");

  catBox.innerHTML = MP.categories
    .map((c) => `<label><input type="checkbox" name="category" value="${c.id}"> ${c.icon} ${c.name}</label>`)
    .join("");

  const params = new URLSearchParams(location.search);
  if (params.get("q")) search.value = params.get("q");
  if (params.get("category")) {
    const box = form.querySelector(`input[value="${CSS.escape(params.get("category"))}"]`);
    if (box) box.checked = true;
  }

  const sorters = {
    popular: (a, b) => b.rating - a.rating,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name, "ka")
  };

  function render() {
    const q = search.value.trim().toLowerCase();
    const cats = [...form.querySelectorAll('input[name="category"]:checked')].map((i) => i.value);
    const max = Number(maxPrice.value);
    maxPriceOut.textContent = MP.formatPrice(max);

    const result = MP.products
      .filter((p) => (!q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)))
      .filter((p) => !cats.length || cats.includes(p.category))
      .filter((p) => p.price <= max)
      .sort(sorters[sort.value]);

    count.textContent = `ნაპოვნია ${result.length} პროდუქტი`;
    list.innerHTML = result.length
      ? result.map(MP.cardHTML).join("")
      : '<p class="empty">პროდუქტი ვერ მოიძებნა. სცადეთ სხვა ფილტრები.</p>';
  }

  form.addEventListener("input", render);
  form.addEventListener("submit", (e) => e.preventDefault());
  form.addEventListener("reset", () => setTimeout(render));

  const toggle = document.querySelector(".filters-toggle");
  toggle.addEventListener("click", () => {
    const open = form.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  render();
})();
