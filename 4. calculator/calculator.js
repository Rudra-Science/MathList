let history = JSON.parse(localStorage.getItem('calculatorHistory')) || []; // Load history from local storage

function clearDisplay() {
    document.getElementById('result').value = ''; // Clear the display
}

function deleteChar() {
    const display = document.getElementById('result');
    display.value = display.value.slice(0, -1); // Remove the last character
}

function appendParenthesis(parenthesis) {
    const display = document.getElementById('result');
    display.value += parenthesis; // Append parenthesis to display
}

function appendOperator(operator) {
    const display = document.getElementById('result');
    display.value += operator; // Append operator to display
}

function appendNumber(number) {
    const display = document.getElementById('result');
    display.value += number; // Append number to display
}

// Prevent multiple decimal points in a number
function appendDecimal() {
    const display = document.getElementById('result');
    if (!display.value.includes('.')) {
        display.value += '.'; // Append decimal point to display
    }
}

function calculate() {
    const display = document.getElementById('result');
    try {
        const result = eval(display.value); // Evaluate the expression
        history.push(display.value + ' = ' + result); // Store calculation in history
        updateHistoryDisplay(); // Update the history display
        display.value = result; // Display result
    } catch (error) {
        display.value = 'Error'; // Display error if evaluation fails
    }
}

function toggleHistory() {
    const historySection = document.getElementById('historySection');
    const toggleButton = document.getElementById('toggleHistory');

    if (historySection.style.display === 'none') {
        historySection.style.display = 'block';
        toggleButton.innerText = 'Hide History';
    } else {
        historySection.style.display = 'none';
        toggleButton.innerText = 'View History';
    }
}

function clearHistory() {
    history = []; // Clear the history array
    localStorage.removeItem('calculatorHistory'); // Remove from local storage
    updateHistoryDisplay(); // Update the display to reflect changes
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Clear the current list

    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item; // Add each history item to the list
        historyList.appendChild(li);
    });

    localStorage.setItem('calculatorHistory', JSON.stringify(history)); // Save to local storage
}

// Keyboard support for the calculator
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key); // Append number keys
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        appendOperator(event.key); // Append operator keys
    } else if (event.key === 'Enter') {
        calculate(); // Calculate on Enter
    } else if (event.key === 'Backspace') {
        deleteChar(); // Delete last character
    } else if (event.key === 'Escape') {
        clearDisplay(); // Clear display on Escape
    } else if (event.key === '(' || event.key === ')') {
        appendParenthesis(event.key); // Append parentheses
    } else if (event.key === '.') {
        appendDecimal(); // Append decimal point
    }
});

// Initialize the history section to be hidden on page load and load history
window.onload = function() {
    document.getElementById('historySection').style.display = 'none';
    updateHistoryDisplay(); // Load history on page load
};
