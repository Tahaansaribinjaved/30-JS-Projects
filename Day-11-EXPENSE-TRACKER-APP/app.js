const balanceEl = document.getElementById('balance');
const listEl = document.getElementById('list');
const textEl = document.getElementById('text');
const amountEl = document.getElementById('amount');
const addTransactionBtn = document.getElementById('addTransaction');
const updateModal = document.getElementById('updateModal');
const updateTextEl = document.getElementById('updateText');
const updateAmountEl = document.getElementById('updateAmount');
const updateTransactionBtn = document.getElementById('updateTransaction');
const cancelUpdateBtn = document.getElementById('cancelUpdate');

let transactions = [];
let editTransactionId = null;

// Function to add a transaction
function addTransaction(e) {
  e.preventDefault();
  
  const text = textEl.value;
  const amount = +amountEl.value;
  
  if (text.trim() === '' || amount === 0) {
    alert('Please add a valid text and amount');
    return;
  }
  
  const transaction = {
    id: Math.floor(Math.random() * 100000),
    text,
    amount
  };
  
  transactions.push(transaction);
  updateUI();
  textEl.value = '';
  amountEl.value = '';
}

// Function to update the balance, income, and expense
function updateUI() {
  listEl.innerHTML = '';
  
  transactions.forEach((transaction) => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const li = document.createElement('li');
    li.classList.add(transaction.amount < 0 ? 'text-red-500' : 'text-green-500');
    li.classList.add('p-2', 'bg-gray-200', 'mb-2', 'rounded', 'flex', 'justify-between');
    li.innerHTML = `
      ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
      <div>
        <button class="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onclick="editTransaction(${transaction.id})">Edit</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTransaction(${transaction.id})">Delete</button>
      </div>
    `;
    listEl.appendChild(li);
  });

  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  balanceEl.innerText = `$${balance.toFixed(2)}`;
}

// Function to delete a transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateUI();
}

// Function to edit a transaction
function editTransaction(id) {
  const transaction = transactions.find(transaction => transaction.id === id);
  updateTextEl.value = transaction.text;
  updateAmountEl.value = transaction.amount;
  editTransactionId = id;
  updateModal.classList.remove('hidden');
}

// Function to handle update
function updateTransaction(e) {
  e.preventDefault();
  
  const text = updateTextEl.value;
  const amount = +updateAmountEl.value;
  
  if (text.trim() === '' || amount === 0) {
    alert('Please add valid text and amount');
    return;
  }

  transactions = transactions.map(transaction => 
    transaction.id === editTransactionId ? { ...transaction, text, amount } : transaction
  );
  
  updateUI();
  updateModal.classList.add('hidden');
}

// Event listeners
addTransactionBtn.addEventListener('click', addTransaction);
updateTransactionBtn.addEventListener('click', updateTransaction);
cancelUpdateBtn.addEventListener('click', () => updateModal.classList.add('hidden'));
