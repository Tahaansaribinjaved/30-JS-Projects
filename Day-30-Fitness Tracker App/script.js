document.getElementById('activityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const activity = document.getElementById('activity').value;
    const calories = document.getElementById('calories').value;
    
    if (activity && calories) {
        const li = document.createElement('li');
        li.textContent = `${activity}: ${calories} calories burned`;
        li.classList.add('border-b', 'py-2');
        
        document.getElementById('activityLog').appendChild(li);
        
        // Clear the input fields
        document.getElementById('activity').value = '';
        document.getElementById('calories').value = '';
    } else {
        alert('Please enter both activity and calories burned.');
    }
});
