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



const countries_url = 'https://referential.p.rapidapi.com/v1/country?fields=currency%2Ccurrency_num_code%2Ccurrency_code%2Ccontinent_code%2Ccurrency%2Ciso_a3%2Cdial_code&limit=250';
const countries_options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '03c76983admsheb071c0982e9ecap166b19jsn04d38b7c3472',
		'X-RapidAPI-Host': 'referential.p.rapidapi.com'
	}
};


async function fetchCountries() {
    try {
        const response = await fetch(countries_url, countries_options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
        return [];
    }
}

async function populateCountriesDropdown() {
    const countries = await fetchCountries();
    const countrySelect = document.getElementById('countrySelect');

    countrySelect.innerHTML = '';

    console.log(countries)

        // Add a default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Country';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    countrySelect.appendChild(defaultOption);

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.key;
        option.textContent = country.value;
        countrySelect.appendChild(option);
    });
}

populateCountriesDropdown().catch(error => {
    console.error('Error populating countries dropdown:', error);
});



async function fetchCitiesByCountry(countryCode) {
    try {
        const response = await fetch(`https://referential.p.rapidapi.com/v1/state?fields=iso_a2&iso_a2=${countryCode}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '03c76983admsheb071c0982e9ecap166b19jsn04d38b7c3472',
                'X-RapidAPI-Host': 'referential.p.rapidapi.com'
            }
        });
        const data = await response.json();
        return data; // Return the fetched cities data
    } catch (error) {
        console.error('Error fetching cities data:', error);
        return []; // Return an empty array or handle the error accordingly
    }
}

async function populateCitiesDropdown(selectedCountryCode) {
    const cities = await fetchCitiesByCountry(selectedCountryCode);
    const citySelect = document.getElementById('citySelect');

    citySelect.innerHTML = '';

    // Add a default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select City';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    citySelect.appendChild(defaultOption);
 
    cities.sort((a, b) => a.value.localeCompare(b.value));

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.iso_a2;
        option.textContent = city.value.replace(' County', '');
        citySelect.appendChild(option);
    });
}

document.getElementById('countrySelect').addEventListener('change', function() {
    const selectedCountryCode = this.value;
    populateCitiesDropdown(selectedCountryCode).catch(error => {
        console.error('Error populating cities dropdown:', error);
    });
});

