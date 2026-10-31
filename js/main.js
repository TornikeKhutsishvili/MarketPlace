"use strict";

/* Shared utilities: cart store, product card rendering, navigation, toast. */
window.MP = window.MP || {};

MP.formatPrice = (n) => `${n.toFixed(2)} ₾`;
MP.getProduct = (id) => MP.products.find((p) => p.id === Number(id));

MP.escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Cart (localStorage) ---------- */
MP.cart = {
  key: "marketplace-cart",
  read() {
    try {
      const data = JSON.parse(localStorage.getItem(this.key));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },
  write(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
    MP.updateBadge();
  },
  add(id, qty = 1) {
    const items = this.read();
    const line = items.find((i) => i.id === id);
    if (line) line.qty = Math.min(99, line.qty + qty);
    else items.push({ id, qty });
    this.write(items);
  },
  setQty(id, qty) {
    const items = this.read()
      .map((i) => (i.id === id ? { ...i, qty: Math.max(0, Math.min(99, qty)) } : i))
      .filter((i) => i.qty > 0);
    this.write(items);
  },
  remove(id) {
    this.write(this.read().filter((i) => i.id !== id));
  },
  clear() {
    this.write([]);
  },
  count() {
    return this.read().reduce((sum, i) => sum + i.qty, 0);
  }
};

MP.updateBadge = () => {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = MP.cart.count();
  });
};

/* ---------- Toast ---------- */
MP.toast = (message) => {
  const el = document.createElement("div");
  el.className = "toast";
  el.setAttribute("role", "status");
  el.textContent = message;
  document.body.append(el);
  setTimeout(() => el.remove(), 2500);
};

/* ---------- Product card ---------- */
MP.cardHTML = (p) => {
  const cat = MP.categories.find((c) => c.id === p.category);
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return `
  <article class="card">
    <a class="card-media" href="product.html?id=${p.id}" style="--c1:${p.colors[0]};--c2:${p.colors[1]}" aria-label="${MP.escape(p.name)}">
      <span aria-hidden="true">${p.emoji}</span>
    </a>
    <div class="card-body">
      ${discount ? `<span class="tag">-${discount}%</span>` : ""}
      <span class="card-cat">${cat ? cat.name : ""}</span>
      <h3><a href="product.html?id=${p.id}">${MP.escape(p.name)}</a></h3>
      <span class="rating" aria-label="რეიტინგი ${p.rating} 5-დან">★ ${p.rating}</span>
      <span class="price">${MP.formatPrice(p.price)}${p.oldPrice ? `<s>${MP.formatPrice(p.oldPrice)}</s>` : ""}</span>
      <div class="card-actions">
        <button class="btn btn--sm" type="button" data-add="${p.id}">კალათაში დამატება</button>
      </div>
    </div>
  </article>`;
};

/* Event delegation: any [data-add] button adds the product to the cart. */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const p = MP.getProduct(btn.dataset.add);
  MP.cart.add(p.id);
  MP.toast(`„${p.name}“ დაემატა კალათაში`);
});

/* ---------- Mobile menu ---------- */
document.addEventListener("DOMContentLoaded", () => {
  MP.updateBadge();
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

window.addEventListener("storage", MP.updateBadge);
