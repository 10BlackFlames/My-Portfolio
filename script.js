/*
  PERSONALIZE THIS FILE: replace the example project descriptions and the
  contactLinks values below with your real project titles, URLs, and profiles.
  The portfolio deliberately avoids invented clients, job titles, or awards.
*/
const contactLinks = {
  email: "isaacolalemi23@outlook.com",
  github: "https://github.com/10BlackFlames",
  linkedin: "https://www.linkedin.com/in/olalemi-toluwani-27b0aa290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
};

const ignivoAppUrl = "https://ignivo-navy.vercel.app/";

const projects = [
  {
    title: "Splitly",
    category: "Web",
    type: "WEB APP / LIVE",
    summary: "Splitly is a split-the-bill expense tracker for shared costs. It keeps group spending organized and makes each person’s share easier to follow.",
    visual: "website",
    number: "01",
    url: "https://splitly-orcin.vercel.app/",
    previewUrl: "https://splitly-orcin.vercel.app/"
  },
  {
    title: "Virtual Museum",
    category: "Web",
    type: "DIGITAL MUSEUM / LIVE",
    summary: "A digital museum designed for exploring exhibits online. It brings a gallery-style experience into a virtual space.",
    visual: "website",
    number: "02",
    url: "https://virtual-museum-ebon.vercel.app/",
    previewUrl: "https://virtual-museum-ebon.vercel.app/"
  }
];

const grid = document.querySelector("#project-grid");
const resultLabel = document.querySelector("#project-category-label");
let revealObserver = null;
const previewArt = {
  website: '<div class="preview-browser"><div class="browser-bar"><i></i><i></i><i></i><b>your-next-idea.dev</b></div><div class="mock-layout"><div class="mock-nav"></div><div class="mock-hero"></div><div class="mock-row"><i></i><i></i><i></i></div></div></div>',
  code: '<div class="code-art"><span>const</span> idea = {<br>&nbsp;&nbsp;curiosity: <b>true</b>,<br>&nbsp;&nbsp;learning: <b>"always"</b>,<br>&nbsp;&nbsp;build: () =&gt; <span>create()</span><br>};<br><br><span>idea.build();</span></div>',
  game: '<div class="game-art"><div>PLAY<br>TO LEARN<i>▶ START EXPLORING</i></div></div>'
};

function renderProjects(filter = "All") {
  const visible = filter === "All" ? projects : projects.filter(project => project.category === filter);
  resultLabel.textContent = `${filter === "All" ? "SELECTED WORK" : filter.toUpperCase()} · ${String(visible.length).padStart(2, "0")} ${visible.length === 1 ? "PROJECT" : "PROJECTS"}`;
  resultLabel.id = `category-${filter.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  grid.innerHTML = visible.length ? visible.map((project, index) => `
    <article class="project-card" style="animation-delay:${index * 70}ms">
      <div class="project-preview">
        <span class="preview-label">${project.type}</span><span class="preview-index">${project.number} / ${String(projects.length).padStart(2, "0")}</span>
        ${project.previewUrl ? `<div class="live-preview project-live-preview"><div class="preview-fallback" aria-hidden="true"><strong>${project.title}</strong><span>LIVE PROJECT PREVIEW</span></div><iframe src="${project.previewUrl}" title="Live preview of ${project.title}" loading="lazy" referrerpolicy="no-referrer" tabindex="-1"></iframe></div>` : `<div class="preview-art">${previewArt[project.visual] || previewArt.website}</div>`}
        <a class="project-preview-link" href="${project.url}" ${/^https?:/.test(project.url) ? 'target="_blank" rel="noreferrer"' : ""} aria-label="Open ${project.title}"></a>
      </div>
      <div class="project-info"><div><h3>${project.title}</h3><p>${project.summary}</p></div><div class="project-meta"><span>${project.category.toUpperCase()}</span><b>↗</b></div></div>
    </article>`).join("") : '<p class="empty-state">New work is on its way.</p>';
  sizeLivePreviews();
  revealNewElements();
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    document.querySelectorAll(".filter").forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
    renderProjects(button.dataset.filter);
    window.location.hash = resultLabel.id;
    resultLabel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const ignivoAppLink = document.querySelector("#ignivo-app-link");
if (ignivoAppUrl) {
  ignivoAppLink.href = ignivoAppUrl;
  ignivoAppLink.textContent = "Open Ignivo app ↗";
  ignivoAppLink.target = "_blank";
  ignivoAppLink.rel = "noreferrer";
  ignivoAppLink.classList.remove("is-disabled");
  ignivoAppLink.removeAttribute("aria-disabled");
  ignivoAppLink.removeAttribute("tabindex");
} else {
  ignivoAppLink.href = "#ignivo";
  ignivoAppLink.textContent = "App link coming soon ↗";
  ignivoAppLink.classList.add("is-disabled");
  ignivoAppLink.setAttribute("aria-disabled", "true");
  ignivoAppLink.setAttribute("tabindex", "-1");
}

const emailLink = document.querySelector("#email-link");
const emailSmall = document.querySelector("#email-small");
const enquirySubject = "Portfolio enquiry";
const enquiryBody = "Hi Toluwani,\n\nI came across your portfolio and would like to enquire about working together.\n\nProject or opportunity:\nTimeline:\nAnything else:\n\nBest,\n[Your name]";
const enquiryMailto = `mailto:${contactLinks.email}?subject=${encodeURIComponent(enquirySubject)}&body=${encodeURIComponent(enquiryBody)}`;
emailLink.href = enquiryMailto;
emailSmall.href = enquiryMailto;
document.querySelectorAll("[data-social]").forEach(link => {
  const url = contactLinks[link.dataset.social];
  link.href = url;
  if (url !== "#") { link.target = "_blank"; link.rel = "noreferrer"; }
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  nav.classList.toggle("open", open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}));

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll("[data-count]").forEach(count => {
  const category = count.dataset.count;
  const amount = category === "All" ? projects.length : projects.filter(project => project.category === category).length;
  count.textContent = String(amount).padStart(2, "0");
});
document.querySelectorAll(".filter").forEach(button => {
  const category = button.dataset.filter;
  const amount = category === "All" ? projects.length : projects.filter(project => project.category === category).length;
  button.querySelector("[data-count]").textContent = String(amount).padStart(2, "0");
});
renderProjects();

function sizeLivePreviews() {
  document.querySelectorAll(".live-preview").forEach(preview => {
    const scale = Math.min(preview.clientWidth / 1440, preview.clientHeight / 900);
    preview.style.setProperty("--preview-scale", String(scale));
  });
}

window.addEventListener("resize", sizeLivePreviews);
sizeLivePreviews();

function revealNewElements() {
  if (!("IntersectionObserver" in window)) return;
  revealObserver ||= new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -35px 0px" });
  const selector = "#work .section-heading, .project-card, .ignivo-copy, .ignivo-visual, .about-grid > *, .stack-list > div, .contact-section > .eyebrow, .contact-section > h2, .contact-section > .contact-intro, .contact-actions";
  document.querySelectorAll(selector).forEach(element => {
    if (element.dataset.revealReady) return;
    element.dataset.revealReady = "true";
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}
revealNewElements();

const progressFill = document.querySelector("#scroll-progress-fill");
function updateScrollDetails() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressFill.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
  const sectionIds = ["work", "about", "stack", "contact"];
  const current = sectionIds.map(id => document.getElementById(id)).filter(section => section.getBoundingClientRect().top <= 140).at(-1)?.id;
  document.querySelectorAll(".nav-links a[href^='#']").forEach(link => {
    if (link.getAttribute("href") === `#${current}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("scroll", updateScrollDetails, { passive: true });
window.addEventListener("resize", updateScrollDetails);
updateScrollDetails();

const heroArt = document.querySelector(".hero-art");
heroArt.addEventListener("pointermove", event => {
  const bounds = heroArt.getBoundingClientRect();
  heroArt.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
  heroArt.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
});
heroArt.addEventListener("pointerleave", () => {
  heroArt.style.removeProperty("--pointer-x");
  heroArt.style.removeProperty("--pointer-y");
});

const copyEmailButton = document.querySelector("#copy-email");
copyEmailButton.addEventListener("click", async () => {
  const original = "Copy email ⧉";
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(contactLinks.email);
      copied = true;
    }
  } catch { /* Try the local fallback below. */ }

  if (!copied) {
    const field = document.createElement("textarea");
    field.value = contactLinks.email;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    field.style.pointerEvents = "none";
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, field.value.length);
    try { copied = document.execCommand("copy"); } catch { copied = false; }
    field.remove();
  }

  if (!copied) {
    copyEmailButton.textContent = contactLinks.email;
    copyEmailButton.setAttribute("aria-label", `Automatic copy unavailable. Email selected: ${contactLinks.email}`);
    const range = document.createRange();
    range.selectNodeContents(copyEmailButton);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    return;
  }

  copyEmailButton.textContent = "Email copied ✓";
  copyEmailButton.setAttribute("aria-label", "Email address copied");
  window.setTimeout(() => {
    copyEmailButton.textContent = original;
    copyEmailButton.setAttribute("aria-label", "Copy email address");
  }, 2600);
});
