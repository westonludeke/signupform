document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const phone = document.getElementById("phone");
  const submitBtn = document.querySelector(".submit-btn");
  const form = document.getElementById("signupForm");

  // Add event listeners to form elements
  firstName.addEventListener("blur", validateFirstName);
  lastName.addEventListener("blur", validateLastName);
  email.addEventListener("blur", validateEmail);
  password.addEventListener("blur", validatePassword);
  phone.addEventListener("blur", validatePhone);
  submitBtn.addEventListener("click", submitForm);

  // Validate first name
  function validateFirstName() {
    const firstNameValue = firstName.value.trim();

    if (firstNameValue === "") {
      setError(firstName, "First name is required");
    } else {
      setSuccess(firstName);
    }
  }

  // Validate last name
  function validateLastName() {
    const lastNameValue = lastName.value.trim();

    if (lastNameValue === "") {
      setError(lastName, "Last name is required");
    } else {
      setSuccess(lastName);
    }
  }

  // Validate email
  function validateEmail() {
    const emailValue = email.value.trim();
    const emailPattern = /.+@.+\..+/;

    if (emailValue === "") {
      setError(email, "Email is required");
    } else if (!emailPattern.test(emailValue)) {
      setError(email, "Please enter a valid email address");
    } else {
      setSuccess(email);
    }
  }

  // Validate password
  function validatePassword() {
    const passwordValue = password.value.trim();

    if (passwordValue === "") {
      setError(password, "Password is required");
    } else if (passwordValue.length < 10) {
      setError(password, "Password must be at least 10 characters long");
    } else {
      setSuccess(password);
    }
  }

  // Validate phone
  function validatePhone() {
    const phoneValue = phone.value.trim();
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

    if (phoneValue === "") {
      setSuccess(phone);
    } else if (!phonePattern.test(phoneValue)) {
      setError(phone, "Please enter a valid US-style phone number (e.g. 123-456-7890)");
    } else {
      setSuccess(phone);
    }
  }

  // Set error message and border for an input element
  function setError(input, message) {
    const parentElement = input.parentElement;
    const errorMessage = parentElement.querySelector(".error-message");

    errorMessage.innerText = message;
    parentElement.classList.add("error");
    input.classList.add("error");
  }

  // Remove error message and border for an input element
  function setSuccess(input) {
    const parentElement = input.parentElement;
    const errorMessage = parentElement.querySelector(".error-message");

    errorMessage.innerText = "";
    parentElement.classList.remove("error");
    input.classList.remove("error");
  }

  // Submit form and validate all form fields
  function submitForm(e) {
    e.preventDefault(); // prevent form from submitting by default

    // validate form before submitting
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePassword();
    validatePhone();

    // check if any errors are present
    if (document.querySelectorAll(".error").length === 0) {
      // if no errors, submit the form
      form.submit();
    } else {
      // if errors are present, display error summary
      const errorSummary = document.getElementById("error-summary");
      errorSummary.innerHTML = "Please fix the errors in the form before submitting.";
    }
  }

  // Clear error summary when user starts correcting errors
  form.addEventListener("input", function () {
    const errorSummary = document.getElementById("errorSummary");
    errorSummary.innerText = "";
  });
});    