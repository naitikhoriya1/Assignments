// Form submission handler
document.getElementById("enquireForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const formData = {
    parentName: this.querySelector('input[type="text"]').value,
    phone: this.querySelector('input[type="tel"]').value,
    grade: this.querySelectorAll('input[type="text"]')[1].value,
  };

  // Log form data (you can replace this with actual API call)
  console.log("Form submitted:", formData);

  // Show success message
  alert("Thank you for your enquiry! We will contact you soon.");

  // Reset form
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
