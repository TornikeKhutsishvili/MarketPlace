"use strict";

/* Product detail page driven by ?id= query parameter. */
(() => {
  const root = document.getElementById("product-root");
  if (!root) return;

  const p = MP.getProduct(new URLSearchParams(location.search).get("id"));
  if (!p) {
    root.innerHTML = '<p class="empty">პროდუქტი ვერ მოიძებნა. <a href="catalog.html">დაბრუნება კატალოგში</a></p>';
    return;
  }

  document.title = `${p.name} — MarketPlace`;
  const cat = MP.categories.find((c) => c.id === p.category);
  const specs = Object.entries(p.specs)
    .map(([k, v]) => `<tr><th scope="row">${MP.escape(k)}</th><td>${MP.escape(v)}</td></tr>`)
    .join("");

  root.innerHTML = `
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="index.html">მთავარი</a> / <a href="catalog.html?category=${p.category}">${cat.name}</a> / ${MP.escape(p.name)}
    </nav>
    <div class="product-detail">
      <div class="card-media" style="--c1:${p.colors[0]};--c2:${p.colors[1]}" role="img" aria-label="${MP.escape(p.name)}">${p.emoji}</div>
      <div class="product-info">
        <h1>${MP.escape(p.name)}</h1>
        <p class="rating">★ ${p.rating} · გამყიდველი: ${MP.escape(p.seller)}</p>
        <p class="price">${MP.formatPrice(p.price)}${p.oldPrice ? `<s>${MP.formatPrice(p.oldPrice)}</s>` : ""}</p>
        <p>${MP.escape(p.desc)}</p>
        <div class="qty" role="group" aria-label="რაოდენობა">
          <button type="button" id="qty-minus" aria-label="შემცირება">−</button>
          <input id="qty" type="number" min="1" max="99" value="1" aria-label="რაოდენობა">
          <button type="button" id="qty-plus" aria-label="გაზრდა">+</button>
        </div>
        <p><button class="btn btn--accent" type="button" id="add-btn">🛒 კალათაში დამატება</button></p>
        <table class="specs"><caption class="visually-hidden">მახასიათებლები</caption><tbody>${specs}</tbody></table>
      </div>
    </div>`;

  const qty = document.getElementById("qty");
  const clamp = () => { qty.value = Math.min(99, Math.max(1, parseInt(qty.value, 10) || 1)); };
  document.getElementById("qty-minus").addEventListener("click", () => { qty.value = Number(qty.value) - 1; clamp(); });
  document.getElementById("qty-plus").addEventListener("click", () => { qty.value = Number(qty.value) + 1; clamp(); });
  qty.addEventListener("change", clamp);
  document.getElementById("add-btn").addEventListener("click", () => {
    clamp();
    MP.cart.add(p.id, Number(qty.value));
    MP.toast(`დაემატა კალათაში (${qty.value})`);
  });

  const related = MP.products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const box = document.getElementById("related-list");
  if (box) box.innerHTML = related.map(MP.cardHTML).join("");
  if (!related.length) document.getElementById("related-section")?.remove();
})();
