"use strict";

/* Client-side validation for login, register and contact forms (+ auth tabs). */
(() => {
  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს"),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "შეიყვანეთ სწორი ელ-ფოსტა"),
    password: (v) =>
      v.length >= 8 && /\d/.test(v) && /[A-Za-z]/.test(v) ? "" : "პაროლი: მინიმუმ 8 სიმბოლო, ასო და ციფრი",
    confirm: (v, form) => (v === form.elements.password.value ? "" : "პაროლები არ ემთხვევა"),
    message: (v) => (v.trim().length >= 10 ? "" : "შეტყობინება მინიმუმ 10 სიმბოლო უნდა იყოს"),
    phone: (v) => (!v || /^\+?\d[\d\s-]{7,14}$/.test(v) ? "" : "არასწორი ტელეფონის ნომერი")
  };

  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const error = rule(input.value, input.form);
    const field = input.closest(".field");
    field.classList.toggle("has-error", Boolean(error));
    input.setAttribute("aria-invalid", String(Boolean(error)));
    field.querySelector(".error-msg").textContent = error;
    return !error;
  }

  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.noValidate = true;
    form.addEventListener("blur", (e) => e.target.name && validateField(e.target), true);
    form.addEventListener("input", (e) => {
      if (e.target.closest(".field")?.classList.contains("has-error")) validateField(e.target);
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = [...form.elements].filter((el) => el.name);
      const results = inputs.map(validateField);
      if (results.includes(false)) {
        inputs[results.indexOf(false)].focus();
        return;
      }
      const status = form.querySelector(".form-status");
      status.hidden = false;
      status.textContent = form.dataset.success;
      form.reset();
    });
  });

  /* Login / register tabs */
  const tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        const active = t === tab;
        t.setAttribute("aria-selected", String(active));
        document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
      });
    })
  );
})();
