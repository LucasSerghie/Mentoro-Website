const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
}); 



document.getElementById('email').addEventListener('input', function() {
    var emailInput = this.value;
    var emailValidation = document.getElementById('email-validation');

    // Regular expression for validating email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput)) {
        // Email is valid, display checkmark
        emailValidation.textContent = '✓';
        emailValidation.style.color = 'green';
    } else {
        // Email is invalid, display "x"
        emailValidation.textContent = '✗';
        emailValidation.style.color = 'red';
    }
});


const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordValidation = document.getElementById('password-validation');

passwordInput.addEventListener('input', validatePasswords);
confirmPasswordInput.addEventListener('input', validatePasswords);

function validatePasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password === confirmPassword && password.length > 0 && confirmPassword.length > 0) {
        passwordValidation.textContent = '✓';
        passwordValidation.style.color = 'green';
    } else {
        passwordValidation.textContent = '✗';
        passwordValidation.style.color = 'red';
    }
}


