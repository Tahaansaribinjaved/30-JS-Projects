// Define conversion rates
const conversions = {
    length: {
        'Meters to Kilometers': (value) => value / 1000,
        'Kilometers to Meters': (value) => value * 1000,
    },
    weight: {
        'Grams to Kilograms': (value) => value / 1000,
        'Kilograms to Grams': (value) => value * 1000,
    },
    temperature: {
        'Celsius to Fahrenheit': (value) => (value * 9/5) + 32,
        'Fahrenheit to Celsius': (value) => (value - 32) * 5/9,
    }
};

// Get references to DOM elements
const conversionType = document.getElementById('conversionType');
const conversionUnit = document.getElementById('conversionUnit');
const inputValue = document.getElementById('inputValue');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');

// Update conversion units based on selected type
conversionType.addEventListener('change', () => {
    updateConversionUnits();
});

// Handle conversion on button click
convertBtn.addEventListener('click', () => {
    const value = parseFloat(inputValue.value);
    const unit = conversionUnit.value;
    const type = conversionType.value;

    if (!isNaN(value) && conversions[type][unit]) {
        result.textContent = conversions[type][unit](value).toFixed(2);
    } else {
        result.textContent = 'Invalid input!';
    }
});

// Update conversion options dynamically
function updateConversionUnits() {
    const type = conversionType.value;
    conversionUnit.innerHTML = '';

    for (let unit in conversions[type]) {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit;
        conversionUnit.appendChild(option);
    }
}

// Initialize the conversion units on page load
updateConversionUnits();
