"use strict";

/* --------------------------------------------------
   Current year
-------------------------------------------------- */

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

/* --------------------------------------------------
   Active navigation item
-------------------------------------------------- */

const currentPage = document.body.dataset.page;

if (currentPage) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* --------------------------------------------------
   Mobile navigation
-------------------------------------------------- */

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function closeNavigation() {
  if (!navToggle || !navLinks) {
    return;
  }

  navToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("open");
  document.body.classList.remove("nav-open");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen =
      navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    navLinks.classList.toggle("open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeNavigation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });
}

/* --------------------------------------------------
   FAQ accordion

   Only one answer is kept open at a time inside
   each element carrying data-accordion="single".
-------------------------------------------------- */

document
  .querySelectorAll('[data-accordion="single"]')
  .forEach((accordion) => {
    const items = accordion.querySelectorAll("details");

    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) {
          return;
        }

        items.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.open = false;
          }
        });
      });
    });
  });

/* --------------------------------------------------
   Static GitHub Pages contact form

   No backend is required. The form creates a
   pre-filled email and opens the visitor's mail app.
-------------------------------------------------- */

const demoForm = document.getElementById("demo-form");

if (demoForm) {
  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(demoForm);

    const name = formData.get("name")?.toString().trim() || "";
    const hotel = formData.get("hotel")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const rooms = formData.get("rooms")?.toString().trim() || "";
    const plan = formData.get("plan")?.toString().trim() || "";
    const message =
      formData.get("message")?.toString().trim() || "";

    const subject =
      `Hotelmanagement-Flow Demo Request - ${hotel || name}`;

    const body = [
      "Hello,",
      "",
      "I would like to request a Hotelmanagement-Flow demo.",
      "",
      `Name: ${name}`,
      `Hotel / Property: ${hotel}`,
      `Email: ${email}`,
      `Number of rooms: ${rooms}`,
      `Interested package: ${plan}`,
      "",
      "Message:",
      message,
      "",
      "Best regards,",
      name
    ].join("\n");

    const mailto =
      "mailto:hotelmanagementflow@gmail.com" +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}
