import "./style.css";

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const navLogo = document.querySelector(".nav-logo");
const actingCard = document.getElementById("card-acting");
const engineeringCard = document.getElementById("card-engineering");

function navigate(pageId) {
  pages.forEach((p) => p.classList.remove("active"));
  navLinks.forEach((l) => l.classList.remove("active"));

  document.getElementById(pageId).classList.add("active");
  document.querySelector(`[data-page="${pageId}"]`)?.classList.add("active");

  // Re-trigger reveal animations
  const activeRevealElements = document
    .getElementById(pageId)
    .querySelectorAll(".reveal");
  activeRevealElements.forEach((el) => el.classList.remove("visible"));

  // Force reflow then stagger reveals
  requestAnimationFrame(() => {
    activeRevealElements.forEach((el) => {
      const delay = parseInt(el.dataset.delay || "0", 10);
      setTimeout(() => el.classList.add("visible"), delay);
    });
  });

  window.scrollTo({ top: 0 });
}

// Nav link clicks
navLinks.forEach((link) => {
  link.addEventListener("click", () => navigate(link.dataset.page));
});
navLogo.addEventListener("click", () => navigate("home"));

// Home page dual-card hover effect
function setupDualCards() {
  const cards = [actingCard, engineeringCard];

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const side = card.dataset.side;
      card.style.flex = "1.3";
      card.querySelector(".dual-card-bg").classList.add(`hovered-${side}`);
      const other = cards.find((c) => c !== card);
      other.style.flex = "0.7";
    });

    card.addEventListener("mouseleave", () => {
      const side = card.dataset.side;
      card.style.flex = "1";
      card.querySelector(".dual-card-bg").classList.remove(`hovered-${side}`);
      const other = cards.find((c) => c !== card);
      other.style.flex = "1";
    });
  });

  actingCard.addEventListener("click", () => navigate("acting"));
  engineeringCard.addEventListener("click", () => navigate("engineering"));
}

setupDualCards();

// Kick off the home page reveals on load
navigate("home");
