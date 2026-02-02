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
