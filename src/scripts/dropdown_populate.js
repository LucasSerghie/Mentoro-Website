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
        return data;
    } catch (error) {
        console.error('Error fetching cities data:', error);
        return [];
    }
}


async function populateCountriesDropdown() {
    const countries = await fetchCountries();
    const countrySelect = document.getElementById('countrySelect');

    countrySelect.innerHTML = '';

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

    $(document).ready(function() {
        $("#countrySelect").select2({
            selectOnClose: true,
        });

        $("#countrySelect").on("select2:close", function() {
            var data = $("#countrySelect").select2("data");
            if (data.length > 0) {
                populateCitiesDropdown(data[0].id).catch(error => {
                    console.error('Error populating cities dropdown:', error);
            });
            } else {
                console.log("No country selected");
                alert("Please select a country");
            };
        });
    });
}

async function populateCitiesDropdown(selectedCountryCode) {
    const cities = await fetchCitiesByCountry(selectedCountryCode);
    const citySelect = document.getElementById('citySelect');

    citySelect.innerHTML = '';

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

    // Initialize Select2 after populating
    $("#citySelect").select2({
        selectOnClose: true,
    });
}

populateCountriesDropdown().catch(error => {
    console.error('Error populating countries dropdown:', error);
});
