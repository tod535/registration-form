const form = document.getElementById('registration-form');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');
const birthDayInput = document.getElementById('birth-day');
const formButton = document.getElementById('form-button');

function validateName(input, errorId) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const value = input.value.trim();
  const errorMessage = document.getElementById(errorId);

  if (!nameRegex.test(value) || value.length < 2 || value.length > 50) {
    input.classList.add('invalid');
    errorMessage.textContent = 'Please enter a valid name (2-50 characters, only letters and spaces)';
    return false;
  } else {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorMessage.textContent = '';
    return true;
  }
}

function validateEmail(input, errorId) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const value = input.value.trim();
  const errorMessage = document.getElementById(errorId);

  if (!emailRegex.test(value)) {
    input.classList.add('invalid');
    errorMessage.textContent = 'Please enter a valid email address';
    return false;
  } else {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorMessage.textContent = '';
    return true;
  }
}

function validatePassword(input, confirmInput, errorId) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const value = input.value.trim();
  const confirmValue = confirmInput.value.trim();
  const errorMessage = document.getElementById(errorId);

  if (!passwordRegex.test(value) || value !== confirmValue) {
    input.classList.add('invalid');
    confirmInput.classList.add('invalid');
    errorMessage.textContent = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character. Passwords must match.';
    return false;
  } else {
    input.classList.remove('invalid');
    input.classList.add('valid');
    confirmInput.classList.remove('invalid');
    confirmInput.classList.add('valid');
    errorMessage.textContent = '';
    return true;
  }
}

function validateBirthDay(input, errorId) {
  const today = new Date();
  const birthDay = new Date(input.value);
  const age = today.getFullYear() - birthDay.getFullYear();
  const monthDiff = today.getMonth() - birthDay.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay.getDate())) {
    age--;
  }

  const errorMessage = document.getElementById(errorId);

  if (age < 18) {
    input.classList.add('invalid');
    errorMessage.textContent = 'You must be at least 18 years old to register.';
    return false;
  } else {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorMessage.textContent = '';
    return true;
  }
}

function validateForm() {
  const firstNameValid = validateName(firstNameInput, 'first-name-error');
  const lastNameValid = validateName(lastNameInput, 'last-name-error');
  const emailValid = validateEmail(emailInput, 'email-error');
  const passwordValid = validatePassword(passwordInput, passwordConfirmInput, 'password-error');
  const birthDayValid = validateBirthDay(birthDayInput, 'birth-day-error');

  const isFormValid = firstNameValid && lastNameValid && emailValid && passwordValid && birthDayValid;
  formButton.disabled = !isFormValid;

  return isFormValid;
}

firstNameInput.addEventListener('blur', () => validateName(firstNameInput, 'first-name-error'));
lastNameInput.addEventListener('blur', () => validateName(lastNameInput, 'last-name-error'));
emailInput.addEventListener('blur', () => validateEmail(emailInput, 'email-error'));
passwordInput.addEventListener('blur', () => validatePassword(passwordInput, passwordConfirmInput, 'password-error'));
passwordConfirmInput.addEventListener('blur', () => validatePassword(passwordInput, passwordConfirmInput, 'password-error'));
birthDayInput.addEventListener('blur', () => validateBirthDay(birthDayInput, 'birth-day-error'));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validateForm()) {
    
    console.log('Form submitted successfully!');
  }
});