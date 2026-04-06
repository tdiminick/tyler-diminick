import "./style.css";

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const navLogo = document.querySelector(".nav-logo");
const actingCard = document.getElementById("card-acting");
const engineeringCard = document.getElementById("card-engineering");

let revealTimers = [];

function navigate(pageId) {
  revealTimers.forEach(clearTimeout);
  revealTimers = [];

  pages.forEach((p) => p.classList.remove("active"));
  navLinks.forEach((l) => l.classList.remove("active"));

  const page = document.getElementById(pageId);
  page.classList.add("active");
  document.querySelector(`[data-page="${pageId}"]`)?.classList.add("active");

  history.replaceState(null, "", pageId === "home" ? "/" : `#${pageId}`);

  const reveals = page.querySelectorAll(".reveal");
  reveals.forEach((el) => el.classList.remove("visible"));

  requestAnimationFrame(() => {
    reveals.forEach((el) => {
      const delay = parseInt(el.dataset.delay || "0", 10);
      revealTimers.push(setTimeout(() => el.classList.add("visible"), delay));
    });
  });

  window.scrollTo({ top: 0 });
}

function getPageFromHash() {
  const hash = location.hash.replace("#", "");
  return document.getElementById(hash) ? hash : "home";
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
    const other = cards.find((c) => c !== card);
    const side = card.dataset.side;

    function setHover(hovering) {
      if (window.innerWidth > 640) {
        card.style.flex = hovering ? "1.3" : "1";
        other.style.flex = hovering ? "0.7" : "1";
      }
      card.classList.toggle(`hovered-${side}`, hovering);
    }

    card.addEventListener("mouseenter", () => setHover(true));
    card.addEventListener("mouseleave", () => setHover(false));
  });

  actingCard.addEventListener("click", () => navigate("acting"));
  engineeringCard.addEventListener("click", () => navigate("engineering"));
}

setupDualCards();

// Navigate to the page in the URL hash, or home
navigate(getPageFromHash());
