/* ==========================================
   மகிழ்ச்சி Decor Studio — script.js (redesign)
========================================== */

// Header goes solid after scrolling past hero
const header = document.getElementById("siteHeader");
const setHeaderState = () => {
    if (header) header.classList.toggle("solid", window.scrollY > 60);
};
setHeaderState();
window.addEventListener("scroll", setHeaderState);

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        navToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });
}

// Smooth Scroll (also closes mobile nav)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || href.length < 2) return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });

            if (siteNav && siteNav.classList.contains("open")) {
                siteNav.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        }
    });
});

// Animated Counter
// Each counter declares its own target number + suffix via data attributes
// (data-count-target, data-suffix), or is marked data-static="true" to skip
// animation entirely (e.g. "24x7", which isn't a number to count up to).
const counters = document.querySelectorAll(".counter h3");
const speed = 140;

const runCounters = () => {
    counters.forEach(counter => {
        if (counter.dataset.animated) return;
        counter.dataset.animated = "true";

        if (counter.dataset.static === "true") return;

        const number = parseInt(counter.dataset.countTarget, 10);
        const suffix = counter.dataset.suffix || "";
        if (isNaN(number)) return;

        const increment = Math.max(1, Math.ceil(number / speed));
        let current = 0;

        const animate = () => {
            if (current < number) {
                current = Math.min(current + increment, number);
                counter.innerText = current + suffix;
                requestAnimationFrame(animate);
            } else {
                counter.innerText = number + suffix;
            }
        };
        animate();
    });
};

const counterFrame = document.querySelector(".stat-frame");
if (counterFrame) {
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounters();
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.35 });
    counterObserver.observe(counterFrame);
}

// Fade / reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".hidden").forEach(el => revealObserver.observe(el));

// Hero kolam draw-in
const heroKolam = document.getElementById("heroKolam");
if (heroKolam) {
    const shapes = heroKolam.querySelectorAll("path, circle");
    shapes.forEach((shape, i) => {
        const length = shape.getTotalLength ? shape.getTotalLength() : 300;
        shape.style.strokeDasharray = length;
        shape.style.strokeDashoffset = length;
        shape.style.transition = `stroke-dashoffset 1.6s cubic-bezier(.22,.61,.36,1) ${i * 0.06}s`;
    });
    requestAnimationFrame(() => {
        setTimeout(() => {
            shapes.forEach(shape => { shape.style.strokeDashoffset = 0; });
        }, 200);
    });
}

// Scroll To Top
const topButton = document.createElement("div");
topButton.className = "scroll-top";
topButton.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.classList.toggle("active", window.scrollY > 300);
});

topButton.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// Ripple Effect
document.querySelectorAll(".btn, .quote-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
        const circle = document.createElement("span");
        circle.className = "ripple";
        const rect = this.getBoundingClientRect();
        circle.style.left = e.clientX - rect.left + "px";
        circle.style.top = e.clientY - rect.top + "px";
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    });
});

// Copy UPI
const upi = document.querySelector(".upi");
if (upi) {
    upi.style.cursor = "pointer";
    upi.title = "Click to Copy";
    upi.onclick = () => {
        navigator.clipboard.writeText("8248859680tv5@ibl");
        alert("UPI ID Copied!");
    };
}

// Floating WhatsApp Pulse
const whatsapp = document.querySelector(".floating-whatsapp");
setInterval(() => {
    if (whatsapp) {
        whatsapp.style.transform = "scale(1.15)";
        setTimeout(() => { whatsapp.style.transform = "scale(1)"; }, 400);
    }
}, 4000);

// Gallery Image Click (lightbox)
document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
        const popup = document.createElement("div");
        popup.className = "lightbox";
        popup.innerHTML = `<div class="lightbox-content"><img src="${img.src}" alt="${img.alt}"></div>`;
        document.body.appendChild(popup);
        popup.onclick = () => popup.remove();
    });
});

// Loading Animation
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

console.log("மகிழ்ச்சி Decor Studio — redesign loaded");
