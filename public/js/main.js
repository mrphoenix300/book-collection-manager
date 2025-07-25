// Book cover hover effect
document.querySelectorAll(".book-cover").forEach((cover) => {
  cover.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
    this.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
  });

  cover.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  });
});

// Card hover effect
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.boxShadow = "0 6px 20px rgba(0,0,0,0.09)";
  });
});

// Rating star hover effect
document.querySelectorAll(".rating-stars span").forEach((star) => {
  star.addEventListener("mouseenter", function () {
    if (this.classList.contains("inactive")) {
      this.style.color = "#ffec99";
    } else {
      this.style.color = "#ffd43b";
    }
  });

  star.addEventListener("mouseleave", function () {
    if (this.classList.contains("inactive")) {
      this.style.color = "#e9ecef";
    } else {
      this.style.color = "#ffd43b";
    }
  });
});
