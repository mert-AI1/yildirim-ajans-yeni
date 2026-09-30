/* =========================================================
   YILDIRIM AJANS — NEW CINEMATIC INTERACTION
   Loading + snow preserved
========================================================= */

const loader = document.getElementById("loader");
const loadingProgress = document.getElementById("loadingProgress");

/* ================= LOADING — KORUNDU ================= */
let progress = 0;

const loadingTimer = setInterval(() => {
  progress += Math.floor(Math.random() * 5) + 1;

  if (progress >= 100) {
    progress = 100;
    clearInterval(loadingTimer);

    setTimeout(() => {
      loader.classList.add("finished");
      document.body.classList.add("site-ready");
    }, 450);
  }

  loadingProgress.style.width = progress + "%";
}, 65);

/* ================= SNOW — KORUNDU ================= */
const snow = document.querySelector(".snow");

const snowCount = window.innerWidth <= 760 ? 55 : 90;

for (let i = 0; i < snowCount; i++) {
  const flake = document.createElement("span");

  flake.className = "snowflake";
  flake.textContent = Math.random() > 0.65 ? "❄" : "•";

  const size = Math.random() * 12 + 5;
  const opacity = Math.random() * 0.55 + 0.2;
  const blur = Math.random() * 1.8;

  flake.style.left = Math.random() * 100 + "%";
  flake.style.setProperty("--snow-size", size + "px");
  flake.style.setProperty("--snow-opacity", opacity);
  flake.style.setProperty("--snow-blur", blur + "px");

  flake.style.setProperty(
    "--snow-duration",
    Math.random() * 13 + 10 + "s"
  );

  flake.style.setProperty(
    "--snow-delay",
    Math.random() * -20 + "s"
  );

  flake.style.setProperty(
    "--snow-drift-1",
    (Math.random() * 100 - 50) + "px"
  );

  flake.style.setProperty(
    "--snow-drift-2",
    (Math.random() * 160 - 80) + "px"
  );

  flake.style.setProperty(
    "--snow-drift-3",
    (Math.random() * 120 - 60) + "px"
  );

  flake.style.setProperty(
    "--snow-drift-4",
    (Math.random() * 180 - 90) + "px"
  );

  snow.appendChild(flake);
}

/* ================= DESKTOP HORIZONTAL NAV ================= */
const track = document.getElementById("siteTrack");
const navLinks = document.querySelectorAll(".desktop-nav a");

function goToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  if (window.innerWidth > 900) {
    track.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth"
    });
  } else {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    goToSection(link.getAttribute("href").replace("#", ""));
  });
});

/* Anchor links anywhere on page */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const id = link.getAttribute("href").slice(1);
    if (!id || id === "home") {
      event.preventDefault();
      goToSection("home");
    }
  });
});

/* ================= WHEEL -> HORIZONTAL ================= */
let wheelLocked = false;

if (window.innerWidth > 900) {
  track.addEventListener(
    "wheel",
    event => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();

      if (wheelLocked) return;
      wheelLocked = true;

      track.scrollBy({
        left: event.deltaY * 1.25,
        behavior: "smooth"
      });

      setTimeout(() => {
        wheelLocked = false;
      }, 650);
    },
    { passive: false }
  );
}

/* ================= MOBILE MENU ================= */
const menuBtn = document.querySelector(".menu-btn");
const desktopNav = document.querySelector(".desktop-nav");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    desktopNav.classList.toggle("mobile-open");
  });
}

/* ================= REVEAL ================= */
const revealItems = document.querySelectorAll(".reveal");

function revealAll() {
  revealItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("visible");
    }, 120 + index * 60);
  });
}

if (window.innerWidth > 900) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      root: track,
      threshold: 0.18
    }
  );

  revealItems.forEach(item => observer.observe(item));
} else {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(item => observer.observe(item));
}

/* ================= MOUSE PARALLAX ================= */
const coreStage = document.querySelector(".core-stage");

if (coreStage && window.innerWidth > 900) {
  coreStage.addEventListener("mousemove", event => {
    const rect = coreStage.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    coreStage.style.transform =
      `translateY(-47%) translate(${x * 10}px, ${y * 10}px)`;
  });

  coreStage.addEventListener("mouseleave", () => {
    coreStage.style.transform = "translateY(-47%)";
  });
}

/* ================= DEVICE PARALLAX ================= */
const devicesScene = document.querySelector(".devices-scene");

if (devicesScene && window.innerWidth > 900) {
  devicesScene.addEventListener("mousemove", event => {
    const rect = devicesScene.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const laptop = devicesScene.querySelector(".laptop");
    const tablet = devicesScene.querySelector(".tablet");
    const phone = devicesScene.querySelector(".phone");

    if (laptop) {
      laptop.style.translate = `${x * 8}px ${y * 5}px`;
    }

    if (tablet) {
      tablet.style.translate = `${x * -12}px ${y * -7}px`;
    }

    if (phone) {
      phone.style.translate = `${x * 15}px ${y * 9}px`;
    }
  });

  devicesScene.addEventListener("mouseleave", () => {
    devicesScene.querySelector(".laptop").style.translate = "0 0";
    devicesScene.querySelector(".tablet").style.translate = "0 0";
    devicesScene.querySelector(".phone").style.translate = "0 0";
  });
}

/* ================= TOUCH / DRAG ON DESKTOP TRACK ================= */
let isDragging = false;
let startX = 0;
let startScroll = 0;

track.addEventListener("pointerdown", event => {
  if (window.innerWidth <= 900) return;

  isDragging = true;
  startX = event.clientX;
  startScroll = track.scrollLeft;
  track.setPointerCapture(event.pointerId);
});

track.addEventListener("pointermove", event => {
  if (!isDragging) return;

  const distance = event.clientX - startX;
  track.scrollLeft = startScroll - distance;
});

track.addEventListener("pointerup", () => {
  isDragging = false;
});

track.addEventListener("pointercancel", () => {
  isDragging = false;
});

/* ================= RESIZE ================= */
window.addEventListener("resize", () => {
  if (window.innerWidth <= 900) {
    track.style.scrollBehavior = "smooth";
  }
});

/* ================= INITIAL REVEAL ================= */
setTimeout(() => {
  const firstPanelItems = document.querySelectorAll("#home .reveal");
  firstPanelItems.forEach((item, index) => {
    setTimeout(() => item.classList.add("visible"), index * 140);
  });
}, 700);


/* ================= PRIVACY / COPYRIGHT MODAL ================= */
const legalModal = document.getElementById("legalModal");
const legalContinue = document.getElementById("legalContinue");

function showLegalModal() {
  if (!legalModal) return;
  legalModal.classList.add("is-visible");
  document.body.classList.add("legal-open");
  setTimeout(() => legalContinue?.focus(), 250);
}

function closeLegalModal() {
  if (!legalModal) return;
  legalModal.classList.remove("is-visible");
  document.body.classList.remove("legal-open");
}

legalContinue?.addEventListener("click", closeLegalModal);

legalModal?.addEventListener("click", event => {
  if (event.target === legalModal) closeLegalModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && legalModal?.classList.contains("is-visible")) {
    closeLegalModal();
  }
});

/* Loader tamamlandıktan sonra uyarıyı göster */
setTimeout(showLegalModal, 1900);
