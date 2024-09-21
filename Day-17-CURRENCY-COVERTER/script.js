async function fetchCurrencyData() {
    const url = 'https://api.exchangerate-api.com/v4/latest/USD'; // Replace with your desired API
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error("Error fetching currency data:", error);
    }
}

async function populateCurrencyDropdowns() {
    const rates = await fetchCurrencyData();
    const currencyKeys = Object.keys(rates);

    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");

    currencyKeys.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.textContent = currency;
        toSelect.appendChild(optionTo);
    });
}

document.getElementById("convert").addEventListener("click", async () => {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from").value;
    const toCurrency = document.getElementById("to").value;

    if (amount === "") {
        alert("Please enter an amount.");
        return;
    }

    const rates = await fetchCurrencyData();
    const exchangeRate = rates[toCurrency] / rates[fromCurrency];
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    
    document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
});

// Populate dropdowns on page load
populateCurrencyDropdowns();
