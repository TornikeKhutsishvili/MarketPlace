"use strict";

/* Cart page: quantity editing, removal, promo code, totals, checkout. */
(() => {
  const list = document.getElementById("cart-items");
  if (!list) return;

  const summary = document.getElementById("summary");
  const FREE_SHIPPING_FROM = 100;
  const SHIPPING = 8;
  const PROMO = { MARKET10: 0.1 };
  let discountRate = Number(sessionStorage.getItem("promo-rate")) || 0;

  function render() {
    const items = MP.cart.read().filter((i) => MP.getProduct(i.id));
    if (!items.length) {
      list.innerHTML = '<p class="empty">კალათა ცარიელია. <a href="catalog.html">დაათვალიერეთ კატალოგი</a></p>';
      summary.hidden = true;
      return;
    }
    summary.hidden = false;

    list.innerHTML = items
      .map((i) => {
        const p = MP.getProduct(i.id);
        return `
        <article class="cart-item">
          <div class="thumb" aria-hidden="true">${p.emoji}</div>
          <div>
            <h3><a href="product.html?id=${p.id}">${MP.escape(p.name)}</a></h3>
            <span class="price">${MP.formatPrice(p.price)}</span>
          </div>
          <div class="cart-item-side">
            <div class="qty" role="group" aria-label="რაოდენობა: ${MP.escape(p.name)}">
              <button type="button" data-dec="${p.id}" aria-label="შემცირება">−</button>
              <input type="number" min="1" max="99" value="${i.qty}" data-qty="${p.id}" aria-label="რაოდენობა">
              <button type="button" data-inc="${p.id}" aria-label="გაზრდა">+</button>
            </div>
            <strong>${MP.formatPrice(p.price * i.qty)}</strong>
            <button type="button" class="link-btn" data-remove="${p.id}">წაშლა</button>
          </div>
        </article>`;
      })
      .join("");

    const subtotal = items.reduce((s, i) => s + MP.getProduct(i.id).price * i.qty, 0);
    const discount = subtotal * discountRate;
    const shipping = subtotal - discount >= FREE_SHIPPING_FROM ? 0 : SHIPPING;
    document.getElementById("sum-subtotal").textContent = MP.formatPrice(subtotal);
    document.getElementById("sum-discount").textContent = `−${MP.formatPrice(discount)}`;
    document.getElementById("sum-shipping").textContent = shipping ? MP.formatPrice(shipping) : "უფასო";
    document.getElementById("sum-total").textContent = MP.formatPrice(subtotal - discount + shipping);
  }

  list.addEventListener("click", (e) => {
    const t = e.target;
    const current = (id) => MP.cart.read().find((i) => i.id === Number(id))?.qty ?? 0;
    if (t.dataset.inc) MP.cart.setQty(Number(t.dataset.inc), current(t.dataset.inc) + 1);
    else if (t.dataset.dec) MP.cart.setQty(Number(t.dataset.dec), current(t.dataset.dec) - 1);
    else if (t.dataset.remove) MP.cart.remove(Number(t.dataset.remove));
    else return;
    render();
  });
  list.addEventListener("change", (e) => {
    if (e.target.dataset.qty) {
      MP.cart.setQty(Number(e.target.dataset.qty), parseInt(e.target.value, 10) || 1);
      render();
    }
  });

  document.getElementById("promo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = document.getElementById("promo").value.trim().toUpperCase();
    const msg = document.getElementById("promo-msg");
    discountRate = PROMO[code] || 0;
    sessionStorage.setItem("promo-rate", String(discountRate));
    msg.textContent = discountRate ? "პრომო კოდი გააქტიურდა: -10%" : "პრომო კოდი არასწორია";
    render();
  });

  document.getElementById("checkout-btn").addEventListener("click", () => {
    MP.cart.clear();
    sessionStorage.removeItem("promo-rate");
    discountRate = 0;
    list.innerHTML = '<p class="form-status" role="status">✅ შეკვეთა წარმატებით გაფორმდა! მადლობა შენაძენისთვის.</p>';
    summary.hidden = true;
  });

  render();
})();
