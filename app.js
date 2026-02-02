// Form submission handler
document.getElementById("enquireForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    parentName: this.querySelector('input[type="text"]').value,
    phone: this.querySelector('input[type="tel"]').value,
    grade: this.querySelectorAll('input[type="text"]')[1].value,
  };

  console.log("Form submitted:", formData);

  alert("Thank you for your enquiry! We will contact you soon.");

  this.reset();
});

// Smooth scroll for register button
document.querySelector(".register-btn").addEventListener("click", function () {
  // Scroll to form or handle registration
  document.querySelector(".enquire-form").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});

// school
const carousel = document.getElementById("carousel");
let isDown = false;
let startX;
let scrollLeft;

// Mouse drag scroll
carousel.addEventListener("mousedown", (e) => {
  isDown = true;
  carousel.style.cursor = "grabbing";
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mouseleave", () => {
  isDown = false;
  carousel.style.cursor = "grab";
});

carousel.addEventListener("mouseup", () => {
  isDown = false;
  carousel.style.cursor = "grab";
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});

// Touch drag scroll
let touchStartX = 0;
carousel.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("touchmove", (e) => {
  const touchX = e.touches[0].clientX;
  const walk = (touchStartX - touchX) * 2;
  carousel.scrollLeft = scrollLeft + walk;
});

// Button scroll
function scrollCarousel(direction) {
  const cardWidth = 340 + 24; // card width + gap
  carousel.scrollBy({
    left: direction * cardWidth,
    behavior: "smooth",
  });
}

// reviews

document.querySelectorAll(".review-card").forEach((card) => {
  const video = card.querySelector("video");
  const btn = card.querySelector(".play-btn");

  btn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      btn.style.display = "none";
    }
  });

  video.addEventListener("pause", () => {
    btn.style.display = "flex";
  });
});

const section = document.querySelector(".gallery-section");
const track = document.querySelector(".gallery-track");
const items = document.querySelectorAll(".gallery-item");

let currentX = 0;
let targetX = 0;

function getMaxScroll() {
  return track.scrollWidth - window.innerWidth + 200;
}

window.addEventListener("scroll", () => {
  const rect = section.getBoundingClientRect();

  if (rect.top < window.innerHeight && rect.bottom > 0) {
    const progress = 1 - rect.bottom / (window.innerHeight + rect.height);

    targetX = progress * getMaxScroll();
  }
});

function animate() {
  // Smooth interpolation (lerp)
  currentX += (targetX - currentX) * 0.08;

  track.style.transform = `translateX(${-currentX}px)`;

  // Wave animation
  items.forEach((item, i) => {
    const wave = Math.sin(currentX / 180 + i * 0.6) * 18;
    item.style.transform = `translateY(${wave}px)`;
  });

  requestAnimationFrame(animate);
}

animate();
