document.getElementById('calculateTip').addEventListener('click', function () {
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);
    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;
  
    if (isNaN(tipAmount) || isNaN(totalAmount)) {
      document.getElementById('tipAmount').innerText = "Please enter valid values!";
    } else {
      document.getElementById('tipAmount').innerHTML = `
        <p>Tip: $${tipAmount.toFixed(2)}</p>
        <p>Total Amount: $${totalAmount.toFixed(2)}</p>
      `;
    }
  });
  