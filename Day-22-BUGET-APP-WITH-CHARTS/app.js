const budgetForm = document.getElementById('budgetForm');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const ctx = document.getElementById('budgetChart').getContext('2d');

let budgetData = {
    labels: [],
    datasets: [{
        label: 'Expenses',
        data: [],
        backgroundColor: [],
    }]
};

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#9C27B0'];

const budgetChart = new Chart(ctx, {
    type: 'doughnut',
    data: budgetData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        }
    }
});

budgetForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const expenseName = expenseNameInput.value;
    const expenseAmount = expenseAmountInput.value;

    if (expenseName && expenseAmount) {
        budgetData.labels.push(expenseName);
        budgetData.datasets[0].data.push(expenseAmount);
        budgetData.datasets[0].backgroundColor.push(colors[budgetData.labels.length % colors.length]);
        
        budgetChart.update();

        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    }
});
