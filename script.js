/* ==========================================
   மகிழ்ச்சி Decor Studio
   script.js
========================================== */

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Animated Counter

const counters = document.querySelectorAll(".counter h3");

const speed = 200;

counters.forEach(counter => {

    // Capture the ORIGINAL target value and suffix once,
    // before the animation starts overwriting the text.
    const value = counter.innerText;

    const number = parseInt(value.replace(/\D/g, ""), 10);

    const suffix = value.replace(/[0-9]/g, "");

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

// Fade Animation

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

document.querySelectorAll(

'.service-card,.gallery-item,.counter,.review-card,.contact-box'

).forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

});

// Scroll To Top

const topButton = document.createElement("div");

topButton.className = "scroll-top";

topButton.innerHTML = '<i class="fas fa-chevron-up"></i>';

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topButton.classList.add("active");

    } else {

        topButton.classList.remove("active");

    }

});

topButton.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

// Ripple Effect

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        circle.className = "ripple";

        const rect = this.getBoundingClientRect();

        circle.style.left = e.clientX - rect.left + "px";

        circle.style.top = e.clientY - rect.top + "px";

        this.appendChild(circle);

        setTimeout(() => {

            circle.remove();

        }, 600);

    });

});

// Copy UPI

const upi = document.querySelector(".upi");

if (upi) {

    upi.style.cursor = "pointer";

    upi.title = "Click to Copy";

    upi.onclick = () => {

        navigator.clipboard.writeText(

            "8248859680tv5@ibl"

        );

        alert("UPI ID Copied!");

    };

}

// Floating WhatsApp Pulse

const whatsapp = document.querySelector(".floating-whatsapp");

setInterval(() => {

    if (whatsapp) {

        whatsapp.style.transform = "scale(1.15)";

        setTimeout(() => {

            whatsapp.style.transform = "scale(1)";

        }, 400);

    }

}, 4000);

// Gallery Image Click

document.querySelectorAll(".gallery-item img").forEach(img => {

    img.addEventListener("click", () => {

        const popup = document.createElement("div");

        popup.className = "lightbox";

        popup.innerHTML = `

        <div class="lightbox-content">

        <img src="${img.src}">

        </div>

        `;

        document.body.appendChild(popup);

        popup.onclick = () => popup.remove();

    });

});

// Loading Animation

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

console.log("மகிழ்ச்சி Decor Studio Loaded Successfully");
