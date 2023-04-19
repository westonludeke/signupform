document.addEventListener("DOMContentLoaded", function () {
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const phone = document.getElementById("phone");
  const submitBtn = document.querySelector(".submit-btn");
  const form = document.getElementById("signupForm");
  const creditCard1 = document.getElementById("credit-card-1");
  const creditCard2 = document.getElementById("credit-card-2");
  const creditCard3 = document.getElementById("credit-card-3");
  const creditCard4 = document.getElementById("credit-card-4");
  const creditCardInputs = [creditCard1, creditCard2, creditCard3, creditCard4];
  creditCardInputs.forEach(input => {
    input.addEventListener('input', handleCreditCardInput);
  });

  function handleCreditCardInput(event) {
    const inputText = event.target.value;
    event.target.value = inputText.replace(/\D/g, '').substring(0, 4);
  }

  firstName.addEventListener("blur", function() { validateName(firstName) });
  lastName.addEventListener("blur", function() { validateName(lastName) });
  firstName.addEventListener("keypress", function (e) { validateName(firstName, e) });
  lastName.addEventListener("keypress", function (e) { validateName(lastName, e) });
  email.addEventListener("blur", validateEmail);
  password.addEventListener("blur", validatePassword);
  phone.addEventListener("blur", validatePhone);
  creditCard1.addEventListener("blur", validateCreditCard);
  creditCard2.addEventListener("blur", validateCreditCard);
  creditCard3.addEventListener("blur", validateCreditCard);
  creditCard4.addEventListener("blur", validateCreditCard);
  submitBtn.addEventListener("click", submitForm);

  function validateName(input) {
    const nameValue = input.value.trim();
    if (nameValue === "") {
      setError(input, `${input.id === "first-name" ? "First" : "Last"} name is required`);
    } else if (!/^[a-zA-Z ]+([-][a-zA-Z]+)*$/.test(nameValue)) {
      setError(input, `${input.id === "first-name" ? "First" : "Last"} name should contain only letters`);
    } else {
      setSuccess(input);
    }
  }

  function validateEmail() {
    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === "") {
      setError(email, "Email is required");
    } else if (!emailPattern.test(emailValue)) {
      setError(email, "Please enter a valid email address");
    } else {
      setSuccess(email);
    }
  }

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

  function validatePhone() {
    const phoneValue = phone.value.trim();
    const phonePattern = /^(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
    if (phoneValue === "") {
      setSuccess(phone);
    } else if (!phonePattern.test(phoneValue)) {
      setError(phone, "Please enter a valid US-style phone number (e.g. 123-456-7890)");
    } else {
      setSuccess(phone);
    }
  }

  function validateCreditCard() {
    const creditCardValue = creditCard1.value + creditCard2.value + creditCard3.value + creditCard4.value;
    if (creditCardValue === "") {
      setError(creditCard1, "Credit card number is required");
    } else if (!/^\d{16}$/.test(creditCardValue)) {
      setError(creditCard1, "Please enter a valid credit card number");
    } else {
      setSuccess(creditCard1);
      setSuccess(creditCard2);
      setSuccess(creditCard3);
      setSuccess(creditCard4);
    }
  }

  function setError(input, message) {
    const parentElement = input.parentElement;
    const errorMessage = parentElement.querySelector(".error-message");
    errorMessage.innerText = message;
    parentElement.classList.add("error");
    input.classList.add("error");
  }

  function setSuccess(input) {
    const parentElement = input.parentElement;
    const errorMessage = parentElement.querySelector(".error-message");
    errorMessage.innerText = "";
    parentElement.classList.remove("error");
    input.classList.remove("error");
  }

  function submitForm(e) {
    e.preventDefault(); 
    validateEmail();
    validatePassword();
    validatePhone();
    validateCreditCard();

    if (document.querySelectorAll(".error").length === 0) {
      form.submit();
    } else {
      const errorSummary = document.getElementById("error-summary");
      errorSummary.innerHTML = "Please fix the errors in the form before submitting.";
    }
  }
});